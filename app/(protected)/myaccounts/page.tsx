"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const MyAccounts = () => {
  const user = useCurrentUser();
  const onClick = () => {
    console.log(user);
  };

  return (
    <div className="flex bg-white p-[4vh] h-full w-full justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-between rounded-lg border-2 border-black ">
          <div className="p-[3vh] bg-slate-300 rounded-l-lg border-r-2 border-black ">
            <p className="p-1">ID</p>
            <p className="p-1">Name</p>
            <p className="p-1">Email</p>
          </div>

          <div className="p-[3vh] bg-slate-400 rounded-r-lg">
            <p className="p-1">{user?.id}</p>
            <p className="p-1">{user?.name}</p>
            <p className="p-1">{user?.email}</p>
          </div>
        </div>
        <div className="flex p-[3vh] w-[20vh]">
          <Button onClick={onClick} className="w-full">
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyAccounts;
