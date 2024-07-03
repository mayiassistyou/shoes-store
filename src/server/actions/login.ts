"use server";

import { LoginSchema } from "@/types/login-schema";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import { createSafeActionClient } from "next-safe-action";

import { db } from "..";
import { signIn } from "../auth";
import { users } from "../schema";
import { sendVerificationEmail } from "./email";
import { generateEmailVerificationToken } from "./tokens";

const action = createSafeActionClient();

export const login = action
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser?.email !== email) {
        return { error: "Email hoặc mật khẩu không đúng!" };
      }

      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(
          existingUser.email,
        );
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token,
        );
        return { success: "Vui lòng kiểm tra email để xác thực tài khoản." };
      }

      await signIn("credentials", {
        email,
        password,
        redirectTo: "/",
      });

      return { success: "Đăng nhập thành công!" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Email hoặc mật khẩu không đúng!" };
          case "AccessDenied":
            return { error: error.message };
          case "OAuthSignInError":
            return { error: error.message };
          default:
            return { error: "Đã xảy ra lỗi. Vui lòng thử lại sau." };
        }
      }
      throw error;
    }
  });
