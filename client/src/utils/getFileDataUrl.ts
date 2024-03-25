export const getFileDataUrl = async (file: File) => {
  const currentFile = new FileReader();
  const result: string = await new Promise((resolve) => {
    currentFile.readAsDataURL(file);
    currentFile.onload = () => {
      resolve(currentFile.result as string);
    };
  });
  return result;
};
