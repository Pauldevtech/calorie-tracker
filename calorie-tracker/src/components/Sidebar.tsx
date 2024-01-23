import React from "react";
import { useAddFood } from "@/hooks/apiHooks";
import * as z from "zod";
import { FoodForm } from "@/forms/FoodForm";

const formSchema = z.object({
 foodName: z.string(),
 calories: z.coerce.number(),
 protein: z.coerce.number(),
 carbohydrates: z.coerce.number(),
 fats: z.coerce.number(),
});

const Sidebar: React.FC = () => {
 const mutation = useAddFood();

 function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
 }

 return (
    <aside className="w-full min-w-64 max-w-64 bg-gray-200 p-4 space-y-4 sm:space-y-0 sm:flex sm:flex-col hidden">
      <h2 className="mb-4 text-base font-semibold mt-2">Add a New Food Item</h2>
      <FoodForm onSubmit={onSubmit} />
    </aside>
 );
};

export default Sidebar;