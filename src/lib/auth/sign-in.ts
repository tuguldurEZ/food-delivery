import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const SignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post("/api/user/sign-in", {
      email,
      password,
    });
    localStorage.setItem("user", response.data.user._id);
    toast.success("Амжилттай Нэвтэрлээ!");
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const data = axiosError.response.data as { error?: string };
      toast.error(data.error || "Нэвтэрхэд алдаа гарлаа");
    } else {
      toast.error("Сервертэй холбогдож чадсангүй.");
    }

    console.error("Axios error:", axiosError);
    throw new Error("алдаа гарлаа");
  }
};
