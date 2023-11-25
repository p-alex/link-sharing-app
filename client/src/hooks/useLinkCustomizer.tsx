import { useState, useCallback, useEffect } from "react";
import { Link, PlatformType, linksSchema } from "../schemas/link.schema";
import useAxiosPrivate from "./useAxiosPrivate";
import { IDefaultResponse } from "../apiRequests";
import { v4 as uuidV4 } from "uuid";
import { ZodError } from "zod";
import { DropResult } from "react-beautiful-dnd";
import suportedLinkPlatforms from "../static/supported-link-platforms";

export type LinkCustomizerFieldErrorType = { [key: number]: { path: string; message: string }[] };

const useLinkCustomizer = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [links, setLinks] = useState<Partial<Link>[]>([]);
  const [responseError, setResponseError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<LinkCustomizerFieldErrorType | null>(null);
  const [isModified, setIsModified] = useState(false);

  const handleGetLinks = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await axiosPrivate.get<IDefaultResponse<{ links: Link[] }>>("/links");
      const data = result.data;
      if (data.success && data.data) {
        setLinks(
          data.data.links
            .map((link) => ({ ...link, isSaved: true }))
            .sort((a, b) => (a.index > b.index ? 1 : -1)),
        );
      }
    } catch (error) {
      setResponseError(
        "Something went wrong while trying to fetch your social links. Try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [axiosPrivate]);

  useEffect(() => {
    handleGetLinks();
  }, [handleGetLinks]);

  const handleRemoveLink = async (linkToBeDeleted: Partial<Link>) => {
    try {
      setIsLoading(true);
      setIsModified(true);
      handleResetFieldErrors();
      let newLinks = links.filter((link) => link.id !== linkToBeDeleted.id);
      if (newLinks.length > 0) {
        newLinks = handleRefreshLinkIndexes(newLinks);
      }
      setLinks(newLinks);
      if (linkToBeDeleted.isSaved) {
        await axiosPrivate.delete("/links", { data: { link: linkToBeDeleted } });
        if (newLinks.length > 0) {
          await handleSaveLinks(newLinks);
        }
      }
    } catch (error) {
      setResponseError("Something went wrong while trying to remove the link. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLinks = async (links: Partial<Link>[]) => {
    try {
      setIsLoading(true);
      setIsModified(false);
      const isValid = handleValidate();
      if (!isValid) return;
      const newLinks = links.map((link) => {
        link.isSaved = true;
        return link;
      });
      setLinks(newLinks);
      await axiosPrivate.put<IDefaultResponse<null>>("/links", { links });
    } catch (error) {
      setResponseError("Something went wrong while trying to save links. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    handleResetFieldErrors();
    handleSaveLinks(links);
  };

  const handleAddLink = async () => {
    if (links.length + 1 > Object.keys(suportedLinkPlatforms).length) return;
    const newLink: Partial<Link> = {
      id: uuidV4(),
      index: links.length,
      platform: "github",
      link: "",
      isSaved: false,
    };
    setLinks((prevState) => [...prevState, newLink]);
  };

  const handleResetFieldErrors = () => {
    setFieldErrors(null);
  };

  const handleChangeLinkPlatform = (linkId: string, platform: PlatformType) => {
    setIsModified(true);
    setLinks((prevState) =>
      prevState.map((link) => {
        if (link.id === linkId) {
          link.platform = platform;
          return link;
        }
        return link;
      }),
    );
  };

  const handleChangeLinkHref = (linkId: string, href: string) => {
    setIsModified(true);
    setLinks((prevState) =>
      prevState.map((link) => {
        if (link.id === linkId) {
          link.link = href;
          return link;
        }
        return link;
      }),
    );
  };

  const handleRefreshLinkIndexes = (links: Partial<Link>[]) => {
    return links.map((link, index) => {
      link.index = index;
      return link;
    });
  };

  const handleValidate = () => {
    try {
      linksSchema.parse(links);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: { [key: number]: { path: string; message: string }[] } = {};
        error.issues.map((issue) => {
          const errorLinkIndex = issue.path[0] as number;
          const errorPath = issue.path[1] as string;
          if (errors[errorLinkIndex]) {
            errors[errorLinkIndex] = [
              ...errors[errorLinkIndex],
              { path: errorPath, message: issue.message },
            ];
          } else {
            errors[errorLinkIndex] = [{ path: errorPath, message: issue.message }];
          }
        });
        setFieldErrors(errors);
      }
      return false;
    }
  };

  const handleReorderLinks = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || !source) return;
    const newLinks = Array.from(links);
    const temp = newLinks[destination.index];
    newLinks[destination.index] = newLinks[source.index];
    newLinks[source.index] = temp;
    setLinks(handleRefreshLinkIndexes(newLinks));
    handleReorderFieldErrors(source.index, destination.index);
    setIsModified(true);
  };

  const handleReorderFieldErrors = (sourceIndex: number, destinationIndex: number) => {
    if (!fieldErrors) return;
    const newFieldError = { ...fieldErrors };
    const temp = newFieldError[destinationIndex];
    newFieldError[destinationIndex] = newFieldError[sourceIndex];
    newFieldError[sourceIndex] = temp;
    setFieldErrors(newFieldError);
  };

  const handleSetResponseError = (message: string) => {
    setResponseError(message);
  };

  useEffect(() => {
    const interval = setInterval(() => handleSetResponseError(""), 5000);
    return () => {
      clearInterval(interval);
    };
  }, [responseError]);

  return {
    links,
    fieldErrors,
    responseError,
    isModified,
    isLoading,
    handleAddLink,
    handleRemoveLink,
    handleChangeLinkPlatform,
    handleChangeLinkHref,
    handleSubmit,
    handleReorderLinks,
  };
};

export default useLinkCustomizer;
