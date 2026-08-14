import { getRole, getToken } from "@/lib/services/user";
import { redirect } from "next/navigation";
import OrderForm from "./OrderForm";

export default async function CreateOrderPage() {
  const token = getToken()!;
  const role = getRole()!;

  if (role !== "client") redirect(`/profile/${role}`);

  return <OrderForm token={token} />;
}