"use client";
import { cardInput } from "@/actions/card";
import { CardWrapper } from "@/components/auth/Card-Wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CardInputSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

const CardPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const user = useCurrentUser();

  const forme = useForm<z.infer<typeof CardInputSchema>>({
    resolver: zodResolver(CardInputSchema),
    defaultValues: {
      title: "",
      definition: "",
      userId: user?.id,
    },
  });

  const onSubmit = (values: z.infer<typeof CardInputSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      cardInput(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          setTimeout(() => {
            router.push("/cards");
          }, 2000);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create a new Card"
      backButtonLabel="Go to Cards"
      backButtonHref="/cards"
    >
      <FormProvider {...forme}>
        <form onSubmit={forme.handleSubmit(onSubmit)}>
          <div className="py-[1vh]">
            <FormField
              control={forme.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter card title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="py-[1vh]">
            <FormField
              control={forme.control}
              name="definition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Definition</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter card definition"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          {/* You can add more fields here similarly */}
          <div className="flex items-center justify-center pt-[1vh]">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Card"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </CardWrapper>
  );
};

export default CardPage;
