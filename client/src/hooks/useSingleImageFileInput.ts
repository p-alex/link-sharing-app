import { useRef } from "react";
import { imageOptimizer } from "../utils/imageOptimizer";
import { getFileDataUrl } from "../utils/getFileDataUrl";

const useSingleImageFileInput = ({ callback }: { callback: (image: string) => Promise<void> }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const image = event.target.files[0];
    if (!image) return;
    const imageDataUrl = await getFileDataUrl(image);
    const optimizedImage = await imageOptimizer(imageDataUrl, 1024, 1024, 0.25, "image/webp");
    await callback(optimizedImage);
  };

  return { fileInputRef, handleFileInputOnChange, handleChooseImage };
};

export default useSingleImageFileInput;
