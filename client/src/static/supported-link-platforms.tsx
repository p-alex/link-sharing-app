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
  [Property in PlatformType]: { icon: React.ReactNode; value: PlatformType };
} = {
  github: { icon: <GithubIcon />, value: "github" },
  youtube: { icon: <YoutubeIcon />, value: "youtube" },
  facebook: { icon: <FacebookIcon />, value: "facebook" },
  twitter: { icon: <TwitterIcon />, value: "twitter" },
  devto: { icon: <DevToIcon />, value: "devto" },
  codewars: { icon: <CodewarsIcon />, value: "codewars" },
  frontendmentor: { icon: <FrontendMentorIcon />, value: "frontendmentor" },
  gitlab: { icon: <GitLabIcon />, value: "gitlab" },
  twitch: { icon: <TwitchIcon />, value: "twitch" },
  linkedin: { icon: <LinkedInIcon />, value: "linkedin" },
  hashnode: { icon: <HashnodeIcon />, value: "hashnode" },
  freecodecamp: { icon: <FreeCodeCampIcon />, value: "freecodecamp" },
  stackoverflow: { icon: <StackOverflowIcon />, value: "stackoverflow" },
};

export default SUPPORTED_LINK_PLATFORMS;
