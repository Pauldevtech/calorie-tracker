import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
 foodName: z.string(),
 calories: z.coerce.number(),
 protein: z.coerce.number(),
 carbohydrates: z.coerce.number(),
 fats: z.coerce.number(),
});

type FieldNames = "foodName" | "calories" | "protein" | "carbohydrates" | "fats";

interface FormFieldProps {
    label: string;
    placeholder: string;
    name: FieldNames;
    control: Control<z.infer<typeof formSchema>>;
   }

const CustomFormField: React.FC<FormFieldProps> = ({ label, placeholder, name, control }) => {
 return (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className='text-base'>{label}</FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            type="text"
            onFocus={(e) => (e.target.value = "")}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
 );
};

export default CustomFormField;
