import Section from "../../../components/Section";
import AccountInformationBox from "./Boxes/AccountInformationBox";
import DeleteAccountBox from "./Boxes/DeleteAccountBox";

const AccountTab = () => {
  return (
    <Section title="Account" description="Manage your account’s details.">
      <AccountInformationBox />
      <DeleteAccountBox />
    </Section>
  );
};

export default AccountTab;
