import { cn } from '#/lib/utils'
import { IconAlertCircle } from '@tabler/icons-react'

interface FormErrorProps {
  message?: string | null
  className?: string
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null

  return (
    <div
      className={cn(
        'border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium',
        className,
      )}
      role="alert"
    >
      <IconAlertCircle className="size-4 shrink-0" />
      <span>{message}</span>
    </div>
  )
}
