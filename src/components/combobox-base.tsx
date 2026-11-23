'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { cn } from '#/lib/utils'
import { Button } from '#/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { IconCheck, IconLoader2, IconSelector } from '@tabler/icons-react'

interface ComboboxBaseProps<T extends { id: string }> {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  items: T[]
  selectedItem: T | null
  isLoading: boolean
  isError: boolean
  hasMore: boolean
  onSearch: (value: string) => void
  onLoadMore: () => void
  onRetry: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  renderItem: (item: T) => React.ReactNode
  getLabel: (item: T) => string
  noItemsMessage?: string
  disabled?: boolean
  action?: ReactNode
  initialLabel?: string
  className?: string
}

export function ComboboxBase<T extends { id: string }>({
  value = '',
  onValueChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  items,
  selectedItem,
  isLoading,
  isError,
  hasMore,
  onSearch,
  onLoadMore,
  onRetry,
  open: controlledOpen,
  onOpenChange,
  renderItem,
  getLabel,
  noItemsMessage = 'No items found.',
  disabled,
  action,
  initialLabel,
  className,
}: ComboboxBaseProps<T>) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  const handleSelect = (itemId: string) => {
    onValueChange?.(itemId)
    if (!isControlled) {
      setUncontrolledOpen(false)
    }
    onOpenChange?.(false)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        disabled={disabled}
        className="bg-transparent shadow-none"
      >
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'disabled:bg-muted w-full min-w-0 justify-between font-normal disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-100',
            className,
          )}
        >
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-left',
              !selectedItem &&
                !(value && initialLabel) &&
                'text-muted-foreground/45 font-normal',
            )}
          >
            {selectedItem
              ? getLabel(selectedItem)
              : value && initialLabel
                ? initialLabel
                : placeholder}
          </span>
          <IconSelector className="ml-1 h-3.5 w-3.5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] min-w-[300px] p-0"
        align="start"
        onWheel={(e) => e.stopPropagation()}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={onSearch}
          />
          <CommandList>
            {isLoading && items.length === 0 ? (
              <div className="flex items-center justify-center py-6">
                <IconLoader2 className="h-4 w-4 animate-spin" />
                <span className="text-muted-foreground ml-2 text-sm">
                  Loading...
                </span>
              </div>
            ) : isError ? (
              <CommandEmpty>
                <div className="flex flex-col items-center py-4">
                  <span className="text-muted-foreground mb-2 text-sm">
                    Failed to load data
                  </span>
                  <Button variant="outline" size="sm" onClick={onRetry}>
                    Retry
                  </Button>
                </div>
              </CommandEmpty>
            ) : items.length === 0 ? (
              <CommandEmpty>{noItemsMessage}</CommandEmpty>
            ) : (
              <>
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      onSelect={() => handleSelect(item.id)}
                    >
                      <IconCheck
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === item.id ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {renderItem(item)}
                    </CommandItem>
                  ))}
                </CommandGroup>

                {hasMore && (
                  <div className="border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-center py-2"
                      onClick={onLoadMore}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        'Load more'
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </CommandList>
          {action && <div className="border-t">{action}</div>}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
