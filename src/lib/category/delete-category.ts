import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const deleteCategory = async (_id: string) => {
  try {
    const response = await axios.post("/api/category/delete-category", {
      _id,
    });
    toast.success("Амжилттай Устгалаа!");
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const data = axiosError.response.data as { error?: string };
      toast.error(data.error || "Устгах алдаа гарлаа");
    } else {
      toast.error("Сервертэй холбогдож чадсангүй.");
    }

    console.error("Axios error:", axiosError);
    throw new Error("алдаа гарлаа");
  }
};
