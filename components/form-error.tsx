import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProms {
  message?: string;
}

export const FormError = ({ message }: FormErrorProms) => {
  if (!message) return null;

  return (
    <div className="flex items-center space-x-2 text-destructive">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};
