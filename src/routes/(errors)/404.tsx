import { Button } from '#/components/ui/button'
import { IconArrowLeft, IconHome } from '@tabler/icons-react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/(errors)/404')({
  component: NotFoundPage,
})

function NotFoundPage() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    window.history.back()
  }

  const handleGoHome = () => {
    navigate({ to: '/' })
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="mb-6">
          <span className="text-8xl font-bold tracking-tight text-primary">
            404
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            Page not found
          </h1>

          <p className="text-sm leading-6 text-muted-foreground">
            Halaman yang anda cari tidak ditemukan atau mungkin sudah
            dipindahkan.
          </p>
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
