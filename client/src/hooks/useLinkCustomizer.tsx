import { useState, useCallback, useEffect } from "react";
import { LinkType, PlatformType, linksSchema } from "../schemas/link.schema";
import useAxiosPrivate from "./useAxiosPrivate";
import { IDefaultResponse } from "../apiRequests";
import { v4 as uuidV4 } from "uuid";
import { ZodError } from "zod";
import { DropResult } from "react-beautiful-dnd";
import suportedLinkPlatforms from "../static/supported-link-platforms";
import { useDispatch } from "react-redux";
import {
  addLinkAction,
  removeLinkAction,
  reorderLinksAction,
  saveLinksAction,
  setLinkHrefAction,
  setLinkPlatformAction,
  setLinksAction,
} from "../redux/features/links/linksSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/app/store";

export type LinkCustomizerFieldErrorType = { [key: number]: { path: string; message: string }[] };

const useLinkCustomizer = () => {
  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();

  const links = useSelector((state: RootState) => state.links.links);
  const isLinkListModified = useSelector((state: RootState) => state.links.isLinkListModified);

  const [isLoading, setIsLoading] = useState(true);
  const [responseError, setResponseError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<LinkCustomizerFieldErrorType | null>(null);
  const [isFetchedOnce, setIsFetchedOnce] = useState(false);

  const handleGetLinks = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await axiosPrivate.get<IDefaultResponse<{ links: LinkType[] }>>("/links");
      const data = result.data;
      if (data.success && data.data) {
        const links = data.data.links
          .map((link) => ({ ...link, isSaved: true }))
          .sort((a, b) => (a.index > b.index ? 1 : -1));
        dispatch(setLinksAction(links));
      }
    } catch (error) {
      setResponseError(
        "Something went wrong while trying to fetch your social links. Try again later.",
      );
    } finally {
      setIsLoading(false);
      setIsFetchedOnce(true);
    }
  }, [axiosPrivate, dispatch]);

  useEffect(() => {
    if (isFetchedOnce) return;
    handleGetLinks();
  }, [isFetchedOnce, handleGetLinks]);

  const handleRemoveLink = async (linkToBeDeleted: LinkType) => {
    try {
      setIsLoading(true);
      handleResetFieldErrors();
      dispatch(removeLinkAction({ linkId: linkToBeDeleted.id }));
      if (linkToBeDeleted.isSaved) {
        await axiosPrivate.delete("/links", { data: { link: linkToBeDeleted } });
        dispatch(saveLinksAction());
      }
    } catch (error) {
      setResponseError("Something went wrong while trying to remove the link. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLinks = async (links: Partial<LinkType>[]) => {
    try {
      setIsLoading(true);
      const isValid = handleValidate();
      if (!isValid) return;
      dispatch(saveLinksAction());
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
    const newLink: LinkType = {
      id: uuidV4(),
      index: links.length,
      platform: "github",
      link: "",
      isSaved: false,
    };
    dispatch(addLinkAction({ link: newLink }));
  };

  const handleResetFieldErrors = () => {
    setFieldErrors(null);
  };

  const handleChangeLinkPlatform = (linkId: string, platform: PlatformType) => {
    dispatch(setLinkPlatformAction({ linkId, platform }));
  };

  const handleChangeLinkHref = (linkId: string, href: string) => {
    dispatch(setLinkHrefAction({ linkId, href }));
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
    dispatch(
      reorderLinksAction({ sourceIndex: source.index, destinationIndex: destination.index }),
    );
    handleReorderFieldErrors(source.index, destination.index);
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
    isLinkListModified,
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
