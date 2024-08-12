"use client";

import { useSession } from "next-auth/react";
import { logout } from "@/actions/logout";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };

  useEffect(() => {}, []);

  return (
    <div className="bg-white p-10 rounded-xl">
      <button type="submit" onClick={onClick}>
        Sign Out
      </button>
    </div>
  );
};

export default SettingsPage;
