import LoginForm from "@/components/auth/login-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

async function Login(): Promise<JSX.Element> {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}

export default Login;
