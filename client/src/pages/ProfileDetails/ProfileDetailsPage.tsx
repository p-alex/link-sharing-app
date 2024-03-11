import Button from "../../components/Button";
import InputGroup from "../../components/InputGroup";
import Section from "../../components/Section";
import useForm from "../../hooks/useForm";
import Layout from "../../layout";
import { ProfileDetailsType, profileDetailsSchema } from "../../schemas/user.schema";

const ProfileDetails = () => {
  const { register, handleSubmit, formState } = useForm({
    payload: { firstName: "", lastName: "", publicEmail: "" },
    zodSchema: profileDetailsSchema,
  });

  const submit = async (data: ProfileDetailsType) => {
    if (!formState.isValid) return;
  };

  return (
    <Layout>
      <Section
        title="Profile Details"
        description="Add your details to create a personal touch to your profile."
      >
        <div className="flex w-full items-center gap-4 bg-lightGray p-[20px] max-[800px]:flex-col max-[800px]:items-start">
          <label className="w-[240px] shrink-0 text-mediumGrey max-[800px]:w-auto">
            Profile Picture
          </label>
          <div className="flex items-center gap-6 max-[800px]:flex-col">
            <div className="relative h-[192px] w-[192px] shrink-0 overflow-hidden rounded-lg bg-lightPurple">
              <button className="absolute left-0 top-0 h-full w-full font-semibold text-primary">
                Upload Image
              </button>
            </div>
            <input type="file" className="hidden" />
            <p className="max-w-[215px] text-xs text-mediumGrey">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
        </div>
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={(event) => handleSubmit(event, submit)}
        >
          <div className="flex w-full flex-col items-center gap-4 bg-lightGray p-[20px]">
            <div className="flex w-full items-center gap-4">
              <label className="w-[240px] shrink-0 text-mediumGrey" htmlFor="firstName">
                First name*
              </label>
              <InputGroup
                input={
                  <InputGroup.Input
                    {...register("firstName")}
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
              <label className="w-[240px] shrink-0 text-mediumGrey" htmlFor="lastName">
                Last name*
              </label>
              <InputGroup
                input={
                  <InputGroup.Input
                    {...register("lastName")}
                    type="text"
                    placeholder="e.g. Appleseed"
                  />
                }
                error={
                  formState.fieldErrors?.lastName ? (
                    <InputGroup.InputError>{formState.fieldErrors?.lastName}</InputGroup.InputError>
                  ) : null
                }
              />
            </div>
            <div className="flex w-full items-center gap-4">
              <label className="w-[240px] shrink-0 text-mediumGrey" htmlFor="publicEmail">
                Public email
              </label>
              <InputGroup
                input={
                  <InputGroup.Input
                    {...register("publicEmail")}
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
              disabled={!formState.isValid || formState.isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </Section>
    </Layout>
  );
};

export default ProfileDetails;
