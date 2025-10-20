import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignupForm } from '@/components/signup-form'
import { getSession } from '@/integrations/auth/auth-client'
export const Route = createFileRoute('/sign-up')({
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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
