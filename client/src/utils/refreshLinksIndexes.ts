import { LinkType } from "../schemas/link.schema";

export const refreshLinksIndexes = (links: LinkType[]) => {
  return links.map((link, index) => {
    const newLink = { ...link, index };
    return newLink;
  });
};
