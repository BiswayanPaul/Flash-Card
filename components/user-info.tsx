import { ExtendedUser } from "@/next-env";
import { Card, CardHeader } from "./ui/card";
import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = async ({ user, label }: UserInfoProps) => {
  return (
    <Card>
      <CardHeader className="w-[600px] shadow-md">
        <p className="text-2xl font-semibold text-center">{label}</p>
        <p className="text-2xl font-semibold text-center">{user.id}</p>
      </CardHeader>
    </Card>
  );
};
