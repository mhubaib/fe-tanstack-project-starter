import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useAuth } from '#/features/auth/hooks/use-auth'
import { Button } from '#/components/ui/button'
import { ConfirmDialog } from '#/components/dialogs/confirm-dialog'
import { IconLogout, IconUser } from '@tabler/icons-react'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user, logout } = useAuth()
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } finally {
      setIsLoggingOut(false)
      setLogoutDialogOpen(false)
    }
  }

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Top Navigation Bar */}
      <header className="border-border/60 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 font-bold">
              <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg font-mono text-xs font-semibold">
                TS
              </div>
              <span className="text-base tracking-tight">TanStack Starter</span>
            </Link>
            <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
              <Link
                to="/"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <div className="bg-muted hidden items-center gap-2 rounded-full py-1 pr-3 pl-1.5 text-xs md:flex">
                <div className="bg-primary/10 text-primary flex size-6 items-center justify-center rounded-full font-semibold">
                  <IconUser className="size-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-foreground font-medium leading-none">
                    {user.name}
                  </span>
                  <span className="text-muted-foreground text-[10px] leading-tight">
                    {user.email}
                  </span>
                </div>
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setLogoutDialogOpen(true)}
              className="gap-1.5"
            >
              <IconLogout className="size-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        title="Konfirmasi Logout"
        description="Apakah Anda yakin ingin keluar dari sesi akun ini?"
        confirmText="Ya, Logout"
        cancelText="Batal"
        variant="destructive"
        isLoading={isLoggingOut}
        onConfirm={handleLogout}
      />
    </div>
  )
}
