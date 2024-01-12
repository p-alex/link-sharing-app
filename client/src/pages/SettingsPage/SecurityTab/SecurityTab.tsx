import Section from "../../../components/Section";
import ChangePasswordBox from "./Boxes/ChangePasswordBox/ChangePasswordBox";

const SecurityTab = () => {
  return (
    <Section
      title="Security"
      description="For your security, choose a unique password that you don't use for any other online account."
    >
      <ChangePasswordBox />
    </Section>
  );
};

export default SecurityTab;
