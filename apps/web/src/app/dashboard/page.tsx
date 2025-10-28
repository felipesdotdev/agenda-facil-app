import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Dashboard from "./dashboard";

export default async function DashboardPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
      throw: true,
    },
  });

  if (!session?.user) {
    redirect("/login");
  }

  // Verificar se o usuário é admin
  const isAdmin = session.user.role === "admin";

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
}
