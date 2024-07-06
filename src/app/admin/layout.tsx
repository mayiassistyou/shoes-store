import AdminNav from "@/components/navigation/admin-nav";
import { auth } from "@/server/auth";
import { DiamondPlus, Package, PenSquare, Ribbon, Truck } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function AdminLayout({
  children,
}: {
  children: ReactNode;
}): Promise<JSX.Element> {
  const session = await auth();

  if (!session || session?.user.role !== "admin") {
    redirect("/");
  }

  const links = [
    { label: "Sản phẩm", path: "/admin/products", icon: <Package size={16} /> },
    {
      label: "Thêm sản phẩm",
      path: "/admin/add-product",
      icon: <PenSquare size={16} />,
    },
    {
      label: "Thương hiệu",
      path: "/admin/brands",
      icon: <Ribbon size={16} />,
    },
    {
      label: "Thêm thương hiệu",
      path: "/admin/add-brand",
      icon: <DiamondPlus size={16} />,
    },
    { label: "Đơn hàng", path: "/admin/orders", icon: <Truck size={16} /> },
  ];

  return (
    <div>
      <AdminNav links={links} />
      {children}
    </div>
  );
}

export default AdminLayout;
