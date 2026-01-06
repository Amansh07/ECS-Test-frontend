import { useState, useCallback, useId } from "react";
import uploadImg from "../assets/upload.svg";
import Cropper from "react-easy-crop";
import zoomOut from "../assets/zoomOut.svg";
import zoomIn from "../assets/zoomIn.svg";
import trailingIcon from "../assets/Trailing_icon.svg";
import tickMark from "../assets/tickMark.svg";
import Delete from "../assets/Delete.svg";
import pdfUpload from "../assets/pdfUpload.svg";
import { Button } from "./Buttons";

const UploadDocument = ({ config, onFileSelect, disabled = false }) => {
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isImageFile, setIsImageFile] = useState(false);
  const [finalImage, setFinalImage] = useState(null);
  const [croppedSize, setCroppedSize] = useState("");


  const inputId = useId();

  const handleFile = (file) => {
    if (!file) return;

    const allowedTypes = config.allowedTypes;

    if (!allowedTypes.includes(file.type)) {
      setError(`Only ${allowedTypes.join(", ")} files are allowed`);
      setFileName("");
      return;
    }

    const maxSizeMatch = config.maxSizeMB.match(/\d+/);
    const maxSize = maxSizeMatch ? Number(maxSizeMatch[0]) : Infinity;

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize} MB`);
      setFileName("");
      return;
    }

    setFileName(file.name);
    setError("");

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
        resolve(new File([blob], fileName, { type: "image/jpeg" }));
      }, "image/jpeg");
    });
  };

  const handleConfirm = async () => {
    const croppedFile = await getCroppedImage();
    if (croppedFile) {
      onFileSelect(croppedFile);
      setFinalImage(URL.createObjectURL(croppedFile));

      // Set the size in KB/MB
      setCroppedSize(formatFileSize(croppedFile.size));
    }

    setModalOpen(false);
    setImageSrc(null);
    setIsImageFile(false);

    const input = document.getElementById(inputId);
    if (input) input.value = "";
  };


  const handleCancel = () => {
    setModalOpen(false);
    setImageSrc(null);
    setFileName("");
    setIsImageFile(false);

    const input = document.getElementById(inputId);
    if (input) input.value = "";
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;

    const mb = kb / 1024;
    return `${mb.toFixed(2)} MB`;
  };


  return (
    <div>
      {/* Upload OR Preview */}
      {!finalImage ? (
        <div
          className="w-full h-[84px] flex rounded-xl p-2 bg-[#F8FFE5] gap-5 cursor-pointer"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && document.getElementById(inputId).click()}
          style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.7 : 1 }}
        >
          <div className="flex items-center">
            <img src={config?.allowedTypes.includes("application/pdf") ? pdfUpload : uploadImg} alt="upload" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-medium text-sm text-[#121212]">{config.title}</p>
            <p className="font-medium text-[11px] text-[#58595B]">
              {config.maxSizeMB} MB max
            </p>
            <p className="font-medium text-sm text-[#4A6600]">
              {fileName || "Drag & Drop or Browse File"}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center h-[181px] rounded-xl gap-3 p-3 bg-[#F0EFF5] border-[2px] border-dashed border-[#1B7A00]">
          <div className="flex items-center">
            <img
              src={finalImage}
              alt="cropped"
              className="w-[161px] h-[161px] rounded-md object-cover"
            />
          </div>

          {/* This takes remaining width */}
          <div className="flex-1 bg-[#ffffff] h-[161px] rounded-md flex flex-col justify-between p-2">
            {/* Top (40px) */}
            <div className="h-[40px] bg-transparent align-center flex gap-2">
              <div className="w-[25px] mt-[3px]">
                <img
                  src={trailingIcon}
                  alt="trailing icon"
                />
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-normal">{fileName}</p>
                <p className="text-[12px] font-medium">{croppedSize}</p>
              </div>
              <div className="w-[60px] flex justify-around">
                <div className="mt-[3px]">   <img
                  src={tickMark}
                  alt="tick icon"
                /></div>

                <div className="mt-[3px]">   <img
                  src={Delete}
                  alt="delete icon"
                  className="cursor-pointer"
                  onClick={() => {
                    setFinalImage(null);
                    setFileName("");
                    onFileSelect(null);
                  }}
                /></div>

              </div>
            </div>

            {/* Bottom (32px) */}
            <div className="flex h-[32px] bg-transparent justify-end">
              <Button buttonClassName="w-[82px] text-[12px] font-medium border-[1px] text-[#253300] border-[#253300] rounded-[8px] h-[32px] flex items-center justify-center px-4 py-2 cursor-pointer" onClick={() => document.getElementById(inputId).click()} >
                Add File
              </Button>
            </div>

          </div>

        </div>

      )}

      <input
        type="file"
        id={inputId}
        hidden
        accept={config.allowedTypes}
        onChange={handleChange}
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {/* Image Crop Modal */}
      {modalOpen && isImageFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-[400px] p-4">
            <div className="flex justify-between mb-3">
              <h2 className="text-base font-medium">Upload Photograph</h2>
              <Button onClick={handleCancel}>✕</Button>
            </div>

            <div className="relative h-[350px] flex items-center justify-center bg-[#464646] rounded-[8px]">
              <div className="relative w-[256px] h-[256px] overflow-hidden rounded-[8px]">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  showGrid={false}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <img src={zoomOut} alt="-" className="h-4 w-4" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(+e.target.value)}
                className="flex-1 accent-[#709900]"
              />
              <img src={zoomIn} alt="+" className="h-6 w-6" />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                buttonClassName="px-4 py-2 rounded-md border border-[#B7131A] text-[#B7131A]"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                buttonClassName="px-4 py-2 rounded-md bg-[#1B7A00] text-white"
                onClick={handleConfirm}
              >
                Confirm Image
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocument;
