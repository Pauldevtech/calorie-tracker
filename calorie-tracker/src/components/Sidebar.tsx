import React, { useState } from "react";
import { useAddFood } from "@/hooks/apiHooks";
import { formSchema } from "@/schemas/foodFormSchema";
import { z } from "zod";
import { FoodForm } from "@/forms/FoodForm";

const Sidebar: React.FC = () => {
 const mutation = useAddFood();
 const [error, setError] = useState<string | null>(null);

 function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values, {
      onError: (error) => {
        console.error('Failed to add food item', error);
        setError('Failed to add food item');
      },
    });
 }

 return (
    <aside className="w-full min-w-64 max-w-64 bg-gray-200 p-4 space-y-4 sm:space-y-0 sm:flex sm:flex-col">
      <h2 className="mb-4 text-base font-semibold mt-2">Add a New Food Item</h2>
      {error && <p>{error}</p>}
      <FoodForm onSubmit={onSubmit} />
    </aside>
 );
};

export default Sidebar;