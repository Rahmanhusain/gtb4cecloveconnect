"use client";
import {
  CloudUploadIcon,
  MiniloadIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@/icons/icon";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks/hooks";
import WarningModal from "./WarningModal";


function CompressTool() {
  const user = useAppSelector((state) => state.Authenticator);
  const [files, setFiles] = useState([]);
  const [compressedFiles, setCompressedFiles] = useState([]);
  const [quality, setQuality] = useState(90); // Compression quality (0-1)
  const [scale, setScale] = useState(90); // Scale percentage
  const [format, setFormat] = useState("image/jpeg"); // Default format
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [pdfSize, setPdfSize] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef(null);
  const [isWarnOpen, setisWarnOpen] = useState(false);
  const messageref = useRef(null);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  /*  const handleCompress = async () => {
    const qualityindec = quality * 0.01;
    setCompressing(true); // Set compressing state
    const compressedDataUrls = await Promise.all(
      files.map((file) =>
        compressImage(
          file,
          format === "application/pdf" ? "image/jpeg" : format,
          qualityindec,
          scale
        )
      )
    );
    setCompressedFiles(compressedDataUrls); // Set compressed files for preview

    if (format === "application/pdf") {
      const pdfBlob = await generatePdfBlob(compressedDataUrls);
      const sizeInKB = pdfBlob.size / 1024;
      const sizeInMB = sizeInKB / 1024;
      setPdfSize(
        sizeInMB >= 1
          ? sizeInMB.toFixed(2) + " MB"
          : sizeInKB.toFixed(2) + " KB"
      ); // File size in KB or MB
      setPdfPreviewUrl(URL.createObjectURL(pdfBlob)); // Set preview URL
    }
    setCompressing(false); // Reset compressing state
  }; */

  const handleCompress = () => {
    setCompressing(true);

    const worker = new Worker(
      new URL("../webworkers/compress.worker.js", import.meta.url),
      { type: "module" }
    );

    worker.postMessage({ files, format, quality: quality * 0.01, scale });

    worker.onmessage = (event) => {
      const { compressedDataUrls, pdfBlob, pdfSize, error } = event.data;

      if (error) {
        console.error("Error:", error);
      } else {
        setCompressedFiles(compressedDataUrls);
        if (format === "application/pdf" && pdfBlob) {
          setPdfPreviewUrl(URL.createObjectURL(pdfBlob));
          setPdfSize(pdfSize);
        }
      }

      setCompressing(false);
      worker.terminate();
    };
  };

  const handleSavePdf = () => {
    if (pdfPreviewUrl) {
      const link = document.createElement("a");
      link.href = pdfPreviewUrl;
      link.download = prompt("Enter file name", "compressed_images") + ".pdf";
      link.click();
    }
  };

  const handleRemoveFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleQualityChange = (value) => {
    if (value < 50 && user.email === null) {
      messageref.current =
        "Please Create An Account or Login To Compress below 50% Quality!";
      setQuality(Math.min(90, Math.max(50, value)));
      setisWarnOpen(true);
      return;
    }
    setQuality(Math.min(90, Math.max(5, value))); // Set quality as a fraction
  };

  const handleScaleChange = (value) => {
    if (value < 50 && user.email === null) {
      messageref.current =
        "Please Create An Account or Login To Compress below 50% Scale!";
      setScale(Math.min(90, Math.max(50, value)));
      setisWarnOpen(true);
      return;
    }
    setScale(Math.min(90, Math.max(5, value)));
  };

  const handleDownload = () => {
    compressedFiles.forEach((imageData, index) => {
      const a = document.createElement("a");
      a.href = imageData.dataUrl;
  
      // Force .jpg extension if the format is image/jpeg
      const fileExtension = format === "image/jpeg" ? ".jpg" : "";
      const customFileName = imageData.customName || `image_${index + 1}`;
      a.download = `${customFileName}${fileExtension}`;
  
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };
  

  return (
    <div className="flex flex-col items-center gap-4 font-sans text-gray-800 p-4 max-w-2xl mx-auto mt-24">
      {/* File Upload Box */}
      <div className="border-2 border-dashed border-primary rounded-lg p-4 text-primary text-center cursor-pointer w-full">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          id="fileInput"
          ref={fileInputRef}
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          <CloudUploadIcon className="w-12 h-12 text-primary mx-auto" />
          <span className="font-serif">Upload/add file</span>
        </label>
      </div>

      {/* File Tags */}
      <div className="flex flex-wrap gap-2 w-full overflow-x-auto">
        {files.map((file, index) => (
          <div
            key={index}
            className="bg-blue-100 border border-dashed border-primary rounded-full px-3 py-1 flex items-center gap-2"
          >
            {file.name}
            <button
              onClick={() => handleRemoveFile(file.name)}
              className="text-primary hover:text-blue-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Control Box */}
      <div className="border border-gray-300 rounded-lg p-4 bg-blue-50 w-full">
        <div className="flex items-center gap-2 mb-4">
          <span>Quality (%) :</span>
          <button
            onClick={() => {
              handleQualityChange(quality - 1);
            }}
            className="cursor-pointer flex justify-center items-center"
          >
            <MinusCircleIcon className="w-6 h-6 text-primary" />
          </button>
          <input
            id="Quality"
            type="number"
            name="Quality"
            value={quality}
            onChange={(e) => {
              if (e.target.value.length === 0) {
                e.target.style.outline = "2px solid red";
                setQuality(String(e.target.value));
                return;
              }
              if (e.target.value < 50 && user.email === null) {
                e.target.value < 50 &&
                  (e.target.style.outline = "2px solid red");
                if (e.target.value.length === 2) {
                  messageref.current =
                    "Please Create An Account or Login To Compress below 50% Quality!";
                  setisWarnOpen(true);
                }
                setQuality(e.target.value);
              } else {
                e.target.style.outline = "none";
                setQuality(parseInt(e.target.value));
              }
            }}
            onBlur={(e) => {
              if (e.target.value.length === 0) {
                e.target.style.outline = "2px solid red";
                setQuality(String(e.target.value));
                return;
              }
              if (e.target.value < 50 && user.email === null) {
                e.target.value < 50 &&
                  (e.target.style.outline = "2px solid red");
                if (e.target.value.length === 2) {
                  messageref.current =
                    "Please Create An Account or Login To Compress below 50% Quality!";
                  setisWarnOpen(true);
                }
                handleQualityChange(parseInt(e.target.value));
              } else {
                handleQualityChange(parseInt(e.target.value));
              }
            }}
            className="text-center w-16 h-8 border border-gray-300 outline-none rounded no-spinner"
          />
          <button
            onClick={() => {
              handleQualityChange(quality + 1);
            }}
            className="cursor-pointer flex justify-center items-center"
          >
            <PlusCircleIcon className="w-6 h-6 text-primary" />
          </button>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span>Scale (%) :</span>
          <button
            onClick={() => {
              handleScaleChange(scale - 1);
            }}
            className="cursor-pointer flex justify-center items-center"
          >
            <MinusCircleIcon className="w-6 h-6 text-primary" />
          </button>
          <input
            type="number"
            id="Scale"
            name="Scale"
            value={scale}
            onChange={(e) => {
              if (e.target.value.length === 0) {
                e.target.style.outline = "2px solid red";
                setScale(String(e.target.value));
                return;
              }
              if (e.target.value < 50 && user.email === null) {
                e.target.value < 50 &&
                  (e.target.style.outline = "2px solid red");
                if (e.target.value.length === 2) {
                  messageref.current =
                    "Please Create An Account or Login To Compress below 50% Quality!";
                  setisWarnOpen(true);
                }
                setScale(e.target.value);
              } else {
                e.target.style.outline = "none";
                setScale(parseInt(e.target.value));
              }
            }}
            onBlur={(e) => {
              if (e.target.value.length === 0) {
                e.target.style.outline = "2px solid red";
                setScale(String(e.target.value));
                return;
              }
              if (e.target.value < 50 && user.email === null) {
                e.target.value < 50 &&
                  (e.target.style.outline = "2px solid red");
                if (e.target.value.length === 2) {
                  messageref.current =
                    "Please Create An Account or Login To Compress below 50% Quality!";
                  setisWarnOpen(true);
                }
                handleScaleChange(parseInt(e.target.value));
              }
              handleScaleChange(parseInt(e.target.value));
            }}
            className="text-center w-16 h-8 border border-gray-300 outline-none rounded"
          />
          <button
            onClick={() => {
              handleScaleChange(scale + 1);
            }}
            className="cursor-pointer flex justify-center items-center"
          >
            <PlusCircleIcon className="w-6 h-6 text-primary" />
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            disabled={compressing || files.length === 0}
            className={`${
              compressing || files.length === 0
                ? "bg-gray-200 text-black cursor-not-allowed"
                : "bg-hover text-white"
            } rounded px-2 py-2 outline-none cursor-pointer font-serif`}
            onChange={(e) => setFormat(e.target.value)}
            onClick={() => {
              if (user.email === null) {
                setisWarnOpen(true);
                messageref.current =
                  "Please Create An Account or Login To convert into PDF and WebP!";
              }
            }}
          >
            <option value="image/jpeg">JPEG</option>
            <option
              disabled={user.email === null}
              className={`${user.email === null ? "bg-gray-300" : ""}`}
              value="application/pdf"
            >
              PDF
            </option>
            <option
              disabled={user.email === null}
              className={`${user.email === null ? "bg-gray-300" : ""}`}
              value="image/webp"
            >
              WEBP
            </option>
          </select>

          <button
            disabled={
              compressing ||
              files.length === 0 ||
              (user.email === null && quality < 50) ||
              (user.email === null && scale < 50) ||
              quality === "" ||
              scale === ""
            }
            className={`${
              compressing ||
              files.length === 0 ||
              (user.email === null && quality < 50) ||
              (user.email === null && scale < 50) ||
              quality === "" ||
              scale === ""
                ? "bg-gray-200 text-black cursor-not-allowed"
                : "bg-green-700 text-white"
            } rounded px-4 py-2 flex gap-2 items-center font-serif`}
            onClick={handleCompress}
          >
            {compressing ? (
              <>
                <MiniloadIcon className="animate-spin-fast text-black w-4 h-4" />{" "}
                Compressing
              </>
            ) : (
              "Compress"
            )}
          </button>
          <button
            disabled={compressing}
            className={`${
              compressing || compressedFiles.length === 0
                ? "bg-gray-200 text-black cursor-not-allowed"
                : "bg-hover text-white"
            } rounded px-4 py-2 inline-flex items-center font-serif`}
            onClick={handleDownload}
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            Download
          </button>
          <button
            disabled={compressing}
            className={`${
              compressing ||
              (files.length === 0 && compressedFiles.length === 0)
                ? "bg-gray-200 text-black cursor-not-allowed"
                : "bg-hover text-white"
            } rounded px-4 py-2 inline-flex items-center font-serif`}
            onClick={() => {
              setFiles([]);
              setCompressedFiles([]);
              setPdfPreviewUrl(null);
              setPdfSize(null);
              setQuality(90);
              setScale(90);
              if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Reset file input
              }
            }}
          >
            <svg
              className="fill-current w-5 h-5 mr-1 transform scale-x-[-1] rotate-45 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
            </svg>
            Reset
          </button>
        </div>
      </div>

      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg flex items-center space-x-3">
        <svg
          className="md:w-6 md:h-6 w-5 h-5 text-purple-600 flex-shrink-0"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div className="text-sm text-purple-600">
          <span className="font-semibold">
            <strong>Note:</strong> Compressing to default or high values like
            90% can increase file size due to file type, Image quality, and
            encoding. Reducing the scale and quality can help achieve smaller
            sizes.{'(Fixed)'}
          </span>
        </div>
      </div>

      {/* Image Preview */}
      <div className="border  border-gray-300 rounded-lg p-4 gap-2 bg-gray-50 w-full flex items-center h-64 overflow-x-auto">
        {format !== "application/pdf" &&
          compressedFiles.map((data, index) => (
            <div
              key={index}
              className="relative min-w-[10rem] max-w-[10rem] flex-shrink-0 border border-gray-200 h-full rounded-sm"
            >
              {/* <a
                href={data.dataUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                <ArrowsIcon className="absolute top-1 right-1 w-4 h-4 text-blue-500" />
              </a> */}
              <Image
                src={data.dataUrl}
                width={0}
                height={0}
                alt={`Compressed Preview ${index + 1}`}
                loading="lazy"
                className="object-contain w-full h-full"
              />

              <span className="absolute bottom-1 left-1 text-xs rounded-full py-[0.1rem] px-2 bg-slate-200">
                {data.originalSize}
              </span>
              <span className="absolute bottom-1 right-1 text-xs rounded-full py-[0.1rem] px-2 bg-slate-200">
                {data.compressedSize}
              </span>
            </div>
          ))}

        {pdfPreviewUrl && format === "application/pdf" && (
          <div className="flex flex-col items-center mx-auto gap-2">
            <Link
              href={pdfPreviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Preview PDF
            </Link>
            <p>PDF Size: {pdfSize}</p>
            <button
              onClick={handleSavePdf}
              className="bg-primary text-white rounded px-4 py-2"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
      {isWarnOpen && (
        <WarningModal
          messege={messageref.current}
          setisWarnOpen={setisWarnOpen}
        />
      )}
      <div className="w-full p-8">
        <h2 className="text-3xl font-semibold py-5 text-center">About Us</h2>
        <p className="py-5 text-justify">
          Our platform, Compresso.io, is an image compression and image to PDF conversion
          tool designed to make file optimization easy and efficient. It lets
          sers compress images by adjusting quality percentage and scaling,
          achieving the ideal balance between file size and clarity.
          Compresso.io also supports conversion to PDF and WebP formats, making
          it a versatile solution for web, storage, or digital sharing.
          <br />
          <br />A standout feature of Compresso.io is real-time preview
          functionality. As users modify compression settings or convert
          formats, they can instantly see the effects on both quality and file
          size, with a live preview for PDFs that ensures the document appears
          exactly as needed before saving. With its intuitive interface and
          responsive previews, Compresso.io delivers a smooth, user-friendly
          experience for all, from professionals to casual users looking to
          optimize images.
        </p>
      </div>
    </div>
  );
}

export default CompressTool;
