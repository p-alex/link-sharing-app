const objectUrlEncode = <TObject extends { [key: string]: string }>(object: TObject) => {
  return Object.keys(object)
    .map(
      (property) =>
        encodeURIComponent(property) +
        "=" +
        encodeURIComponent(object[property as keyof typeof object]),
    )
    .join("&");
};

export default objectUrlEncode;
