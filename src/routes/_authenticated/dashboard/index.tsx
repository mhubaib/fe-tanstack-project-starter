import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '#/features/auth/hooks/use-auth'
import { getAuthToken } from '#/lib/cookies'
import {
  IconCheck,
  IconCookie,
  IconShieldCheck,
  IconUser,
} from '@tabler/icons-react'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  const { user } = useAuth()
  const token = getAuthToken()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Demo</h1>
        <p className="text-muted-foreground text-sm">
          Halaman ini dilindungi oleh TanStack Router <code>beforeLoad</code>{' '}
          guard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* User Card */}
        <div className="border-border bg-card text-card-foreground rounded-xl border p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
              <IconUser className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Profil Pengguna</h3>
              <p className="text-muted-foreground text-xs">
                Data dari cookie auth_user
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-1.5 text-xs">
            <div className="border-border/50 flex justify-between border-b py-1">
              <span className="text-muted-foreground">ID:</span>
              <span className="font-mono font-medium">{user?.id || '-'}</span>
            </div>
            <div className="border-border/50 flex justify-between border-b py-1">
              <span className="text-muted-foreground">Nama:</span>
              <span className="font-medium">{user?.name || '-'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{user?.email || '-'}</span>
            </div>
          </div>
        </div>

        {/* Cookie Storage Card */}
        <div className="border-border bg-card text-card-foreground rounded-xl border p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex size-10 items-center justify-center rounded-lg">
              <IconCookie className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Cookie Storage</h3>
              <p className="text-muted-foreground text-xs">
                Full Cookies (No LocalStorage)
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-1.5 text-xs">
            <div className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
              <IconCheck className="size-4" />
              <span>Token tersimpan di Cookie (auth_token)</span>
            </div>
            <div className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
              <IconCheck className="size-4" />
              <span>User tersimpan di Cookie (auth_user)</span>
            </div>
            <div className="bg-muted text-muted-foreground mt-2 truncate rounded p-2 font-mono text-[10px]">
              Token: {token ? `${token.slice(0, 24)}...` : 'None'}
            </div>
          </div>
        </div>

        {/* Protection Card */}
        <div className="border-border bg-card text-card-foreground rounded-xl border p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 flex size-10 items-center justify-center rounded-lg">
              <IconShieldCheck className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Route Protection</h3>
              <p className="text-muted-foreground text-xs">
                Zero Flicker Guard
              </p>
            </div>
          </div>
          <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
            Layout <code>_authenticated</code> secara otomatis memeriksa token
            cookie sebelum merender halaman. Jika token dihapus, navigasi
            langsung dialihkan ke login.
          </p>
        </div>
      </div>
    </div>
  )
}
