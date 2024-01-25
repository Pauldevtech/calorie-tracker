import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Food } from "@/types/interfaces";
import { Button } from "./ui/button";

interface FoodTableProps {
  data: Food[];
  totalProtein: number;
  totalCarbohydrates: number;
  totalFats: number;
  totalCalories: number;
  toTitleCase: (str: string) => string;
  handleDelete: (id: string) => void;
  handleEdit: (food: Food) => void;
  handleRowTouchStart: (food: Food) => void;
  handleRowTouchEnd: () => void;
}

const FoodTable: React.FC<FoodTableProps> = ({
  data,
  totalProtein,
  totalCarbohydrates,
  totalFats,
  totalCalories,
  toTitleCase,
  handleDelete,
  handleEdit,
  handleRowTouchStart,
  handleRowTouchEnd,
}) => {
  return (
    <Table className="w-full text-sm sm:text-base">
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-black">Food Name</TableHead>
          <TableHead className="font-bold text-black">Protein</TableHead>
          <TableHead className="font-bold text-black">Carbs</TableHead>
          <TableHead className="font-bold text-black">Fats</TableHead>
          <TableHead className="font-bold text-black w-[150px]">
            Calories
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((food: Food) => (
            <TableRow
              key={food.id}
              onTouchStart={() => handleRowTouchStart(food)}
              onTouchEnd={handleRowTouchEnd}
            >
              <TableCell className="w-1/5">
                {toTitleCase(food.foodName)}
              </TableCell>
              <TableCell className="w-1/5">{food.protein}</TableCell>
              <TableCell className="w-1/5">{food.carbohydrates}</TableCell>
              <TableCell className="w-1/5">{food.fats}</TableCell>
              <TableCell className="w-1/5">{food.calories}</TableCell>
              <TableCell className="py-0 truncate">
                <Button
                  className="bg-red-500 hidden text-sm h-8 sm:inline-block"
                  onClick={() => handleDelete(food.id || "")}
                >
                  Delete
                </Button>
                <Button
                  className="bg-blue-500 hidden ml-3 h-8 sm:inline-block"
                  onClick={() => handleEdit(food)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        <TableRow>
          <TableCell colSpan={1} className="font-bold text-gray-500">
            Total
          </TableCell>
          <TableCell className="font-bold text-gray-500 ">
            {totalProtein}
          </TableCell>
          <TableCell className="font-bold text-gray-500 ">
            {totalCarbohydrates}
          </TableCell>
          <TableCell className="font-bold text-gray-500 ">
            {totalFats}
          </TableCell>
          <TableCell className="font-bold text-gray-500 ">
            {totalCalories}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default FoodTable;
