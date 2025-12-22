import React from "react";
import SelectableCard from "../../components/SelectableCard";

const options = [
    { id: "fpc", icon: "🫱🏽‍🫲🏽", text: "FPC / Cooperatives" },
    { id: "buyer", icon: "🛒", text: "Buyer/Trader" },
    { id: "supplier", icon: "💼", text: "Input Supplier" },
    { id: "startup", icon: "🌱", text: "Agri Start-up" },
    { id: "incubator", icon: "🏗️", text: "Agri Incubator" },
];

export default function SelectUser() {
    const [selectedId, setSelectedId] = React.useState("fpc");

    return (
        <div className="flex flex-wrap gap-5 justify-center max-w-[1100px] mx-auto">
            {options.map((o) => (
                <SelectableCard
                    key={o.id}
                    icon={o.icon}
                    text={o.text}
                    selected={selectedId === o.id}
                    onSelect={() => setSelectedId(o.id)}
                />
            ))}
        </div>
    );
}

