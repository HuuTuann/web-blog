import { Button, View } from "@/components";
import { useDialog } from "@/hooks";
import { useGetUserProfile } from "@/queries";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import { Settings, UserRound } from "lucide-react";
import ProfileForm from "./ProfileForm";

const UserProfile = () => {
  const { showDialog } = useDialog();
  const { userProfile } = useGetUserProfile();
  const { fullName, email, role, isActive } = userProfile || {};

  const handleSettingProfile = () => {
    showDialog({
      title: "Settings",
      content: <ProfileForm />,
      options: {
        hideActions: true,
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
        <DropdownSection showDivider title="User Profile">
          <DropdownItem key="fullName">
            <View label="Full Name" value={fullName} />
          </DropdownItem>
          <DropdownItem key="email">
            <View label="Email" value={email} />
          </DropdownItem>
          <DropdownItem key="role">
            <View label="Role" value={role} />
          </DropdownItem>
          <DropdownItem key="isActive">
            <View label="Status" value={isActive ? "Active" : "Inactive"} />
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

export default UserProfile;
