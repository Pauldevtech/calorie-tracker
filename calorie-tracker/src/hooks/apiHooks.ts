import { Food } from "@/types/interfaces";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type NewFood = Omit<Food, "id"> & { carbohydrates: number; fats: number };

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
 throw new Error('API URL is not defined');
}

// Fetch all food items
export const useGetFoods = () => {
 return useQuery<Food[]>(["foods"], async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
 });
};

// Add a new food item
export const useAddFood = () => {
 const queryClient = useQueryClient();

 return useMutation<Food, Error, NewFood>(
    async (newFood) => {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFood),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["foods"]);
      },
    }
 );
};

// Update a food item
export const useUpdateFood = () => {
 const queryClient = useQueryClient();

 return useMutation<
    Food,
    Error,
    { id: string; updatedFood: Omit<Food, "id"> }
 >(
    async ({ id, updatedFood }) => {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFood),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["foods"]);
      },
    }
 );
};

// Delete a food item
export const useDeleteFood = () => {
 const queryClient = useQueryClient();

 return useMutation<void, Error, string>(
    async (id) => {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.headers.get("content-length") === "0") {
        return null;
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["foods"]);
      },
    }
 );
};
