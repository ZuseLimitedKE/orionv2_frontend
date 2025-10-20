// THIS IS THE LAYOUT FILE FOR THE /app directory don't remove it
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { getSession } from '@/integrations/auth/auth-client'
export const Route = createFileRoute('/app')({
  component: AppLayoutComponent,
  beforeLoad: async () => {
    const session = await getSession()
    if (!session.data) {
      throw redirect({ to: '/login' })
    }
  },
})

function AppLayoutComponent() {
  return (
    <div className="relative w-full min-h-screen">
      <div>Navbar Placeholder</div>
      <div className="mt-20 md:px-8 px-6">
        <Outlet />
      </div>
    </div>
  )
}
