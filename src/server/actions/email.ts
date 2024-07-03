"use server";

import getBaseURL from "@/lib/base-url";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseURL();

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "yam@xoppi.me",
    to: email,
    subject: "seohs - Xác thực email của bạn",
    html: `<p>Bấm vào để <a href='${confirmLink}'> xác thực email</a></p>`,
  });

  if (error) return console.log(error);
  if (data) return data;
};
