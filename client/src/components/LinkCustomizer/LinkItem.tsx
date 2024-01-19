import { GrabIcon, LinkIcon } from "../../svgs";
import { LinkType, PlatformType } from "../../schemas/link.schema";
import InputGroup from "../InputGroup";
import { LinkCustomizerFieldErrorType } from "./useLinkCustomizer";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import SUPPORTED_LINK_PLATFORMS from "../../static/supported-link-platforms";

interface Props {
  link: LinkType;
  links: LinkType[];
  handleRemoveLink: (link: LinkType) => Promise<void>;
  handleChangeLinkPlatform: (linkId: string, platform: PlatformType) => void;
  handleChangeLinkHref: (id: string, value: string) => void;
  fieldErrors: LinkCustomizerFieldErrorType | null;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const LinkItem = ({
  link,
  links,
  fieldErrors,
  handleRemoveLink,
  handleChangeLinkPlatform,
  handleChangeLinkHref,
  dragHandleProps,
}: Props) => {
  return (
    <div
      className="relative flex select-none flex-col gap-4 rounded-lg border border-transparent bg-lightGray p-5 transition-colors"
      data-index={link.index}
    >
      <div className="flex items-center justify-between">
        <div className={`group flex items-center gap-1`} {...dragHandleProps}>
          <GrabIcon width={16} height={16} />
          <p className="font-bold">Link #{link.index + 1}</p>
        </div>
        <button
          className="text-mediumGrey transition-colors hover:text-error"
          type="button"
          onClick={() => handleRemoveLink(link)}
        >
          Remove
        </button>
      </div>
      <InputGroup
        label={
          <InputGroup.InputLabel
            htmlFor={`platform-${link.id}`}
            onClick={() => {
              const result = document.getElementById(`platform-${link.id}`);
              result?.querySelectorAll("button")[0].focus();
            }}
          >
            Platform
          </InputGroup.InputLabel>
        }
        input={
          <InputGroup.SelectContainer
            linkId={link.id!}
            selectedOption={SUPPORTED_LINK_PLATFORMS[link.platform]}
            options={Object.values(SUPPORTED_LINK_PLATFORMS)}
            handleOnChange={(value) => {
              handleChangeLinkPlatform(link.id, value as PlatformType);
            }}
          />
        }
        error={
          fieldErrors &&
          fieldErrors[link.index] &&
          fieldErrors[link.index][0].path === "platform" ? (
            <InputGroup.InputError>{fieldErrors[link.index][0].message}</InputGroup.InputError>
          ) : null
        }
      />
      <InputGroup
        label={<InputGroup.InputLabel htmlFor={`link-${link.id}`}>Link</InputGroup.InputLabel>}
        input={
          <InputGroup.Input
            id={`link-${link.id}`}
            icon={<LinkIcon width={16} height={16} />}
            type="text"
            placeholder="Paste the link to your profile"
            onChange={(event) => handleChangeLinkHref(link.id, event.target.value)}
            value={links[link.index].link}
          />
        }
        error={
          fieldErrors && fieldErrors[link.index] && fieldErrors[link.index][0].path === "link" ? (
            <InputGroup.InputError>{fieldErrors[link.index][0].message}</InputGroup.InputError>
          ) : null
        }
      />
    </div>
  );
};

export default LinkItem;
