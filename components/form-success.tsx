import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center space-x-2 text-emerald-600">
      <CheckCircledIcon className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};
