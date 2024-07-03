import RegisterForm from "@/components/auth/register-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

async function Register(): Promise<JSX.Element> {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <RegisterForm />;
}

export default Register;
