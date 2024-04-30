import { LinkType } from "../../schemas/link.schema";
import SUPPORTED_LINK_PLATFORMS from "../../static/supported-link-platforms";
import ArrowRightIcon from "../../svgs/ArrowRightIcon";

interface Props {
  link: LinkType;
}

const LinkButton = ({ link }: Props) => {
  const btnStyle = SUPPORTED_LINK_PLATFORMS[link.platform].btnStyle;

  return (
    <a
      style={{ color: btnStyle.textColor, backgroundColor: btnStyle.bgColor }}
      className={`flex h-[44px] w-[237px] items-center justify-between rounded-lg px-4 shadow-sm transition-opacity hover:opacity-90`}
      href={link.link ? link.link : "#"}
      target={link.link ? "_blank" : undefined}
      rel={"noreferrer"}
    >
      <div className="flex items-center gap-2">
        {SUPPORTED_LINK_PLATFORMS[link.platform].icon}
        <span className="capitalize">{link.platform}</span>
      </div>
      <ArrowRightIcon width={15} height={15} />
    </a>
  );
};

export default LinkButton;
