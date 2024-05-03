import { useCallback, useEffect, useState } from "react";
import { IDefaultResponse, axiosPublic } from "../apiRequests";
import { LinkType } from "../schemas/link.schema";
import { useDispatch } from "react-redux";
import {
  setLinksAction,
  setWereLinksFetchedOnce,
  useLinksSlice,
} from "../redux/features/links/linksSlice";
import { addPopupAction } from "../redux/features/globalPopupsSlice/globalPopupsSlice";
import useAuth from "./useAuth";

function useFetchLinksOnce() {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuth, authState } = useAuth();
  const dispatch = useDispatch();

  const { wereLinksFetchedOnce } = useLinksSlice();

  const handleGetLinks = useCallback(async () => {
    try {
      const requestResponse = await axiosPublic.get<IDefaultResponse<{ links: LinkType[] }>>(
        "/links/user/" + authState.id,
      );

      const result = requestResponse.data;

      if (result.success && result.data) {
        const links = result.data.links
          .map((link) => ({ ...link, isSaved: true }))
          .sort((a, b) => (a.index > b.index ? 1 : -1));

        dispatch(setLinksAction(links));
        dispatch(setWereLinksFetchedOnce());
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
    }
  }, [dispatch]);

  useEffect(() => {
    if (wereLinksFetchedOnce && isAuth) {
      setIsLoading(false);
      return;
    }
    if (isAuth) handleGetLinks();
    setIsLoading(false);
  }, [isAuth]);

  return { isFetchLinksOnceLoading: isLoading };
}

export default useFetchLinksOnce;
