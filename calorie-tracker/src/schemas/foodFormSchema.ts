import * as z from "zod";

export const formSchema = z.object({
 foodName: z.string(),
 calories: z.coerce.number(),
 protein: z.coerce.number(),
 carbohydrates: z.coerce.number(),
 fats: z.coerce.number(),
});