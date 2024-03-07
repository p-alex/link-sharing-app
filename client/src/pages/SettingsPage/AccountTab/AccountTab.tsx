import Section from "../../../components/Section";
import ChangeEmailBox from "./Boxes/AccountInformationBox";
import DeleteAccountBox from "./Boxes/DeleteAccountBox";

const AccountTab = () => {
  return (
    <Section title="Account" description="Manage your account’s details.">
      <ChangeEmailBox />
      <DeleteAccountBox />
    </Section>
  );
};

export default AccountTab;
