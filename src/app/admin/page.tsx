import { redirect } from "next/navigation";

async function Admin() {
  redirect("/admin/products");
}

export default Admin;
