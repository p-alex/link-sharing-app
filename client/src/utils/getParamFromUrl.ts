const getParamFromUrl = (key: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get(key);
    return param;
  };

export default getParamFromUrl;