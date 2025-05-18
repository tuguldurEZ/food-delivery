import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { handleUpload } from "../handle-upload";

export const createFood = async (
  foodName: string,
  foodPrice: string,
  Ingredients: string,
  file: File | null,
  id: string
) => {
  const imgUrl = await handleUpload(file);
  try {
    const response = await axios.post("/api/food/create-food", {
      foodName,
      foodPrice,
      Ingredients,
      image: imgUrl,
      id,
    });

    toast.success("Амжилттай Нэмэгдлээ!");
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const data = axiosError.response.data as { error?: string };
      toast.error(data.error || "Нэмэх алдаа гарлаа");
    } else {
      toast.error("Сервертэй холбогдож чадсангүй.");
    }

    console.error("Axios error:", axiosError);
    throw new Error("алдаа гарлаа");
  }
};
