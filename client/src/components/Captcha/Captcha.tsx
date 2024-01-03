import HCaptcha from "@hcaptcha/react-hcaptcha";

const Captcha = ({ captchaRef }: { captchaRef: React.RefObject<HCaptcha> }) => {
  return (
    <div className="hidden">
      <HCaptcha sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY} ref={captchaRef} />
    </div>
  );
};

export default Captcha;
