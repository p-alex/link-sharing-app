const urlEncode = <TPayload extends { [key: string]: string }>(payload: TPayload) => {
  return Object.keys(payload)
    .map(
      (property) =>
        encodeURIComponent(property) +
        "=" +
        encodeURIComponent(payload[property as keyof typeof payload]),
    )
    .join("&");
};

export default urlEncode;
