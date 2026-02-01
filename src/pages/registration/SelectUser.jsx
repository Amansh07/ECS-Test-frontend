import React, { useState } from "react";
import SelectableCard from "../../components/SelectableCard";
import PreviewModal from "../../components/PreviewModal";
import FpcCoopVector from "/assets/FpcCoopVectorRegs.svg";
import BuyerTrader from "/assets/BuyerTraderRegs.svg";
import InputSupplier from "/assets/InputSupplierRegs.svg";
import AgriStartUp from "/assets/AgriStartUpRegs.svg";
import AgriIncubator from "/assets/AgriIncubatorRegs.svg";
const options = [
    { id: "fpc", icon: '', src: FpcCoopVector, text: "FPC / Cooperatives" },
    { id: "buyer", icon: "", src: BuyerTrader, text: "Buyer/Trader" },
    { id: "supplier", icon: "", src: InputSupplier, text: "Input Supplier" },
    { id: "startup", icon: "", src: AgriStartUp, text: "Agri Start-up" },
    { id: "incubator", icon: "", src: AgriIncubator, text: "Agri Incubator" },
];

const dummyPreviewData = [
    { label: "Season*", value: "Rabi" },
    { label: "Crop*", value: "Pea" },
    { label: "Crop Variety", value: "Legume" },
    { label: "Production (in Qtl.)*", value: "12" },
    { label: "Estimated/Harvested Marketable Surplus (in Qtl.)*", value: "12" },
    { label: "Date Of Harvesting*", value: "12/10/2026" },
    { label: "Estimated/Harvested*", value: "Estimated" },
    { label: "Image Banner*", value: "Pea_pulse1234.jpeg" },
    { label: "Publish to E-Mart*", value: "✅" },
];

const dummyDescription =
    "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.";

export default function SelectUser() {
    const [selectedId, setSelectedId] = useState("fpc");
    // const [showPreview, setShowPreview] = useState(false);

    return (
        <div className="flex flex-col items-center gap-8 max-w-[1100px] mx-auto">
            {/* Test Button for Preview Modal */}
            {/* <div className="w-full flex justify-end px-4">
                <button
                    onClick={() => setShowPreview(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
                >
                    Test Preview Modal
                </button>
            </div> */}

            <div className="flex flex-wrap gap-5 justify-center">
                {options.map((o) => (
                    <SelectableCard
                        key={o.id}
                        icon={o.src ? <img src={o.src} alt="icon" className="w-6 h-6" /> : o.icon}
                        text={o.text}
                        selected={selectedId === o.id}
                        onSelect={() => setSelectedId(o.id)}
                    />
                ))}
            </div>

            {/* <PreviewModal
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
                onConfirm={(desc) => {
                    console.log("Confirmed with description:", desc);
                    setShowPreview(false);
                }}
                title="Preview"
                // Using a placeholder image for testing
                image="https://placehold.co/200x200/3c9718/ffffff?text=Pea+Crop"
                data={dummyPreviewData}
                description={dummyDescription}
            /> */}
        </div>
    );
}

