import { Button, View } from "@/components";
import { useDialog } from "@/hooks";
import { useGetBusinessProfile } from "@/queries";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import { Settings, UserRound } from "lucide-react";
import BusinessProfileForm from "./ProfileForm";

const BusinessProfile = () => {
  const { showDialog } = useDialog();
  const { businessProfile } = useGetBusinessProfile();

  const {
    businessName,
    businessSlogan,
    businessSize,
    nationality,
    industryDes,
    address,
    website,
    contact,
  } = businessProfile || {};

  const handleSettingProfile = () => {
    showDialog({
      title: "Settings",
      content: <BusinessProfileForm />,
      options: {
        hideActions: true,
        size: "5xl",
      },
    });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="ioLight" isIconOnly>
          <UserRound />
        </Button>
      </DropdownTrigger>
      <DropdownMenu className="w-64">
        <DropdownSection showDivider title="Business Profile">
          <DropdownItem key="businessName">
            <View label="Name" value={businessName} />
          </DropdownItem>
          <DropdownItem key="businessSlogan">
            <View label="Slogan" value={businessSlogan} />
          </DropdownItem>
          <DropdownItem key="businessSize">
            <View label="Size" value={businessSize} />
          </DropdownItem>
          <DropdownItem key="nationality">
            <View label="Nationality" value={nationality} />
          </DropdownItem>
          <DropdownItem key="industryDes">
            <View label="Industry" value={industryDes} />
          </DropdownItem>
          <DropdownItem key="address">
            <View label="Address" value={address} />
          </DropdownItem>
          <DropdownItem key="website">
            <View label="Website" value={website} />
          </DropdownItem>
          <DropdownItem key="contact">
            <View label="Contact" value={contact} />
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="profile"
            startContent={<Settings size={20} />}
            onPress={handleSettingProfile}
          >
            Setting
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default BusinessProfile;
