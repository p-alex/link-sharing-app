import Section from "../../../../components/Section";
import ChangePasswordBox from "./Boxes/ChangePasswordBox/ChangePasswordBox";
import SignOutEverywhereBox from "./Boxes/SignOutEverywhere";

const SecurityTab = () => {
  return (
    <Section title="Security" className="gap-24">
      <ChangePasswordBox />
      <SignOutEverywhereBox />
    </Section>
  );
};

export default SecurityTab;
