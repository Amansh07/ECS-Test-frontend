import React from 'react';
import { Link } from 'react-router-dom';
import cropProduction from "../../assets/cropProduction.svg";
import commodityProduction from "../../assets/commodityProduction.svg";

const cards = [
    { title: "Crop Production", description: "Information on crops cultivated by member farmers under the FPO.", icon: cropProduction, path: "crop-production" },
    { title: "Commodity Production", description: "Details of aggregated produce and processed commoditites handled by the FPO.", icon: commodityProduction, path: "commodity-production" },
];

export const ProductionDetails = () => {
    return (
        <div className="min-h-[380px]">
            <div className="h-46px">
                <p className="text-base font-medium">FPO Production Details</p>
            </div>

            <div className="mt-[80px] flex items-center justify-center gap-6 flex-wrap">
                {cards.map((card, index) => (
                    <Link
                        key={index}
                        to={`/production-details/${card.path}`}
                        className="w-[348px] h-[96px] shadow-md flex rounded-2xl hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="w-[96px] bg-primary-50 flex items-center justify-center rounded-tl-2xl rounded-bl-2xl">
                            <div className="w-[46px] h-[46px]">
                                <img src={card.icon} alt={`${card.title} icon`} />
                            </div>
                        </div>
                        <div className="flex-1 p-4 rounded-tr-2xl rounded-br-2xl bg-white">
                            <p className="text-[14px] font-medium text-text-dark">{card.title}</p>
                            <p className="text-[12px] font-normal text-[#212121]">{card.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
