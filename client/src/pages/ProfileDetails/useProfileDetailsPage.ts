import { useSelector } from "react-redux";
import { IDefaultResponse, axiosPrivate } from "../../apiRequests";
import useIsWindowSizeLowerThan from "../../hooks/useIsWindowSizeLowerThan";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { imageOptimizer } from "../../utils/imageOptimizer";
import {
  IProfile,
  removeProfilePictureAction,
  updateProfileAction,
} from "../../redux/features/profile/profileSlice";
import { addPopupAction } from "../../redux/features/globalPopupsSlice/globalPopupsSlice";
import { RootState } from "../../redux/app/store";
import { UpdateProfileDetailsInputType } from "./ProfileDetailsPage.schema";

const useProfileDetailsPage = ({
  resetForm,
}: {
  resetForm: (formData?: UpdateProfileDetailsInputType) => void;
}) => {
  const [isRemoveProfilePictureLoading, setIsRemoveProfilePictureLoading] = useState(false);
  const profile = useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateProfileDetails = async (formData: UpdateProfileDetailsInputType) => {
    if (formData.profilePicture.match(/^data:image/)) {
      formData.profilePicture = await imageOptimizer(
        formData.profilePicture,
        500,
        500,
        0.25,
        "image/webp",
      );
    }
    const result = await axiosPrivate.patch<IDefaultResponse<IProfile>>("/profiles", {
      ...formData,
      id: profile.id,
    });
    if (result.data.success && result.data.data) {
      const profileData = result.data.data;
      dispatch(updateProfileAction(result.data.data));
      dispatch(addPopupAction({ type: "info", message: "Profile details saved!" }));
      resetForm(profileData);
    }
  };

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const shouldShowInputLabels = useIsWindowSizeLowerThan({ size: 768 });

  const handleRemoveImage = async () => {
    setIsRemoveProfilePictureLoading(true);
    try {
      const result = await axiosPrivate.patch<IDefaultResponse<null>>(
        "/profiles/" + profile.id + "/remove-profile-picture",
      );
      if (result.data.success) {
        dispatch(removeProfilePictureAction());
        resetForm({ ...profile, profilePicture: "" });
      }
    } catch (error) {
      dispatch(
        addPopupAction({
          type: "error",
          message:
            "Something went wrong while trying to remove profile picture. Please try again later.",
        }),
      );
    } finally {
      setIsRemoveProfilePictureLoading(false);
    }
  };

  return {
    updateProfileDetails,
    handleChooseImage,
    shouldShowInputLabels,
    handleRemoveImage,
    fileInputRef,
    isRemoveProfilePictureLoading,
  };
};

export default useProfileDetailsPage;
