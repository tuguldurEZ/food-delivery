import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const fetchAllCategory = async () => {
  try {
    const response = await axios.get("/api/category/fetch-all-category");
    console.log(response);
    return response.data.getCagegory;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const data = axiosError.response.data as { error?: string };
      toast.error(data.error || "Алдаа гарлаа");
    } else {
      toast.error("Сервертэй холбогдож чадсангүй.");
    }

    console.error("Axios алдаа:", axiosError);
    throw new Error("fetchAllCategory алдаа");
  }
};
