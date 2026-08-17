
import Cropper from "react-easy-crop";

export default function ImageCropModal({
  image,
  crop,
  zoom,
  setCrop,
  setZoom,
  onCancel,
  onCropComplete,
  onSave,
}) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-2xl w-[90%] max-w-xl p-6">

        <h2 className="text-2xl font-bold text-white mb-5">
          Crop Project Image
        </h2>

        <div className="relative h-80 bg-black rounded-lg overflow-hidden">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="mt-6">
          <label className="text-white block mb-2">
            Zoom
          </label>

          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
  type="button"
  onClick={onCancel}
  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
>
  Cancel
</button>

          <button
  type="button"
  onClick={onSave}
  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
>
  Save Image
</button>
        </div>

      </div>
    </div>
  );
}