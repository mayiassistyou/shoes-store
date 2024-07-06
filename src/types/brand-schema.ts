import * as z from "zod";

export const BrandSchema = z.object({
  title: z.string().min(1, {
    message: "Vui lòng nhập tên thương hiệu",
  }),
  description: z.string().optional(),
  image: z.string().min(1, {
    message: "Vui lòng chọn hình ảnh",
  }),
});
