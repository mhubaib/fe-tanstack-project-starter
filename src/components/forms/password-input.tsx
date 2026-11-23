import * as React from 'react'
import { cn } from '#/lib/utils'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

export interface PasswordInputProps extends Omit<
  React.ComponentProps<typeof Input>,
  'type'
> {
  showToggle?: boolean
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, showToggle = true, disabled, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="relative w-full">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-9', className)}
        ref={ref}
        disabled={disabled}
        {...props}
      />
      {showToggle && (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1.5 -translate-y-1/2"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <IconEyeOff className="size-4" />
          ) : (
            <IconEye className="size-4" />
          )}
        </Button>
      )}
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'
