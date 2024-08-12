"use client";

import { CardWrapper } from "./Card-Wrapper";
import { FormError } from "../form-error";

import { FadeLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {

    if(success || error){
      return;
    }

    if (!token) {
      setError("missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something Went Wrong!!");
      });
  }, [token,success,error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming Your verificaiton"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && <FadeLoader />}
        <FormSuccess message={success} />
        {!success && (<FormError message={error} />)}
        
      </div>
    </CardWrapper>
  );
};
