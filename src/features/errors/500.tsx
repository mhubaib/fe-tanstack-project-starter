import { Button } from '#/components/ui/button'
import { IconArrowLeft, IconHome } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

interface UnknownErrorPageProps {
  error?: unknown
}

export function UnknownErrorPage({ error }: UnknownErrorPageProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      console.error('[Root ErrorComponent caught error]:', error)
    }
  }, [error])

  const handleGoBack = () => {
    window.history.back()
  }

  const handleGoHome = () => {
    navigate({ to: '/' })
  }

  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : null

  const errorStack = error instanceof Error ? error.stack : null

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <div className="mb-6">
          <span className="text-8xl font-bold tracking-tight text-primary">
            500
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            Internal Server Error
          </h1>

          <p className="text-sm leading-6 text-muted-foreground">
            Oops! Terjadi kesalahan di server. Coba lagi beberapa saat atau
            kembali ke halaman sebelumnya.
          </p>

          {import.meta.env.DEV && errorMessage && (
            <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-left text-xs text-destructive">
              <p className="font-semibold">{errorMessage}</p>
              {errorStack && (
                <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap font-mono text-[10px] opacity-80">
                  {errorStack}
                </pre>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="outline" onClick={handleGoBack}>
            <IconArrowLeft />
            Kembali
          </Button>

          <Button type="button" onClick={handleGoHome}>
            <IconHome />
            Ke Beranda
          </Button>
        </div>
      </div>
    </main>
  )
}
