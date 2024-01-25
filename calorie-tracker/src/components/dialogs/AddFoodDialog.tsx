import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FoodForm } from "@/forms/FoodForm";

interface AddFoodDialogProps {
 isOpen: boolean;
 onClose: () => void;
 onSubmit: (values: { carbohydrates: number; foodName: string; calories: number; protein: number; fats: number; }) => void;
}

const AddFoodDialog: React.FC<AddFoodDialogProps> = ({ isOpen, onClose, onSubmit }) => {
 return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Food Item</DialogTitle>
          <DialogDescription>
            Please fill out the form below to add a new food item. Press Save when you're done.
          </DialogDescription>
        </DialogHeader>
        <FoodForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
 );
};

export default AddFoodDialog;