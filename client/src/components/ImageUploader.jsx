import { useState } from "react";
import ImageCropModal from "./ImageCropModal";
import getCroppedImg from "../utils/cropImage";
import {
  uploadProjectImage,
  deleteProjectImage,
} from "../services/projectService";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

function ImageUploader({ image, onImageUploaded }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageStats, setImageStats] = useState(null);

 

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Compress every image and convert it to WebP
  async function compressImage(file) {
    const originalSize = file.size;

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1600,
      useWebWorker: true,
      initialQuality: 0.8,
      fileType: "image/webp",
    };

    const compressedFile = await imageCompression(file, options);

    const webpFile = new File(
      [compressedFile],
      file.name.replace(/\.(jpg|jpeg|png|webp)$/i, ".webp"),
      {
        type: "image/webp",
      }
    );

    const reduction = (
      (1 - webpFile.size / originalSize) *
      100
    ).toFixed(1);

    setImageStats({
      original: (originalSize / 1024).toFixed(2),
      compressed: (webpFile.size / 1024).toFixed(2),
      reduction,
      type: webpFile.type,
    });

    return webpFile;
  }

  function processFile(file) {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG and WEBP images are allowed.");
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("Image size should be less than 10 MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setShowCropModal(true);
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    processFile(file);
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  async function handleCropSave() {
    try {
      setUploading(true);

      const croppedBlob = await getCroppedImg(
        selectedImage,
        croppedAreaPixels
      );

      const file = new File(
        [croppedBlob],
        `project-${Date.now()}.jpg`,
        {
          type: "image/jpeg",
        }
      );

      // Compress and convert to WebP
      const compressedFile = await compressImage(file);

      // Upload WebP image
      const imageUrl = await uploadProjectImage(compressedFile);

      onImageUploaded(imageUrl);

      toast.success("Image uploaded successfully");

      setShowCropModal(false);
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemoveImage() {
    try {
      setUploading(true);

      // Delete image from Supabase Storage
      await deleteProjectImage(image);

      // Remove image URL from form/database state
      onImageUploaded("");

      setImageStats(null);
      setSelectedImage(null);

      toast.success("Image removed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <input
        id="project-image"
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <label
        htmlFor="project-image"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`w-full h-60 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition ${
          dragActive
            ? "border-blue-500 bg-slate-900"
            : "border-slate-600 hover:border-blue-500 hover:bg-slate-900"
        }`}
      >
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="h-full w-full object-cover rounded-xl"
          />
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 text-slate-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 16l5-5 4 4 6-6 3 3M21 21H3V3h18v18z"
              />
            </svg>

            <p className="text-lg font-semibold text-white">
              Upload Project Image
            </p>

            <p className="text-slate-400 text-sm mt-2">
              Click to choose or drag and drop an image
            </p>
          </>
        )}
      </label>

      {uploading && (
        <p className="text-center text-blue-400 mt-3">
          Uploading image...
        </p>
      )}

      {imageStats && (
        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm">
          <p>
            <strong>Original Size:</strong> {imageStats.original} KB
          </p>

          <p>
            <strong>Uploaded Size:</strong> {imageStats.compressed} KB
          </p>

          <p>
            <strong>Reduced:</strong> {imageStats.reduction}%
          </p>

          <p>
            <strong>Format:</strong> {imageStats.type}
          </p>
        </div>
      )}

      {image && !uploading && (
        <div className="flex justify-between items-center mt-4">
          <p className="text-green-400 font-medium">
            ✓ Image uploaded successfully
          </p>

          <div className="flex gap-2">
            <label
              htmlFor="project-image"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition"
            >
              Change Image
            </label>

            <button
              type="button"
              onClick={handleRemoveImage}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              Remove Image
            </button>
          </div>
        </div>
      )}

      {showCropModal && (
        <ImageCropModal
          image={selectedImage}
          crop={crop}
          zoom={zoom}
          setCrop={setCrop}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
          onCancel={() => setShowCropModal(false)}
          onSave={handleCropSave}
        />
      )}
    </>
  );
}

export default ImageUploader;