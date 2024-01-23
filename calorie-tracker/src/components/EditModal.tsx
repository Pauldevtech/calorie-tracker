import React from "react";
import { useUpdateFood } from "@/hooks/apiHooks";
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

interface EditModalProps {
 food: Food;
 onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ food, onClose }) => {
 const mutation = useUpdateFood();
 const form = useForm<z.infer<typeof formSchema>>({
 defaultValues: food,
 resolver: zodResolver(formSchema),
 });

 const onSubmit = (values: z.infer<typeof formSchema>) => {
 mutation.mutate({ id: food.id, updatedFood: values });
 onClose();
 };

 return (
 <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
             Edit Food Item
            </h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <CustomFormField label="Food Name" placeholder="Apple" name="foodName" control={form.control} />
             <CustomFormField label="Calories" placeholder="0" name="calories" control={form.control} />
             <CustomFormField label="Protein" placeholder="0" name="protein" control={form.control} />
             <CustomFormField label="Carbohydrates" placeholder="0" name="carbohydrates" control={form.control} />
             <CustomFormField label="Fats" placeholder="0" name="fats" control={form.control} />
             <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
 </div>
 );
};

export default EditModal;
