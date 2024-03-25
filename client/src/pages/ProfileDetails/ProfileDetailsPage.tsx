import Button from "../../components/Button";
import InputGroup from "../../components/InputGroup";
import Section from "../../components/Section";
import Layout from "../../layout";
import useFormV2 from "../../hooks/useFormV2";
import {
  UpdateProfileDetailsInputType,
  updateProfileDetailsSchema,
} from "./ProfileDetailsPage.schema";
import useProfileDetailsPage from "./useProfileDetailsPage";
import { useProfileSlice } from "../../redux/features/profile/profileSlice";

const ProfileDetails = () => {
  const profile = useProfileSlice();

  const { registerInput, registerSingleFileInput, formState, handleSubmit, resetForm } = useFormV2<
    UpdateProfileDetailsInputType,
    typeof updateProfileDetailsSchema
  >(profile, updateProfileDetailsSchema);

  const {
    handleChooseImage,
    handleRemoveImage,
    shouldShowInputLabels,
    updateProfileDetails,
    fileInputRef,
    isRemoveProfilePictureLoading,
  } = useProfileDetailsPage({ resetForm });

  return (
    <Layout>
      <Section
        title="Profile Details"
        description="Add your details to create a personal touch to your profile."
      >
        <form onSubmit={(event) => handleSubmit(event, updateProfileDetails)}>
          <div className="flex flex-col gap-6">
            <div className="flex w-full items-center gap-4 bg-lightGray p-[20px] max-[800px]:flex-col max-[800px]:items-start">
              <label className="w-[240px] shrink-0 text-mediumGrey max-[800px]:w-auto">
                Profile Picture
              </label>
              <div className="flex items-center gap-6 max-[800px]:flex-col max-[800px]:items-start">
                <div className="relative h-[192px] w-[192px] shrink-0 overflow-hidden rounded-lg bg-black">
                  <img
                    src={
                      formState.formData.profilePicture
                        ? formState.formData.profilePicture
                        : profile.profilePicture
                          ? profile.profilePicture
                          : "./images/blank-profile-picture.webp"
                    }
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg, image/png"
                  {...registerSingleFileInput("profilePicture")}
                />
                <div className="flex flex-col gap-4">
                  <Button type="button" variant="outline" onClick={handleChooseImage}>
                    Change
                  </Button>
                  {profile.profilePicture && (
                    <Button
                      type="button"
                      variant="error"
                      onClick={handleRemoveImage}
                      disabled={isRemoveProfilePictureLoading}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-4 bg-lightGray p-[20px]">
              <div className="flex w-full items-center gap-4">
                {!shouldShowInputLabels && (
                  <label
                    className="hidden w-[240px] shrink-0 text-mediumGrey md:block"
                    htmlFor="firstName"
                  >
                    First name*
                  </label>
                )}
                <InputGroup
                  label={
                    shouldShowInputLabels && (
                      <InputGroup.InputLabel htmlFor="firstName">First name</InputGroup.InputLabel>
                    )
                  }
                  input={
                    <InputGroup.Input
                      {...registerInput("firstName")}
                      type="text"
                      placeholder="e.g. John"
                    />
                  }
                  error={
                    formState.fieldErrors?.firstName ? (
                      <InputGroup.InputError>
                        {formState.fieldErrors?.firstName}
                      </InputGroup.InputError>
                    ) : null
                  }
                />
              </div>
              <div className="flex w-full items-center gap-4">
                {!shouldShowInputLabels && (
                  <label
                    className="hidden w-[240px] shrink-0 text-mediumGrey md:block"
                    htmlFor="lastName"
                  >
                    Last name*
                  </label>
                )}
                <InputGroup
                  label={
                    shouldShowInputLabels && (
                      <InputGroup.InputLabel htmlFor="lastName">Last name</InputGroup.InputLabel>
                    )
                  }
                  input={
                    <InputGroup.Input
                      {...registerInput("lastName")}
                      type="text"
                      placeholder="e.g. Appleseed"
                    />
                  }
                  error={
                    formState.fieldErrors?.lastName ? (
                      <InputGroup.InputError>
                        {formState.fieldErrors?.lastName}
                      </InputGroup.InputError>
                    ) : null
                  }
                />
              </div>
              <div className="flex w-full items-center gap-4">
                {!shouldShowInputLabels && (
                  <label
                    className="hidden w-[240px] shrink-0 text-mediumGrey md:block"
                    htmlFor="publicEmail"
                  >
                    Public email
                  </label>
                )}
                <InputGroup
                  label={
                    shouldShowInputLabels && (
                      <InputGroup.InputLabel htmlFor="publicEmail">
                        Public email
                      </InputGroup.InputLabel>
                    )
                  }
                  input={
                    <InputGroup.Input
                      {...registerInput("publicEmail")}
                      type="email"
                      placeholder="e.g. email@example.com"
                    />
                  }
                  error={
                    formState.fieldErrors?.publicEmail ? (
                      <InputGroup.InputError>
                        {formState.fieldErrors?.publicEmail}
                      </InputGroup.InputError>
                    ) : null
                  }
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end border-t border-gray-200 pt-6">
              <Button
                variant="fill"
                type="submit"
                disabled={!formState.isValid || formState.isLoading || !formState.isChanged}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Section>
    </Layout>
  );
};

export default ProfileDetails;
