"use client";

import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const SettingsButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/settings");
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
