import * as React from "react"
import { Listbox } from "@headlessui/react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  size?: "sm" | "default" | "lg"
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, onChange, placeholder, disabled, className, size = "default" }, ref) => {
    const selectedOption = options.find(option => option.value === value)

    const sizeClasses = {
      sm: "h-8 px-2 py-1 text-xs",
      default: "h-10 px-3 py-2 text-sm",
      lg: "h-12 px-4 py-3 text-base",
    }

    return (
      <div ref={ref} className={cn("relative", className)}>
        <Listbox value={value} onChange={onChange} disabled={disabled}>
          <Listbox.Button
            className={cn(
              "flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              sizeClasses[size]
            )}
          >
            <span className={cn("block truncate", !selectedOption && "text-gray-500")}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDownIcon
              className="h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </Listbox.Button>
          <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={({ active, disabled }) =>
                  cn(
                    "relative cursor-default select-none px-3 py-2 text-sm",
                    active && "bg-primary-50 text-primary-900",
                    disabled && "cursor-not-allowed opacity-50",
                    !active && !disabled && "text-gray-900"
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <span className={cn("block truncate", selected && "font-medium")}>
                      {option.label}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
