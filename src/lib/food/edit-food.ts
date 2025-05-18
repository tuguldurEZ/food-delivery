import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const editFood = async (
  Ingredients: string,
  foodName: string,
  foodPrice: string,
  category: string,
  foodId: string
) => {
  try {
    const response = await axios.post("/api/food/edit-food", {
      Ingredients,
      foodName,
      foodPrice,
      category,
      foodId,
    });
    console.log(response);
    toast.success("Амжилттай Заслаа!");
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const data = axiosError.response.data as { error?: string };
      toast.error(data.error || "Засах алдаа гарлаа");
    } else {
      toast.error("Сервертэй холбогдож чадсангүй.");
    }

    console.error("Axios error:", axiosError);
    throw new Error("алдаа гарлаа");
  }
};
