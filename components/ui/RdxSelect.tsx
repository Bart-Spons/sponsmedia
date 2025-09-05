"use client";
import * as Select from "@radix-ui/react-select";
import * as React from "react";

export type Option = { value: string; label: string };

type Props = {
    value?: string; // RHF field.value
    onValueChange?: (v: string) => void; // RHF field.onChange
    onBlur?: () => void; // RHF field.onBlur
    options: Option[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    "aria-invalid"?: boolean | "true" | "false";
};

export default function RdxSelect({
    value,
    onValueChange,
    onBlur,
    options,
    placeholder = "Select…",
    className = "",
    disabled,
    id,
    name,
    "aria-invalid": ariaInvalid,
}: Props) {
    // voorkom uncontrolled→controlled warnings
    const fallback = options[0]?.value ?? "";

    return (
        <Select.Root
            value={value ?? fallback}
            onValueChange={onValueChange}
            disabled={disabled}
            name={name}
        >
            <Select.Trigger
                id={id}
                onBlur={onBlur}
                aria-invalid={ariaInvalid}
                className={`w-full h-[48px] px-4 bg-black/30 border border-white/20 rounded-xl text-white text-left
          focus:outline-none focus:border-[#e2b76f] focus:ring-2 focus:ring-[#e2b76f]/40
          flex items-center justify-between ${className}
          ${ariaInvalid ? "border-red-500" : ""}`}
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
