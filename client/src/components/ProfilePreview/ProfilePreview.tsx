import { useLinksSlice } from "../../redux/features/links/linksSlice";
import { useProfileSlice } from "../../redux/features/profile/profileSlice";
import LinkButton from "../LinkCustomizer/LinkButton";

function ProfilePreview() {
  const { profilePicture, firstName, lastName, publicEmail } = useProfileSlice();
  const { links } = useLinksSlice();

  const fullName = firstName && lastName ? firstName + " " + lastName : "";

  return (
    <div className="sticky top-6 h-full w-[550px] flex-shrink-0 rounded-lg bg-white px-[125px] py-[100px] max-[1200px]:hidden">
      <img src="./images/illustration-phone-mockup.svg" />

      <div className="absolute left-0 right-0 top-[160px] mx-auto flex w-max min-w-[200px] flex-col items-center text-center">
        <div className="h-[100px] w-[100px] rounded-full border">
          <img
            src={profilePicture ? profilePicture : "./images/blank-profile-picture.webp"}
            width={100}
            height={100}
            className="h-full w-full rounded-[inherit] object-cover"
          />
        </div>

        <div className="mt-4 h-[50px]">
          {fullName.length > 0 && (
            <p className="min-w-[160px] bg-white text-lg font-semibold text-black">{fullName}</p>
          )}
          {publicEmail && <p className="bg-white text-sm">{publicEmail}</p>}
        </div>

        {links.length > 0 && (
          <div className="mt-[45px] flex flex-col gap-5 bg-white">
            {links.map((link, index) => {
              if (index <= 4) return <LinkButton key={"preview-link-" + link.id} link={link} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePreview;
