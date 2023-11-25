import { ZodIssueCode, z } from "zod";

export const PLATFORMS_LIST = [
  "github",
  "youtube",
  "facebook",
  "twitter",
  "devto",
  "codewars",
  "frontendmentor",
  "gitlab",
  "twitch",
  "linkedin",
  "hashnode",
  "freecodecamp",
  "stackoverflow",
] as const;

export const linkSchema = z
  .object({
    id: z.string().uuid(),
    platform: z.enum(PLATFORMS_LIST),
    link: z.string().min(1, "Can't be blank").url(),
    index: z.number().min(0),
  })
  .superRefine((val, ctx) => {
    function addIssue(platform: typeof val.platform) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `Invalid ${platform.toLowerCase()} link`,
        path: ["link"],
      });
    }
    switch (val.platform) {
      case "github":
        if (!val.link.match(/https:\/\/(www\.)?(github.com\/)[a-zA-Z\-@_0-9]+/g)?.[0])
          addIssue(val.platform);
        break;
      case "youtube":
        if (!val.link.match(/https:\/\/(www\.)?(youtube.com\/)[a-zA-Z\-@_0-9]+/g)?.[0])
          addIssue(val.platform);
        break;
      case "facebook":
        if (!val.link.match(/https:\/\/(www\.)?(facebook.com\/)[a-zA-Z\-@_0-9]+/g)?.[0])
          addIssue(val.platform);
        break;
      case "twitter":
        if (!val.link.match(/https:\/\/(www\.)?(twitter.com\/)[a-zA-Z\-@_0-9]+/g)?.[0])
          addIssue(val.platform);
        break;
      case "devto":
        if (!val.link.match(/https:\/\/(www\.)?(dev.to\/)[a-zA-Z\-@_0-9]+/g)?.[0])
          addIssue(val.platform);
        break;
      case "codewars":
        if (!val.link.match(/https:\/\/(www\.)?(codewars.com\/users\/)[a-zA-Z\-@_0-9]+/g)?.[0])
          addIssue(val.platform);
        break;
      case "freecodecamp":
        if (!val.link.match(/https:\/\/(www\.)?(freecodecamp.org\/)[a-zA-Z\-@_0-9]+/g)?.[0])
          addIssue(val.platform);
        break;
      case "frontendmentor":
        if (
          !val.link.match(/https:\/\/(www\.)?(frontendmentor.io\/profile\/)[a-zA-Z\-@_0-9]+/g)?.[0]
        )
          addIssue(val.platform);
        break;
      case "gitlab":
        if (!val.link.match(/https:\/\/(www\.)?(gitlab.com\/)[a-zA-Z\-@_0-9]+/g)?.[0])
          addIssue(val.platform);
        break;
      case "hashnode":
        if (!val.link.match(/https:\/\/(www\.)?(hashnode.com\/)[a-zA-Z\-@_0-9]+/g)?.[0])
          addIssue(val.platform);
        break;
      case "linkedin":
        if (!val.link.match(/https:\/\/(www\.)?(linkedin.com\/in\/)[a-zA-Z\-@_0-9]+/g)?.[0])
          addIssue(val.platform);
        break;
      case "stackoverflow":
        if (
          !val.link.match(
            /https:\/\/(www\.)?(stackoverflow.com\/users\/[0-9]{8}\/)[a-zA-Z\-@_0-9]+/g,
          )?.[0]
        )
          addIssue(val.platform);
        break;
      case "twitch":
        if (!val.link.match(/https:\/\/(www\.)?(twitch.tv\/)[a-zA-Z\-@_0-9]+/g)?.[0])
          addIssue(val.platform);
        break;
      default:
        break;
    }
  });

export const linksSchema = z.array(linkSchema);

export const createLinkSchema = z.object({ link: linkSchema });

export const deleteLinkSchema = z.object({
  link: linkSchema,
});

export const saveLinksSchema = z.object({
  links: linksSchema,
});
