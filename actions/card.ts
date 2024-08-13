"use server";


import { CardInputSchema } from "@/schemas";
import * as z from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { useCurrentUser } from "@/hooks/use-current-user";

const getId = async () => {
  const user = await currentUser();
  return user?.id;
};

export const cardInput = async (values: z.infer<typeof CardInputSchema>) => {
  const validatedFields = CardInputSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { title, definition, userId } = validatedFields.data;
  console.log(userId);
  const existingUser = await getUserById(userId);
  console.log(existingUser);

  if (!existingUser) {
    return { error: "User not found" };
  }

  await db.card.create({
    data: {
      userId,
      title,
      definition,
    },
  });

  return { success: "New Card Created successfully" };
};

export const getAllCards = async (userId: string) => {
  const existingUser = await getUserById(userId);

  if (!existingUser) {
    return { error: "User not found" };
  }

  const allCards = await db.card.findMany();

  return allCards;
};

export const getCardsByUserId = async (userId: string) => {
  const user = await currentUser();

  const existingUser = await getUserById(user?.id);

  if (!existingUser) {
    return { error: "User not found" };
  }

  const cardsOfUser = await db.card.findMany({
    where: { userId },
  });

  return cardsOfUser;
};
