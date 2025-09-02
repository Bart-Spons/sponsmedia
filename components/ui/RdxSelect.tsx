"use client";
import * as Select from "@radix-ui/react-select";

type Option = { value: string; label: string };

export default function RdxSelect({
    value,
    onValueChange,
    placeholder = "Select…",
    options,
    className = "",
}: {
    value?: string;
    onValueChange?: (v: string) => void;
    placeholder?: string;
    options: Option[];
    className?: string;
}) {
    return (
        <Select.Root value={value} onValueChange={onValueChange}>
            <Select.Trigger
                className={`w-full h-[48px] px-4 bg-black/30 border border-white/20 rounded-xl text-white text-left
          focus:outline-none focus:border-[#e2b76f] focus:ring-2 focus:ring-[#e2b76f]/40
          flex items-center justify-between ${className}`}
                aria-label={placeholder}
            >
                <Select.Value placeholder={placeholder} />
                <Select.Icon>
                    <svg
                        className="w-4 h-4 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    position="popper"
                    sideOffset={6}
                    className="z-50 overflow-hidden rounded-xl border border-white/10
            bg-[#0b0f15] text-white shadow-xl max-h-72 w-[var(--radix-select-trigger-width)]"
                >
                    <Select.Viewport className="p-1">
                        {options.map((opt) => (
                            <Select.Item
                                key={opt.value}
                                value={opt.value}
                                className="relative flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer
                  outline-none select-none
                  data-[highlighted]:bg-white/10 data-[highlighted]:text-white
                  data-[state=checked]:bg-white/5"
                            >
                                <Select.ItemText>{opt.label}</Select.ItemText>
                                <Select.ItemIndicator className="absolute right-3">
                                    <svg
                                        className="w-4 h-4 text-[#e2b76f]"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M20 6L9 17l-5-5"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}
