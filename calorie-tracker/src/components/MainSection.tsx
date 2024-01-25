import React, { useState } from "react";
import { useGetFoods, useDeleteFood, useUpdateFood } from "@/hooks/apiHooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FoodForm } from "@/forms/FoodForm";
import { useAddFood } from "@/hooks/apiHooks";
import { Food } from "@/types/interfaces";
import FoodTable from "./FoodTable";

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const MainSection: React.FC = () => {
  const { data, isLoading, error } = useGetFoods();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentFood, setCurrentFood] = useState<Food | null>(null);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [touchTimeoutId, setTouchTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );
  const addFoodMutation = useAddFood();

  const [isEnterFoodDialogOpen, setIsEnterFoodDialogOpen] = useState(false);

  const deleteMutation = useDeleteFood();
  const updateMutation = useUpdateFood();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage = (error as unknown as { message: string }).message;
    return <div>An error occurred: {errorMessage}</div>;
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (food: Food) => {
    setCurrentFood(food);
    setIsDialogOpen(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentFood && currentFood.id) {
      updateMutation.mutate({
        id: currentFood.id,
        updatedFood: currentFood,
      });
    }
    setIsDialogOpen(false);
  };

  const handleRowTouchStart = (food: Food) => {
    setTouchTimeoutId(
      setTimeout(() => {
        setCurrentFood(food);
        setIsActionDialogOpen(true);
      }, 200)
    ); // 1000ms = 1s
  };

  const handleRowTouchEnd = () => {
    if (touchTimeoutId !== null) {
      clearTimeout(touchTimeoutId);
      setTouchTimeoutId(null);
    }
  };

  const handleEnterFoodDialogOpen = () => {
    setIsEnterFoodDialogOpen(true);
  };

  const handleEnterFoodDialogClose = () => {
    setIsEnterFoodDialogOpen(false);
  };

  const handleCreateFood = (values: {
    carbohydrates: number;
    foodName: string;
    calories: number;
    protein: number;
    fats: number;
  }) => {
    addFoodMutation.mutate(values);
    handleEnterFoodDialogClose(); // Close the dialog after submitting the form
  };

  const totalCalories = data
    ? data.reduce((sum, food) => sum + food.calories, 0)
    : 0;

  const totalProtein = data
    ? data.reduce((sum, food) => sum + food.protein, 0)
    : 0;

  const totalCarbohydrates = data
    ? data.reduce((sum, food) => sum + food.carbohydrates, 0)
    : 0;

  const totalFats = data ? data.reduce((sum, food) => sum + food.fats, 0) : 0;

  return (
    <main className="flex-1 p-2 ml-3 bg-white">
      {data && (
        <FoodTable
          data={data}
          totalProtein={totalProtein}
          totalCarbohydrates={totalCarbohydrates}
          totalFats={totalFats}
          totalCalories={totalCalories}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleRowTouchStart={handleRowTouchStart}
          handleRowTouchEnd={handleRowTouchEnd}
          toTitleCase={toTitleCase}
        />
      )}

      <Button
        className="mt-4 xs:hidden sm:hidden md:hidden bg-orange-400"
        onTouchStart={handleEnterFoodDialogOpen}
      >
        Enter Food
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Food Item</DialogTitle>
            <DialogDescription>
              Make changes to the food item here. Click Save when you're done.
            </DialogDescription>
          </DialogHeader>
          {currentFood && (
            <form onSubmit={handleUpdate}>
              <Label htmlFor="foodName">Food Name</Label>
              <Input
                id="foodName"
                defaultValue={currentFood.foodName}
                onChange={(e) =>
                  setCurrentFood({ ...currentFood, foodName: e.target.value })
                }
              />
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                defaultValue={currentFood.calories}
                onChange={(e) =>
                  setCurrentFood({
                    ...currentFood,
                    calories: Number(e.target.value),
                  })
                }
              />
              <Label htmlFor="protein">Protein</Label>
              <Input
                id="protein"
                defaultValue={currentFood.protein}
                onChange={(e) =>
                  setCurrentFood({
                    ...currentFood,
                    protein: Number(e.target.value),
                  })
                }
              />
              <Label htmlFor="carbohydrates">Carbohydrates</Label>
              <Input
                id="carbohydrates"
                defaultValue={currentFood.carbohydrates}
                onChange={(e) =>
                  setCurrentFood({
                    ...currentFood,
                    carbohydrates: Number(e.target.value),
                  })
                }
              />
              <Label htmlFor="fats">Fats</Label>
              <Input
                id="fats"
                defaultValue={currentFood.fats}
                onChange={(e) =>
                  setCurrentFood({
                    ...currentFood,
                    fats: Number(e.target.value),
                  })
                }
              />
            </form>
          )}
          <DialogFooter>
            <Button
              type="submit"
              onClick={(e) => {
                handleUpdate(e);
                setIsActionDialogOpen(false);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent className="w-48 flex flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>Actions</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="bg-red-500 text-sm h-8 sm:inline-block w-24"
              onClick={() => {
                handleDelete(currentFood?.id || "");
                setIsActionDialogOpen(false);
              }}
            >
              Delete
            </Button>
            <Button
              className="bg-blue-500 text-sm h-8 sm:inline-block w-24 mb-2"
              onClick={() => currentFood && handleEdit(currentFood)}
            >
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isEnterFoodDialogOpen}
        onOpenChange={setIsEnterFoodDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Food Item</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Please fill out the form below to add a new food item. Press Save
            when you're done.
          </DialogDescription>
          <FoodForm onSubmit={handleCreateFood} />
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default MainSection;
