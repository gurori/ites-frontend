import { getRole, getToken } from "@/lib/services/user";
import { redirect } from "next/navigation";
import OrderForm from "./OrderForm";

export default async function CreateOrderPage() {
  const token = await getToken();
  const role = await getRole(token!);
  if (role !== "client") redirect(`/profile/${role}`);

  return <OrderForm token={token!.value} />;
}