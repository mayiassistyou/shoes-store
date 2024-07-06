"use client";

import { newVerification } from "@/server/actions/tokens";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import AuthCard from "./auth-card";
import FormError from "./form-error";
import FormSuccess from "./form-success";

function EmailVerificationForm(): JSX.Element {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerification = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Token xác thực không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }
    newVerification(token).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        router.push("/auth/login");
      }
    });
  }, []);

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <AuthCard
      backButtonLabel="Trở về đăng nhập"
      backButtonHref="/auth/login"
      cardTitle="Xác thực email của bạn 🎉"
    >
      <div className="flex w-full flex-col items-center justify-center">
        <p>{!success && !error ? "Đang xác thực..." : null}</p>
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </AuthCard>
  );
}

export default EmailVerificationForm;
