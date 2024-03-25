import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LinkType, PlatformType } from "../../../schemas/link.schema";
import swapItemInArray from "../../../utils/swapItemInArray";
import { v4 as uuidV4 } from "uuid";
import { refreshLinksIndexes } from "../../../utils/refreshLinksIndexes";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface ILinksState {
  isLinkListModified: boolean;
  links: LinkType[];
}

const initialState: ILinksState = {
  isLinkListModified: false,
  links: [],
};

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    setLinksAction: (state, action: PayloadAction<LinkType[]>) => {
      state.links = action.payload;
      return state;
    },
    addLinkAction: {
      reducer: (state, action: PayloadAction<{ link: LinkType }>) => {
        state.isLinkListModified = true;
        state.links = [...state.links, action.payload.link];
        return state;
      },
      prepare: ({ index }: { index: number }) => {
        return {
          payload: {
            link: {
              id: uuidV4(),
              index,
              platform: "github" as PlatformType,
              link: "",
              isSaved: false,
            },
          },
        };
      },
    },
    removeLinkAction: (state, action: PayloadAction<{ linkId: string }>) => {
      state.isLinkListModified = false;
      state.links = refreshLinksIndexes(
        state.links.filter((link) => link.id !== action.payload.linkId),
      );
      return state;
    },
    setLinksAsSavedAction: (state) => {
      state.isLinkListModified = false;
      state.links = state.links.map((link, index) => {
        link.isSaved = true;
        link.index = index;
        return link;
      });
      return state;
    },
    reorderLinksAction: (
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>,
    ) => {
      state.isLinkListModified = true;
      state.links = refreshLinksIndexes(
        swapItemInArray(state.links, action.payload.sourceIndex, action.payload.destinationIndex),
      );
      return state;
    },
    setLinkPlatformAction: (
      state,
      action: PayloadAction<{ linkId: string; platform: PlatformType }>,
    ) => {
      state.isLinkListModified = true;
      state.links = state.links.map((link) => {
        if (link.id === action.payload.linkId) {
          link.platform = action.payload.platform;
          link.isSaved = false;
          return link;
        }
        return link;
      });
      return state;
    },
    setLinkHrefAction: (state, action: PayloadAction<{ linkId: string; href: string }>) => {
      state.isLinkListModified = true;
      state.links = state.links.map((link) => {
        if (link.id === action.payload.linkId) {
          link.link = action.payload.href;
          link.isSaved = false;
          return link;
        }
        return link;
      });
      return state;
    },
  },
});

export const useLinksSlice = () => {
  const links = useSelector((state: RootState) => state.links);
  return links;
};

export const {
  setLinksAction,
  addLinkAction,
  removeLinkAction,
  setLinksAsSavedAction,
  reorderLinksAction,
  setLinkPlatformAction,
  setLinkHrefAction,
} = linksSlice.actions;

export const linksReducer = linksSlice.reducer;
