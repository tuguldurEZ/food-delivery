import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const CreateCategory = async ({ category }: { category: string }) => {
  try {
    const response = await axios.post("/api/category/create-category", {
      category,
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
