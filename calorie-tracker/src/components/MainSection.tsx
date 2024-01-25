import React, { useState } from "react";
import { useGetFoods, useDeleteFood, useUpdateFood } from "@/hooks/apiHooks";
import { Button } from "@/components/ui/button";
import { useAddFood } from "@/hooks/apiHooks";
import { Food } from "@/types/interfaces";
import FoodTable from "./FoodTable";
import EditFoodDialog from "./dialogs/EditFoodDialog";
import ActionDialog from "./dialogs/ActionDialog";
import AddFoodDialog from "./dialogs/AddFoodDialog";

const MainSection: React.FC = () => {
  const { data, isLoading, error } = useGetFoods();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentFood, setCurrentFood] = useState<Food | null>(null);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [isEnterFoodDialogOpen, setIsEnterFoodDialogOpen] = useState(false);
  const [touchTimeoutId, setTouchTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );

  const addFoodMutation = useAddFood();
  const deleteMutation = useDeleteFood();
  const updateMutation = useUpdateFood();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage = (error as unknown as { message: string }).message;
    return <div>An error occurred: {errorMessage}</div>;
  }

  const toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
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

      <EditFoodDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        currentFood={currentFood}
        setCurrentFood={setCurrentFood}
        onUpdate={handleUpdate}
      />

      <ActionDialog
        isOpen={isActionDialogOpen}
        onClose={() => setIsActionDialogOpen(false)}
        currentFood={currentFood}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <AddFoodDialog
        isOpen={isEnterFoodDialogOpen}
        onClose={handleEnterFoodDialogClose}
        onSubmit={handleCreateFood}
      />
    </main>
  );
};

export default MainSection;
