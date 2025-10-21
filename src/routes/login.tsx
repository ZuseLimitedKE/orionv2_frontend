import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { LoginForm } from '@/components/login-form'
import { getSession } from '@/integrations/auth/auth-client'
export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getSession()
    if (session.data) {
      throw redirect({ to: '/app/marketplace' })
    }
  },
})

function RouteComponent() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-1 self-center font-semibold"
        >
          <img src="/logo.png" alt="logo" className="w-5 h-5" />
          Orion.
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
