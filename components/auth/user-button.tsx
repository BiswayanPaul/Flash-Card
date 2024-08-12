"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";
import { MyAccountButton } from "./my-account-button";
import { SettingsButton } from "./settings-button";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
        <MyAccountButton>
          <DropdownMenuItem className="cursor-pointer">
            <FaUser className="h-4 w-4 mr-2" />
            My Account
          </DropdownMenuItem>
        </MyAccountButton>
        <SettingsButton>
          <DropdownMenuItem className="cursor-pointer">
            <FaUser className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </SettingsButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
