import { Suspense, lazy } from "react";
import Layout from "../../layout";
import ProfilePreview from "../../components/ProfilePreview";

const LinkCustomizer = lazy(() => import("../../components/LinkCustomizer"));

const LinksPage = () => {
  return (
    <Layout>
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
