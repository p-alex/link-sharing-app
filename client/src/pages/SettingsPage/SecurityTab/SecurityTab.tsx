import Section from "../../../components/Section";
import ChangePasswordBox from "./Boxes/ChangePasswordBox/ChangePasswordBox";

const SecurityTab = () => {
  return (
    <Section title="Security" className="gap-24">
      <ChangePasswordBox />
    </Section>
  );
};

export default SecurityTab;
