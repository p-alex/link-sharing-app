export const imageOptimizer = async (
  imgDataUrl: string,
  maxWidth: number,
  maxHeight: number,
  quality: number,
  imageType: "image/jpeg" | "image/png" | "image/webp",
  minWidth: number = 200,
  minHeight: number = 200,
): Promise<string> => {
  if (quality < 0 || quality > 1) throw new Error("Quality must be a value between 0 and 1");
  const result: string = await new Promise((resolve) => {
    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    const img = document.createElement("img");

    img.src = imgDataUrl;

    img.onload = () => {
      if (img.width > img.height) {
        if (img.width > maxWidth) {
          img.height *= maxWidth / img.width;
          img.width = maxWidth;
        } else if (img.width < minWidth) {
          img.height *= minWidth / img.width;
          img.width = minWidth;
        }
      } else {
        if (img.height > maxHeight) {
          img.width *= maxHeight / img.height;
          img.height = maxHeight;
        } else if (img.height < minHeight) {
          img.width *= minHeight / img.height;
          img.height = minHeight;
        }
      }

      canvas.width = img.width;

      canvas.height = img.height;

      ctx?.drawImage(img, 0, 0, img.width, img.height);

      const result: string = canvas.toDataURL(imageType, quality);

      resolve(result);
    };
  });

  return result;
};
