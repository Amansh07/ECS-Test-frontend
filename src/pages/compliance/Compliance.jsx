import React from 'react';
import { Link } from 'react-router-dom';
import farmers from "../../assets/farmers.svg";

const cards = [
    { title: "Annual Turnover", description: "Lorem ipsum dolor sit amet", icon: farmers, path: "annual-turnover" },
    { title: "FPO Capital Update/View", description: "Lorem ipsum dolor sit amet", icon: farmers, path: "fpo-capital" },
    { title: "AGM Meeting Update/View", description: "Lorem ipsum dolor sit amet", icon: farmers, path: "agm-meeting" },
    { title: "Bank Details", description: "Lorem ipsum dolor sit amet", icon: farmers, path: "bank-details" },
    { title: "License Update", description: "Lorem ipsum dolor sit amet", icon: farmers, path: "license-update" },
];

export const Compliance = () => {
    return (
        <div className="min-h-[380px]">
            <div className="h-46px">
                <p className="text-base font-medium">Compliance</p>
            </div>

            <div className="mt-[80px] flex items-center justify-center gap-6 flex-wrap">
                {cards.map((card, index) => (
                    <Link
                        key={index}
                        to={`/compliance/${card.path}`}
                        className="w-[348px] h-[96px] shadow-md flex rounded-2xl hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="w-[96px] bg-primary-50 flex items-center justify-center rounded-tl-2xl rounded-bl-2xl">
                            <div className="w-[46px] h-[46px]">
                                <img src={card.icon} alt={`${card.title} icon`} />
                            </div>
                        </div>
                        <div className="flex-1 p-4 rounded-tr-2xl rounded-br-2xl bg-white">
                            <p className="text-[14px] font-medium text-text-dark">{card.title}</p>
                            <p className="text-[12px] font-normal text-text-hint">{card.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

