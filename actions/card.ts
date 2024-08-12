import { CardInputSchema } from "@/schemas";
import * as z from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export const cardInput = async (values: z.infer<typeof CardInputSchema>) => {
  const validatedFields = CardInputSchema.safeParse(values);
  const user = await currentUser();
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { title, definition } = validatedFields.data;

  const existingUser = await getUserById(user?.id);

  if (!existingUser) {
    return { error: "User not found" };
  }

  const newCard = await db.card.create({
    data: {
      userId: existingUser.id,
      title,
      definition,
    },
  });

  return { success: "New Card Created successfully" };
};
