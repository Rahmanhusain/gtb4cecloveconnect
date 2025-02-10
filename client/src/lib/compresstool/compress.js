import jsPDF from "jspdf";

export const compressImage = (file, format, initialQuality, scale) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const imageBlob = new Blob([reader.result], { type: file.type });
        const imageBitmap = await createImageBitmap(imageBlob);

        // Set up OffscreenCanvas for processing
        const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
        const ctx = canvas.getContext("2d");

        // Adjust canvas size for scaling
        const scaleFactor = scale / 100;
        canvas.width = imageBitmap.width * scaleFactor;
        canvas.height = imageBitmap.height * scaleFactor;

        ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

        // Initial compression attempt at the initial quality
        let blob = await canvas.convertToBlob({ type: format, quality: initialQuality });

        if (blob.size <= file.size) {
          // If the compressed blob size is already smaller, resolve with this blob directly
          const reader = new FileReader();
          reader.onloadend = () => {
            const dataUrl = reader.result;
            resolve({
              dataUrl,
              compressedSize: blob.size >= 1048576
                ? (blob.size / 1048576).toFixed(2) + " MB"
                : (blob.size / 1024).toFixed(2) + " KB",
              originalSize: file.size >= 1048576
                ? (file.size / 1048576).toFixed(2) + " MB"
                : (file.size / 1024).toFixed(2) + " KB",
              qualityPercentage: `${(initialQuality * 100).toFixed(2)}%`, // Initial quality as a percentage
              customName: `${file.name.split(".")[0]}_compresso`,
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob); // Convert blob to data URL
          return;
        }

        // Otherwise, perform binary search to find optimal quality
        let minQuality = 0.7;
        let maxQuality = initialQuality;
        let quality = initialQuality;
        let bestBlob = blob;
        let bestQuality = quality;

        while (maxQuality - minQuality >= 0.01) {
          blob = await canvas.convertToBlob({ type: format, quality });

          if (blob.size <= file.size) {
            bestBlob = blob;
            bestQuality = quality;
            minQuality = quality + 0.01;
          } else {
            maxQuality = quality - 0.01;
          }

          quality = parseFloat(((minQuality + maxQuality) / 2).toFixed(2));
        }

        // Calculate final quality as a percentage relative to initialQuality
        const finalQualityPercentage = ((bestQuality / initialQuality) * 100);
        const finalBlob = await canvas.convertToBlob({ type: format, quality: finalQualityPercentage });
        // Convert bestBlob to data URL
        const finalReader = new FileReader();
        finalReader.onloadend = () => {
          const dataUrl = finalReader.result;
          resolve({
            dataUrl,
            compressedSize: bestBlob.size >= 1048576
              ? (bestBlob.size / 1048576).toFixed(2) + " MB"
              : (bestBlob.size / 1024).toFixed(2) + " KB",
            originalSize: file.size >= 1048576
              ? (file.size / 1048576).toFixed(2) + " MB"
              : (file.size / 1024).toFixed(2) + " KB",
            customName: `${file.name.split(".")[0]}_compresso`,
          });
        };

        finalReader.onerror = reject;
        finalReader.readAsDataURL(finalBlob); // Convert bestBlob to data URL
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};


/* export const compressImage = (file, format, quality, scale) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scaleFactor = scale / 100;
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL(format, quality);

      // Convert data URL to Blob for compressed file size calculation
      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
          // Generate a custom filename by appending "_compresso"
          const customName = `${file.name.split(".")[0]}_compresso`;

          resolve({
            // Compressed image data URL for display
            dataUrl,
            compressedSize: blob.size >= 1048576 ? (blob.size / 1048576).toFixed(2) + 'MB' : (blob.size / 1024).toFixed(2) + 'KB',   // Compressed file size in KB or MB
            originalSize: file.size >= 1048576 ? (file.size / 1048576).toFixed(2) + 'MB' : (file.size / 1024).toFixed(2) + 'KB',     // Original file size in KB or MB
            customName              // The new filename with "_compresso" appended
          });
        })
        .catch(reject);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}; */



export const generatePdfBlob = async (compressedFiles) => {
  const pdf = new jsPDF();

  for (let i = 0; i < compressedFiles.length; i++) {
    const { dataUrl } = compressedFiles[i];

    // Get the image properties and PDF dimensions
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate scaled dimensions for the image
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Calculate coordinates to center the image
    const xOffset = (pdfWidth - imgWidth) / 2;
    const yOffset = (pdfHeight - imgHeight) / 2;

    // Add the image to the PDF with calculated offsets for centering
    pdf.addImage(dataUrl, "JPEG", xOffset, yOffset, imgWidth, imgHeight);

    // Add a new page unless it's the last image
    if (i < compressedFiles.length - 1) pdf.addPage();
  }

  // Convert PDF to Blob and return it for preview
  const pdfBlob = pdf.output("blob");
  return pdfBlob;
};
