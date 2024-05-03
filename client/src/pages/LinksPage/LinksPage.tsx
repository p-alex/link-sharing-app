import { Suspense, lazy } from "react";
import Layout from "../../layout";
import ProfilePreview from "../../components/ProfilePreview";
import useFetchLinksOnce from "../../hooks/useFetchLinksOnce";
import EditorNavbar from "../../components/NavBar/EditorNavbar";

const LinkCustomizer = lazy(() => import("../../components/LinkCustomizer"));

const LinksPage = () => {
  useFetchLinksOnce();
  return (
    <Layout navbar={<EditorNavbar />}>
      <div className="flex gap-6">
        <ProfilePreview />
        <Suspense>
          <LinkCustomizer />
        </Suspense>
      </div>
    </Layout>
  );
};

export default LinksPage;
