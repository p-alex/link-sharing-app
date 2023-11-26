import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LinkType, PlatformType } from "../../../schemas/link.schema";
import swapItemInArray from "../../../utils/swapItemInArray";

interface ILinksState {
  isLinkListModified: boolean;
  links: LinkType[];
}

const initialState: ILinksState = {
  isLinkListModified: false,
  links: [],
};

const refreshLinksIndexes = (links: LinkType[]) => {
  return links.map((link, index) => {
    link.index = index;
    return link;
  });
};

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    setLinksAction: (state, action: PayloadAction<LinkType[]>) => {
      state.links = action.payload;
      return state;
    },
    addLinkAction: (state, action: PayloadAction<{ link: LinkType }>) => {
      state.isLinkListModified = true;
      state.links = [...state.links, action.payload.link];
      return state;
    },
    removeLinkAction: (state, action: PayloadAction<{ linkId: string }>) => {
      state.isLinkListModified = false;
      state.links = refreshLinksIndexes(
        state.links.filter((link) => link.id !== action.payload.linkId),
      );
      return state;
    },
    saveLinksAction: (state) => {
      state.isLinkListModified = false;
      state.links = state.links.map((link) => {
        link.isSaved = true;
        return link;
      });
      return state;
    },
    reorderLinksAction: (
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>,
    ) => {
      state.isLinkListModified = true;
      state.links[action.payload.sourceIndex].isSaved = false;
      state.links[action.payload.destinationIndex].isSaved = false;
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

export const {
  setLinksAction,
  addLinkAction,
  removeLinkAction,
  saveLinksAction,
  reorderLinksAction,
  setLinkPlatformAction,
  setLinkHrefAction,
} = linksSlice.actions;

export const linksReducer = linksSlice.reducer;
