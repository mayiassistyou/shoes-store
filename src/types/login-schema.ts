import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập email",
  }),
  password: z.string().min(1, {
    message: "Vui lòng nhập mật khẩu",
  }),
});
