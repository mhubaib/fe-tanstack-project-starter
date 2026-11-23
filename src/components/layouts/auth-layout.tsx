import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

interface AuthLayoutProps {
  title: string
  description?: string
  children: ReactNode
  footerPrompt?: {
    text: string
    linkText: string
    href: string
  }
}

export function AuthLayout({
  title,
  description,
  children,
  footerPrompt,
}: AuthLayoutProps) {
  return (
    <div className="bg-muted/30 flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        {/* Brand / Logo Header */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-foreground"
          >
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg font-mono text-sm font-semibold">
              TS
            </div>
            <span>TanStack Starter</span>
          </Link>
        </div>

        {/* Card Container */}
        <div className="border-border bg-card text-card-foreground rounded-2xl border p-6 shadow-sm sm:p-8">
          <div className="mb-6 space-y-1.5 text-center">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {children}

          {footerPrompt && (
            <div className="text-muted-foreground mt-6 text-center text-xs">
              {footerPrompt.text}{' '}
              <Link
                to={footerPrompt.href}
                className="text-primary font-medium underline-offset-4 hover:underline"
              >
                {footerPrompt.linkText}
              </Link>
            </div>
          )}
        </div>

        {/* Copyright Footer */}
        <div className="text-muted-foreground mt-8 text-center text-xs">
          &copy; 2026 TanStack Starter Boilerplate. All rights reserved.
        </div>
      </div>
    </div>
  )
}
