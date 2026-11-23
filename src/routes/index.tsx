import { Link, createFileRoute } from '@tanstack/react-router'
import { useAuth } from '#/features/auth/hooks/use-auth'
import { Button } from '#/components/ui/button'
import {
  IconArrowRight,
  IconCookie,
  IconLock,
  IconShieldCheck,
} from '@tabler/icons-react'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-border/60 bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-bold">
            <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg font-mono text-xs font-semibold">
              TS
            </div>
            <span>TanStack Starter</span>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="sm" className="gap-1.5">
                  Buka Dashboard
                  <IconArrowRight className="size-3.5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Daftar</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <div className="bg-muted text-foreground/80 mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium">
          <span className="bg-primary size-2 rounded-full"></span>
          Frontend Boilerplate with TanStack Router & Start
        </div>

        <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Boilerplate Autentikasi Modern
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base sm:text-lg">
          Lengkap dengan Register, Login, Verify OTP, Reset Password, dan
          Cookie-based Auth Session dengan Zero Flicker Route Guards.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button size="lg" className="gap-2">
                Masuk ke Dashboard ({user?.name})
                <IconArrowRight className="size-4" />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button size="lg" className="gap-2">
                  Coba Login
                  <IconArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Daftar Akun Baru
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Features highlight */}
        <div className="mt-16 grid gap-6 text-left sm:grid-cols-2 md:grid-cols-3">
          <div className="border-border bg-card rounded-xl border p-5 shadow-xs">
            <div className="bg-primary/10 text-primary mb-3 flex size-9 items-center justify-center rounded-lg">
              <IconCookie className="size-5" />
            </div>
            <h3 className="text-base font-semibold">Full Cookies Storage</h3>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              Token dan data profil pengguna disimpan di cookies dengan
              SameSite=Lax dan Path=/, tanpa LocalStorage.
            </p>
          </div>

          <div className="border-border bg-card rounded-xl border p-5 shadow-xs">
            <div className="bg-primary/10 text-primary mb-3 flex size-9 items-center justify-center rounded-lg">
              <IconShieldCheck className="size-5" />
            </div>
            <h3 className="text-base font-semibold">Zero Flicker Guards</h3>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              Menggunakan <code>beforeLoad</code> layout route yang
              mengintersepsi sebelum DOM render atau loader berjalan.
            </p>
          </div>

          <div className="border-border bg-card rounded-xl border p-5 shadow-xs">
            <div className="bg-primary/10 text-primary mb-3 flex size-9 items-center justify-center rounded-lg">
              <IconLock className="size-5" />
            </div>
            <h3 className="text-base font-semibold">Fitur Auth Lengkap</h3>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              Register, Login, Input OTP dengan countdown resend, Lupa Password,
              dan Reset Password siap pakai.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
