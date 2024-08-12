import { CardWrapper } from "./Card-Wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops!! Something Went Wrong!!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="w-full flex justify-center items-center text-center">
        <ExclamationTriangleIcon className="text-destructive size-9" />
      </div>
    </CardWrapper>
  );
};
