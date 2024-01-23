import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/forms/CustomFormField";

const formSchema = z.object({
 foodName: z.string(),
 calories: z.coerce.number(),
 protein: z.coerce.number(),
 carbohydrates: z.coerce.number(),
 fats: z.coerce.number(),
});

interface FoodFormProps {
 onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export const FoodForm: React.FC<FoodFormProps> = ({ onSubmit }) => {
 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: "",
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fats: 0,
    },
 });

 return (
    <Form {...form}>  
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-base">
        <CustomFormField
          label="Food Name"
          placeholder="Apple"
          name="foodName"
          control={form.control}
        />
        <CustomFormField
          label="Calories"
          placeholder="0"
          name="calories"
          control={form.control}
        />
        <CustomFormField
          label="Protein"
          placeholder="0"
          name="protein"
          control={form.control}
        />
        <CustomFormField
          label="Carbohydrates"
          placeholder="0"
          name="carbohydrates"
          control={form.control}
        />
        <CustomFormField
          label="Fats"
          placeholder="0"
          name="fats"
          control={form.control}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
 );
};