import { getDashboardData } from "@/app/actions/admin"
import { AdminDashboardClient } from "@/components/admin/admin-dashboard-client"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const data = await getDashboardData()

  return <AdminDashboardClient data={data} />
}