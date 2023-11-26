const swapItemInArray = <TArrayItem>(
  array: TArrayItem[],
  sourceIndex: number,
  destinationIndex: number,
) => {
  const newArray = [...array];
  const temp = newArray[destinationIndex];
  newArray[destinationIndex] = newArray[sourceIndex];
  newArray[sourceIndex] = temp;
  return newArray;
};

export default swapItemInArray;
