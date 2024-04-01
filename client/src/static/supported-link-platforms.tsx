import { PlatformType } from "../schemas/link.schema";
import {
  CodewarsIcon,
  DevToIcon,
  FacebookIcon,
  FreeCodeCampIcon,
  FrontendMentorIcon,
  GitLabIcon,
  GithubIcon,
  HashnodeIcon,
  LinkedInIcon,
  StackOverflowIcon,
  TwitchIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../svgs";

const SUPPORTED_LINK_PLATFORMS: {
  [Property in PlatformType]: {
    icon: React.ReactNode;
    value: PlatformType;
    btnStyle: {
      textColor: string;
      bgColor: string;
    };
  };
} = {
  github: {
    icon: <GithubIcon />,
    value: "github",
    btnStyle: { textColor: "#FFFFFF", bgColor: "#1A1A1A" },
  },
  youtube: {
    icon: <YoutubeIcon />,
    value: "youtube",
    btnStyle: { textColor: "#FFFFFF", bgColor: "#EE3939" },
  },
  facebook: {
    icon: <FacebookIcon />,
    value: "facebook",
    btnStyle: { textColor: "#FFFFFF", bgColor: "#2442AC" },
  },
  twitter: {
    icon: <TwitterIcon />,
    value: "twitter",
    btnStyle: { textColor: "#FFFFFF", bgColor: "#43B7E9" },
  },
  devto: {
    icon: <DevToIcon />,
    value: "devto",
    btnStyle: { textColor: "#FFFFFF", bgColor: "#333333" },
  },
  codewars: {
    icon: <CodewarsIcon />,
    value: "codewars",
    btnStyle: { textColor: "#FFFFFF", bgColor: "#8A1A50" },
  },
  frontendmentor: {
    icon: <FrontendMentorIcon />,
    value: "frontendmentor",
    btnStyle: {
      textColor: "#000000",
      bgColor: "#FFFFFF",
    },
  },
  gitlab: {
    icon: <GitLabIcon />,
    value: "gitlab",
    btnStyle: { textColor: "#FFFFFF", bgColor: "#EB4925" },
  },
  twitch: {
    icon: <TwitchIcon />,
    value: "twitch",
    btnStyle: { textColor: "#FFFFFF", bgColor: "#EE3FC8" },
  },
  linkedin: {
    icon: <LinkedInIcon />,
    value: "linkedin",
    btnStyle: { textColor: "#FFFFFF", bgColor: "#0A66C2" },
  },
  hashnode: {
    icon: <HashnodeIcon />,
    value: "hashnode",
    btnStyle: { textColor: "#FFFFFF", bgColor: "#0330D1" },
  },
  freecodecamp: {
    icon: <FreeCodeCampIcon />,
    value: "freecodecamp",
    btnStyle: { textColor: "#FFFFFF", bgColor: "#302267" },
  },
  stackoverflow: {
    icon: <StackOverflowIcon />,
    value: "stackoverflow",
    btnStyle: { textColor: "#FFFFFF", bgColor: "#EC7100" },
  },
};

export default SUPPORTED_LINK_PLATFORMS;
