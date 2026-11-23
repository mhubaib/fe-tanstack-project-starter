import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { getAuthToken } from '#/lib/cookies'
import { AppLayout } from '#/components/layouts/app-layout'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const token = getAuthToken()
    if (!token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
