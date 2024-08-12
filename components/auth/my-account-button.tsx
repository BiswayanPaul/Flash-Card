"use client";

import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const MyAccountButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/myaccounts");
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
