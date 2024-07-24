import { redirect } from "next/navigation";

function Home() {
  redirect("/products");
}

export default Home;
