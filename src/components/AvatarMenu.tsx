import React, { useState } from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

const AvatarMenu: React.FC = () => {
  const { data } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleSignOut = () => {
    // サインアウトの処理を実行する
    signOut();
  };

  return (
    <Menu onClose={() => setIsMenuOpen(false)}>
      <MenuButton as={Button} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Flex alignItems="center">
          <Avatar size="sm" src={data?.user?.image || ""} />
          <Text ml={2}>{data?.user?.name}</Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarMenu;
