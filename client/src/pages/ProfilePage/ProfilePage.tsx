import { useParams } from "react-router-dom";
import LinkButton from "../../components/LinkCustomizer/LinkButton";
import UserProfileNavbar from "../../components/NavBar/UserProfileNavbar";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useFetchLinksOnce from "../../hooks/useFetchLinksOnce";
import Layout from "../../layout";
import { useLinksSlice } from "../../redux/features/links/linksSlice";
import { IProfile, useProfileSlice } from "../../redux/features/profile/profileSlice";
import { useEffect, useState } from "react";
import { IDefaultResponse } from "../../apiRequests";
import { LinkType } from "../../schemas/link.schema";
import { useDispatch } from "react-redux";
import { addPopupAction } from "../../redux/features/globalPopupsSlice/globalPopupsSlice";
import { AxiosError } from "axios";

function ProfilePage() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const { isFetchLinksOnceLoading } = useFetchLinksOnce();

  const { isAuth, authState } = useAuth();

  const currentProfile = useProfileSlice();

  const currentLinks = useLinksSlice();

  const [userProfile, setUserProfile] = useState<IProfile | null>(null);

  const [userLinks, setUserLinks] = useState<LinkType[] | null>(null);

  const fullName =
    userProfile?.firstName && userProfile.lastName
      ? userProfile?.firstName + " " + userProfile?.lastName
      : null;

  const axiosPrivate = useAxiosPrivate();

  const handleGetUserProfile = async () => {
    const requestResponse = await axiosPrivate.get<IDefaultResponse<IProfile>>(
      "/profiles/" + params.userId,
    );

    const result = requestResponse.data;

    return result;
  };

  const handleGetUserLinks = async () => {
    const requestResponse = await axiosPrivate.get<IDefaultResponse<{ links: LinkType[] }>>(
      "/links/user/" + params.userId,
    );

    const result = requestResponse.data;

    return result;
  };

  const handleSetProfileData = async () => {
    try {
      const profile = await handleGetUserProfile();

      if (profile.success && profile.data) setUserProfile(profile.data);

      const links = await handleGetUserLinks();

      if (links.success && links.data)
        setUserLinks(links.data.links.sort((a, b) => a.index - b.index));
    } catch (error) {
      if (error instanceof AxiosError)
        dispatch(addPopupAction({ type: "error", message: error.response?.data.errors[0] }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth && authState.id === params.userId) {
      setUserProfile(currentProfile);
      setUserLinks(currentLinks.links);
      setIsLoading(false);
      return;
    }
    if (!isFetchLinksOnceLoading) handleSetProfileData();
  }, [isFetchLinksOnceLoading, currentLinks, params.userId]);

  return (
    <Layout navbar={<UserProfileNavbar />}>
      <div className="absolute left-0 top-0 z-0 h-[357px] w-full rounded-bl-[32px] rounded-br-[32px] bg-primary"></div>
      {!isLoading && (
        <div className="userProfileContainerAnimation relative mx-auto mt-[120px] flex w-full max-w-[349px] flex-col gap-14 rounded-3xl bg-white px-14 py-12 shadow-xl">
          <div className="flex flex-col gap-6">
            <img
              src={
                userProfile?.profilePicture
                  ? userProfile?.profilePicture
                  : "/images/blank-profile-picture.webp"
              }
              width={104}
              height={104}
              className="mx-auto rounded-full"
            />
            <div className="flex flex-col gap-2">
              {fullName && <h1 className="text-center text-2xl font-bold">{fullName}</h1>}
              {userProfile?.publicEmail && <p className="text-center">{userProfile.publicEmail}</p>}
            </div>
          </div>
          <ul className="flex flex-col gap-5">
            {userLinks !== null &&
              userLinks.length > 0 &&
              userLinks.map((link) => {
                if (link.link) return <LinkButton key={"userProfileLink-" + link.id} link={link} />;
              })}
          </ul>
        </div>
      )}
    </Layout>
  );
}

export default ProfilePage;
