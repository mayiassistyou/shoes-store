import * as z from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: "Tên sản phẩm không được để trống",
  }),
  price: z.coerce
    .number({ invalid_type_error: "Giá không hợp lệ" })
    .positive({ message: "Giá không hợp lệ" }),
  brandId: z.coerce
    .number({ invalid_type_error: "Thương hiệu không được để trống" })
    .positive({ message: "Thương hiệu không được để trống" }),
  description: z.string().min(1, {
    message: "Mô tả sản phẩm không được để trống",
  }),
  images: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string(),
        url: z.string(),
      }),
    )
    .nonempty({
      message: "Hãy chọn ít nhất một hình ảnh cho sản phẩm",
    }),
});
