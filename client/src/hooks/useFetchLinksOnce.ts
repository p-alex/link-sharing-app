import { useCallback, useEffect } from "react";
import { IDefaultResponse, axiosPrivate } from "../apiRequests";
import { LinkType } from "../schemas/link.schema";
import { useDispatch } from "react-redux";
import {
  setLinksAction,
  setWereLinksFetchedOnce,
  useLinksSlice,
} from "../redux/features/links/linksSlice";
import { addPopupAction } from "../redux/features/globalPopupsSlice/globalPopupsSlice";

function useFetchLinksOnce() {
  const dispatch = useDispatch();

  const { wereLinksFetchedOnce } = useLinksSlice();

  const handleGetLinks = useCallback(async () => {
    try {
      const requestResponse =
        await axiosPrivate.get<IDefaultResponse<{ links: LinkType[] }>>("/links");

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
    }
  }, [dispatch]);

  useEffect(() => {
    if (wereLinksFetchedOnce) return;
    console.log("here");
    handleGetLinks();
  }, []);

  return null;
}

export default useFetchLinksOnce;
