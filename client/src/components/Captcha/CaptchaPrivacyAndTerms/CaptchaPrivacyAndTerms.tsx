const CaptchaPrivacyAndTerms = () => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <a
        href="https://www.hcaptcha.com/what-is-hcaptcha-about?ref=localhost&utm_campaign=19307c31-ac29-4929-a201-01c56507a915&utm_medium=checkbox"
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center gap-1"
      >
        <img src="/images/hcaptcha-icon.svg" width={32} height={32} />{" "}
        <p className="text-xs font-bold text-primary">hCaptcha</p>
      </a>

      <div>
        <a
          href="https://www.hcaptcha.com/privacy"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-primary"
        >
          Privacy
        </a>
        <span className="text-gray-300"> • </span>
        <a
          href="https://www.hcaptcha.com/terms"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-primary"
        >
          Terms
        </a>
      </div>
    </div>
  );
};

export default CaptchaPrivacyAndTerms;
