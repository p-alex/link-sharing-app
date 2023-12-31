import { useState, useCallback, useEffect } from "react";
import { LinkType, PlatformType, linksSchema } from "../../schemas/link.schema";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IDefaultResponse } from "../../apiRequests";
import { ZodError } from "zod";
import { DropResult } from "react-beautiful-dnd";
import suportedLinkPlatforms from "../../static/supported-link-platforms";
import { useDispatch } from "react-redux";
import {
  addLinkAction,
  removeLinkAction,
  reorderLinksAction,
  setLinkHrefAction,
  setLinkPlatformAction,
  setLinksAction,
  setLinksAsSavedAction,
} from "../../redux/features/links/linksSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import { addPopupAction } from "../../redux/features/globalPopupsSlice/globalPopupsSlice";
import { refreshLinksIndexes } from "../../utils/refreshLinksIndexes";

export type LinkCustomizerFieldErrorType = { [key: number]: { path: string; message: string }[] };

const useLinkCustomizer = () => {
  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();

  const links = useSelector((state: RootState) => state.links.links);
  const isLinkListModified = useSelector((state: RootState) => state.links.isLinkListModified);

  const [isLoading, setIsLoading] = useState(true);
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
      dispatch(
        addPopupAction({
          message: "Something went wrong while trying to fetch your social links. Try again later.",
          type: "error",
        }),
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
    if (!linkToBeDeleted.isSaved) {
      dispatch(removeLinkAction({ linkId: linkToBeDeleted.id }));
      return;
    }
    try {
      setIsLoading(true);
      handleResetFieldErrors();
      if (linkToBeDeleted.isSaved) {
        await axiosPrivate.delete("/links", { data: { link: linkToBeDeleted } });
        dispatch(removeLinkAction({ linkId: linkToBeDeleted.id }));
        const newLinks = refreshLinksIndexes(
          links.filter((link) => link.id !== linkToBeDeleted.id),
        );
        if (newLinks.length > 0) {
          await handleSaveLinks(newLinks);
        }
      }
    } catch (error) {
      dispatch(
        addPopupAction({
          message: "Error occured while trying to remove the link. Try again later.",
          type: "error",
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLinks = async (links: LinkType[]) => {
    try {
      setIsLoading(true);
      const isValid = handleValidate();
      if (!isValid) return;
      await axiosPrivate.put<IDefaultResponse<null>>("/links", { links });
      dispatch(setLinksAsSavedAction());
      dispatch(addPopupAction({ message: "Links saved successfully!", type: "info" }));
    } catch (error) {
      dispatch(
        addPopupAction({
          message: "Something went wrong while trying to save links. Try again later.",
          type: "error",
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    handleResetFieldErrors();
    await handleSaveLinks(links);
  };

  const handleAddLink = async () => {
    if (links.length + 1 > Object.keys(suportedLinkPlatforms).length) return;
    dispatch(addLinkAction({ index: links.length }));
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

  return {
    links,
    fieldErrors,
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
