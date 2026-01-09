import React from "react";
import { Button } from "./Buttons";
export default function SelectableCard({
    icon,
    text,
    selected = false,
    onSelect,
    className = "",
}) {
    return (
        <Button
            type="button"
            onClick={onSelect}
            buttonClassName={[
                "group w-full sm:w-[300px] md:w-[320px] lg:w-[340px] rounded-2xl bg-text-light text-left transition",
                // Default: thin border always visible
                "border-2 border-primary-600",
                // Hover: deepen border (only if not selected)
                selected ? "" : "hover:border-primary-700",
                // Selected: stronger outer border (thicker + darker)
                selected ? "border-2 border-primary-800 shadow-sm" : "",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                className,
            ].join(" ")}
        >
            <div className="flex items-stretch rounded-2xl overflow-hidden h-full">
                {/* Icon block */}
                <div
                    className={[
                        "self-stretch w-14 sm:w-16 flex items-center justify-center transition-colors shrink-0",
                        // Default icon background: light green
                        "bg-primary-100 shadow-[inset_-4px_0_8px_rgba(0,0,0,0.1)]",
                        // Hover icon bg: slightly deeper
                        selected ? "bg-primary-600" : "group-hover:bg-primary-100",
                    ].join(" ")}
                >
                    <div className="w-10 h-10 bg-primary-50 rounded-lg shadow-md border-2 border-primary-100 flex items-center justify-center">
                        <div className={["text-lg sm:text-xl", selected ? "text-primary-900" : "text-primary-900"].join(" ")}>
                            {icon}
                        </div>
                    </div>
                </div>

                {/* Text block */}
                <div className={["flex-1 px-3 py-3 sm:px-4 sm:py-6 flex items-center", selected ? "bg-primary-50" : ""].join(" ")}>
                    <div
                        className={[
                            "text-sm sm:text-lg text-text-dark",
                            selected ? "font-bold" : "font-medium"
                        ].join(" ")}
                    >
                        {text}
                    </div>
                </div>
            </div>
        </Button>
    );
}
