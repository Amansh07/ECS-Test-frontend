import { useState, useCallback, useId } from "react";
import uploadImg from "../assets/upload.svg";
import Cropper from "react-easy-crop";
import zoomOut from "../assets/zoomOut.svg";
import zoomIn from "../assets/zoomIn.svg";

const UploadDocument = ({ config, onFileSelect }) => {
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isImageFile, setIsImageFile] = useState(false);

  // Generate unique ID for this instance
  const inputId = useId();

  const imageTypes = ["image/jpeg", "image/jpg", "image/png"];

  const handleFile = (file) => {
    if (!file) return;

    const allowedTypes = config.allowedTypes;

    // Validate file type using array includes
    if (!allowedTypes.includes(file.type)) {
      console.log("Selected file type:", file.type);
      console.log("Allowed types:", allowedTypes);
      setError(`Only ${allowedTypes.join(", ")} files are allowed`);
      setFileName("");
      return;
    }

    // Extract numeric value from maxSizeMB string for size validation
    const maxSizeMatch = config.maxSizeMB.match(/\d+/); // extract digits
    const maxSize = maxSizeMatch ? Number(maxSizeMatch[0]) : Infinity;

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize} MB`);
      setFileName("");
      return;
    }

    setFileName(file.name);
    setError("");

    // Open modal only for images
    if (file.type.startsWith("image/")) {
      setIsImageFile(true);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setModalOpen(true);
      };
      reader.readAsDataURL(file);
    } else {
      setIsImageFile(false);
      setModalOpen(false);
      onFileSelect(file);
    }
  };


  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleChange = (e) => handleFile(e.target.files[0]);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return null;

    const image = new Image();
    image.src = imageSrc;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    await new Promise((resolve) => {
      image.onload = () => {
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
        resolve(true);
      };
    });

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const croppedFile = new File([blob], fileName, { type: "image/jpeg" });
        resolve(croppedFile);
      }, "image/jpeg");
    });
  };

  const handleConfirm = async () => {
    const croppedFile = await getCroppedImage();
    if (croppedFile) onFileSelect(croppedFile);

    setModalOpen(false);
    setImageSrc(null);
    setIsImageFile(false);

    // 🔑 reset input after success too
    const input = document.getElementById(inputId);
    if (input) input.value = "";
  };


  const handleCancel = () => {
    setModalOpen(false);
    setImageSrc(null);
    setFileName("");
    setIsImageFile(false);

    // 🔑 RESET FILE INPUT so same file can be re-selected
    const input = document.getElementById(inputId);
    if (input) input.value = "";
  };

  return (

    <div>
      {/* Upload Container */}
      <div
        className="w-full h-[84px] flex rounded-xl p-2 bg-[#F8FFE5] gap-5 cursor-pointer"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(inputId).click()}
      >
        <div className="flex items-center">
          <img src={uploadImg} alt="upload" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-medium text-sm text-[#121212]">{config.title}</p>
          <p className="font-medium text-[11px] text-[#58595B]">{config.maxSizeMB} MB max</p>
          <p className="font-medium text-sm text-[#4A6600]">
            {fileName ? fileName : "Drag & Drop or Browse File"}
          </p>
        </div>

        <input
          type="file"
          id={inputId} // unique per component
          hidden
          accept={config.allowedTypes} // strict filter
          onChange={handleChange}
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {/* Modal only for images */}
      {modalOpen && isImageFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-[500px] p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium">Upload Photograph</h2>

              <button
                type="button"
                onClick={handleCancel}
                className="text-xl font-semibold text-[#000000] leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="font-normal text-sm text-[#727272] mb-4">Crop/Adjust image magnification</p>

            {imageSrc && (
              <div className="relative h-64 flex items-center justify-center bg-[#464646]/10">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  cropShape="rect"
                  showGrid={false}
                />
              </div>
            )}


            <div className="flex items-center gap-4 w-full mt-4">
              <img src={zoomOut} alt="zoomOut" className="h-4 w-4" />

              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 h-1 rounded-lg accent-[#709900] cursor-pointer"
              />

              <img src={zoomIn} alt="zoomIn" className="h-10 w-10" />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded-[8px] border border-[1px] border-[#B7131A] text-[#B7131A] text-sm font-medium"
                onClick={handleCancel}
              >
                Cancel
              </button>


              <button
                className="px-4 py-2 rounded-[8px] bg-[#1B7A00] text-white rounded text-sm font-medium"
                onClick={handleConfirm}
              >
                Confirm Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocument;
