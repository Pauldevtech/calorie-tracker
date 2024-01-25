import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Food } from "@/types/interfaces";
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

interface EditFoodDialogProps {
isOpen: boolean;
onClose: () => void;
currentFood: Food | null;
setCurrentFood: React.Dispatch<React.SetStateAction<Food | null>>;
onUpdate: (e: React.FormEvent) => void;
}

const EditFoodDialog: React.FC<EditFoodDialogProps> = ({ isOpen, onClose, currentFood, setCurrentFood, onUpdate }) => {
return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Food Item</DialogTitle>
          <DialogDescription>
            Make changes to the food item here. Click Save when you're done.
          </DialogDescription>
        </DialogHeader>
        {currentFood && (
          <form onSubmit={onUpdate}>
            <Label htmlFor="foodName">Food Name</Label>
            <Input id="foodName" defaultValue={currentFood.foodName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentFood({ ...currentFood, foodName: e.target.value })} />
            <Label htmlFor="calories">Calories</Label>
            <Input id="calories" defaultValue={currentFood.calories} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentFood({ ...currentFood, calories: Number(e.target.value) })} />
            <Label htmlFor="protein">Protein</Label>
            <Input id="protein" defaultValue={currentFood.protein} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentFood({ ...currentFood, protein: Number(e.target.value) })} />
            <Label htmlFor="carbohydrates">Carbohydrates</Label>
            <Input id="carbohydrates" defaultValue={currentFood.carbohydrates} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentFood({ ...currentFood, carbohydrates: Number(e.target.value) })} />
            <Label htmlFor="fats">Fats</Label>
            <Input id="fats" defaultValue={currentFood.fats} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentFood({ ...currentFood, fats: Number(e.target.value) })} />
          </form>
        )}
        <DialogFooter>
        <Button
  type="submit"
  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
    onUpdate(e);
    onClose();
  }}
>
  Save
</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditFoodDialog;