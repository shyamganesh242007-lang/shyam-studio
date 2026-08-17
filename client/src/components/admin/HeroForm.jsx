import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImageCropModal from "../ImageCropModal";
import getCroppedImg from "../../utils/cropImage";
import imageCompression from "browser-image-compression";
import {
  getHeroSettings,
  updateHeroSettings,
} from "../../services/siteSettingsService";
import { supabase } from "../../lib/supabase";

const DEFAULT_FORM_DATA = {
  hero_image: "",
  hero_heading: "Build. Deploy. Grow.",
  hero_description: "I build modern web applications and AI solutions.",
  hero_primary_button_text: "View Projects",
  hero_primary_button_link: "#projects",
  hero_secondary_button_text: "Hire Me",
  hero_secondary_button_link: "#contact",
};

function HeroForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [dragActive, setDragActive] = useState(false);
  const [imageStats, setImageStats] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);

        const data = await getHeroSettings();

        if (data) {
          setFormData({
            hero_image: data.hero_image || "",
            hero_heading:
              data.hero_heading || DEFAULT_FORM_DATA.hero_heading,
            hero_description:
              data.hero_description ||
              DEFAULT_FORM_DATA.hero_description,
            hero_primary_button_text:
              data.hero_primary_button_text ||
              DEFAULT_FORM_DATA.hero_primary_button_text,
            hero_primary_button_link:
              data.hero_primary_button_link ||
              DEFAULT_FORM_DATA.hero_primary_button_link,
            hero_secondary_button_text:
              data.hero_secondary_button_text ||
              DEFAULT_FORM_DATA.hero_secondary_button_text,
            hero_secondary_button_link:
              data.hero_secondary_button_link ||
              DEFAULT_FORM_DATA.hero_secondary_button_link,
          });
        }
      } catch (error) {
        console.error("Failed to load Hero settings:", error);
        toast.error("Failed to load Hero settings.");
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);
    setShowCropModal(true);

    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setImageStats(null);
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0];

    processFile(file);

    // Allows selecting the same image again
    e.target.value = "";
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    }

    if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    processFile(file);
  }

  function onCropComplete(_, croppedAreaPixels) {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  async function compressImage(file) {
    // Same behavior as your existing Project ImageUploader
    if (file.size <= 300 * 1024) {
      setImageStats({
        original: (file.size / 1024).toFixed(2),
        compressed: (file.size / 1024).toFixed(2),
        reduction: "0",
        type: file.type,
      });

      return file;
    }

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
      file.name.replace(/\.(jpg|jpeg|png)$/i, ".webp"),
      {
        type: "image/webp",
      }
    );

    const reduction = (
      (1 - webpFile.size / file.size) *
      100
    ).toFixed(1);

    setImageStats({
      original: (file.size / 1024).toFixed(2),
      compressed: (webpFile.size / 1024).toFixed(2),
      reduction,
      type: webpFile.type,
    });

    return webpFile;
  }

  async function uploadHeroImage(file) {
    const extension =
      file.type === "image/webp"
        ? "webp"
        : file.type === "image/png"
        ? "png"
        : "jpg";

    const fileName = `hero-${Date.now()}.${extension}`;
    const filePath = `hero/${fileName}`;

    const { data, error } = await supabase.storage
      .from("project-images")
      .upload(filePath, file, {
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from("project-images")
      .getPublicUrl(data.path);

    if (!publicUrlData?.publicUrl) {
      throw new Error("Could not generate Hero image URL.");
    }

    return publicUrlData.publicUrl;
  }

  async function handleCropSave() {
    if (!selectedImage || !croppedAreaPixels) {
      toast.error("Please crop the image first.");
      return;
    }

    try {
      setUploading(true);

      const croppedBlob = await getCroppedImg(
        selectedImage,
        croppedAreaPixels
      );

      const croppedFile = new File(
        [croppedBlob],
        `hero-${Date.now()}.jpg`,
        {
          type: "image/jpeg",
        }
      );

      // Compress + WebP conversion
      const processedFile = await compressImage(croppedFile);

      // Upload only after successful processing
      const imageUrl = await uploadHeroImage(processedFile);

      setFormData((prev) => ({
        ...prev,
        hero_image: imageUrl,
      }));

      setShowCropModal(false);

      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }

      setSelectedImage(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);

      toast.success("Hero image uploaded successfully.");
    } catch (error) {
      console.error("Hero image upload failed:", error);
      toast.error(
        error.message || "Failed to upload Hero image."
      );
    } finally {
      setUploading(false);
    }
  }

  function handleCropCancel() {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    setSelectedImage(null);
    setShowCropModal(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setImageStats(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (saving) return;

    try {
      setSaving(true);

      await updateHeroSettings(formData);

      toast.success("Hero section updated successfully.");
    } catch (error) {
      console.error("Failed to save Hero settings:", error);

      toast.error(
        error.message || "Failed to save Hero settings."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
        <div className="inline-block w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2" />

        <p className="text-sm">
          Loading Hero settings...
        </p>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* HERO IMAGE */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>🖼</span>
            Hero Image
          </h2>

          {/* Current Hero Image */}
          {formData.hero_image ? (
            <div className="relative w-full max-w-md h-64 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={formData.hero_image}
                alt="Current Hero"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full max-w-md h-64 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500">
              No Hero image uploaded
            </div>
          )}

          {/* Upload / Drag Drop */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
              dragActive
                ? "border-indigo-500 bg-indigo-500/10"
                : "border-slate-700 bg-slate-950 hover:border-indigo-500"
            }`}
          >
            <input
              id="hero-image-input"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            <label
              htmlFor="hero-image-input"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <span className="text-4xl">
                🖼️
              </span>

              <span className="text-white font-medium">
                {uploading
                  ? "Processing image..."
                  : "Click or drag & drop to change Hero image"}
              </span>

              <span className="text-xs text-slate-500">
                JPG, JPEG, PNG or WebP • Max 10 MB
              </span>
            </label>
          </div>

          {/* Compression Stats */}
          {imageStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm">
              <div>
                <span className="text-slate-500 block">
                  Original Size
                </span>

                <span className="font-semibold text-slate-300">
                  {imageStats.original} KB
                </span>
              </div>

              <div>
                <span className="text-slate-500 block">
                  Uploaded Size
                </span>

                <span className="font-semibold text-indigo-400">
                  {imageStats.compressed} KB
                </span>
              </div>

              <div>
                <span className="text-slate-500 block">
                  Reduced
                </span>

                <span className="font-semibold text-emerald-400">
                  {imageStats.reduction}%
                </span>
              </div>

              <div>
                <span className="text-slate-500 block">
                  Format
                </span>

                <span className="font-semibold text-slate-300">
                  {imageStats.type}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* HERO CONTENT */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>✍️</span>
            Hero Content
          </h2>

          {/* Heading */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Heading
            </label>

            <input
              type="text"
              name="hero_heading"
              value={formData.hero_heading}
              onChange={handleChange}
              placeholder="Build. Deploy. Grow."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Description
            </label>

            <textarea
              name="hero_description"
              rows={4}
              value={formData.hero_description}
              onChange={handleChange}
              placeholder="Describe your introduction..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
              required
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>🔘</span>
            Action Buttons
          </h2>

          {/* Primary Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-800 pb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Primary Button Text
              </label>

              <input
                type="text"
                name="hero_primary_button_text"
                value={formData.hero_primary_button_text}
                onChange={handleChange}
                placeholder="View Projects"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Primary Button Link
              </label>

              <input
                type="text"
                name="hero_primary_button_link"
                value={formData.hero_primary_button_link}
                onChange={handleChange}
                placeholder="#projects"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Secondary Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Secondary Button Text
              </label>

              <input
                type="text"
                name="hero_secondary_button_text"
                value={formData.hero_secondary_button_text}
                onChange={handleChange}
                placeholder="Hire Me"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Secondary Button Link
              </label>

              <input
                type="text"
                name="hero_secondary_button_link"
                value={formData.hero_secondary_button_link}
                onChange={handleChange}
                placeholder="#contact"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        {/* SAVE */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving || uploading}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </form>

      {/* CROP MODAL */}
      {showCropModal && (
        <ImageCropModal
  image={selectedImage}
  crop={crop}
  zoom={zoom}
  setCrop={setCrop}
  setZoom={setZoom}
  onCropComplete={onCropComplete}
  onCancel={handleCropCancel}
  onSave={handleCropSave}
  aspect={1}
  title="Crop Hero Image"
/>
      )}
    </>
  );
}

export default HeroForm;