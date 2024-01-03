import { Suspense, lazy } from "react";
import Layout from "../../layout";

const LinkCustomizer = lazy(() => import("../../components/LinkCustomizer"));

const LinksPage = () => {
  return (
    <Layout>
      <Suspense>
        <LinkCustomizer />
      </Suspense>
    </Layout>
  );
};

export default LinksPage;
