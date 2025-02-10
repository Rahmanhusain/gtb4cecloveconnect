import React, { useState, useRef, Suspense, lazy } from "react";
/* import Cropper from "react-cropper"; */
import "cropperjs/dist/cropper.css";
import { space_mono } from "@/lib/fonts";
import { NoImageIcon } from "@/icons/icon";
import { set } from "mongoose";
const Cropper = lazy(() => import("react-cropper"));

const Crop = ({ setprofilephoto,setDpmodOpen,setCansave}) => {
  const [URL, setURL] = useState("#");
  const [btndisable, setbtndisable] = useState(true);
  const cropperRef = useRef(null);

  const handleInputChange = (e) => {
    // Check if cropperRef is defined and the value has changed
    if (cropperRef.current && e.target.value !== URL) {
      e.preventDefault();

      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }

      if (files && files.length > 0) {
        const file = files[0];

        if (file instanceof Blob) {
          const reader = new FileReader();

          reader.onload = () => {
            setURL(reader.result);
            setbtndisable(false);
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };

  const resizeToSquare = (croppedCanvas, targetSize) => {
    const width = croppedCanvas.width;
    const height = croppedCanvas.height;

    // If the image is already within the target size, return the original canvas
    if (width <= targetSize && height <= targetSize) {
      return croppedCanvas;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Calculate scaling factor to maintain the aspect ratio and fit within targetSize
    const scale = Math.min(targetSize / width, targetSize / height);
    const newWidth = Math.floor(width * scale);
    const newHeight = Math.floor(height * scale);

    // Set canvas dimensions to targetSize (800x800)
    canvas.width = targetSize;
    canvas.height = targetSize;

    // Center the resized image on the canvas
    const xOffset = (targetSize - newWidth) / 2;
    const yOffset = (targetSize - newHeight) / 2;
    ctx.drawImage(croppedCanvas, xOffset, yOffset, newWidth, newHeight);

    // Return the resized canvas
    return canvas;
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedImage = cropperRef.current?.cropper.getCroppedCanvas();

      const base64DataURL = resizeToSquare(croppedImage, 500).toDataURL(
        "image/webp",
        0.65
      );

      /* console.log(base64DataURL); */

      setprofilephoto(base64DataURL);
      setCansave(true);
      setDpmodOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 px-2">
      <div className="flex flex-col justify-center items-center py-2 gap-4 px-4 w-full">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-[18.75rem] max-w-full h-fit border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-light-night-black hover:bg-[#ffffff] transition-colors duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center justify-center pt-4 pb-4">
              <svg
                className="w-6 h-6 mb-2 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-1 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-400">
                PNG,jpeg or JPG(MAX. 800 x 800)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple={false}
              onChange={handleInputChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex flex-row gap-2 justify-center items-center py-4">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        }
      >
        {/* <Croppper /> */}
        <Cropper
          ref={cropperRef}
          style={{
            width: 300,
            height: 300,
            maxWidth: 300,
            borderRadius: "10px",
          }}
          initialAspectRatio={1}
          aspectRatio={1 / 1}
          preview=".img-preview"
          src={URL}
          toggleDragModeOnDblclick={true}
          modal={true}
          viewMode={2}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={0.6}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
          checkCrossOrigin={false}
          /* crop={getCropData} */
        />
        {URL === "#" && (
          <div className="absolute h-fit w-full flex flex-col gap-2 items-center justify-center">
            <NoImageIcon className=" h-24 w-24" color="red" />
            <p className="text-xs">[ No Image Selected ]</p>
          </div>
        )}
      </Suspense>
      <div className="block">
        <div className="img-preview overflow-hidden h-32 rounded-full aspect-square " />
        <p className={`${space_mono.className} text-sm mt-2 text-center`}>
          •Preview•
        </p>
      </div>
      <div className="flex justify-center gap-2">
        <button
          disabled={btndisable}
          className={`h-9 w-20 rounded-3xl ${btndisable ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'}`}
          onClick={getCropData}
        >
          {btndisable ? '✖' : 'Ok'}
        </button>
      </div>
    </div>
  );
};

export default React.memo(Crop);
