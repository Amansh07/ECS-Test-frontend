import React from 'react';
import { Link } from 'react-router-dom';
import farmers from "../../assets/farmers.svg";

const cards = [
  { title: "Annual Turnover", description: "Lorem ipsum dolor sit amet", icon: farmers, path: "annual-turnover" },
  { title: "Bank Details", description: "Lorem ipsum dolor sit amet", icon: farmers, path: "bank-details" },
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
                        className="w-[348px] h-[96px] shadow-[0px_1px_3px_1px_rgba(33,33,33,0.1)] flex rounded-2xl hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="w-[96px] bg-[#F8FFE5] flex items-center justify-center rounded-tl-2xl rounded-bl-2xl">
                            <div className="w-[46px] h-[46px]">
                                <img src={card.icon} alt={`${card.title} icon`} />
                            </div>
                        </div>
                        <div className="flex-1 p-4">
                            <p className="text-[14px] font-medium text-[#212121]">{card.title}</p>
                            <p className="text-[12px] font-normal text-[#212121]">{card.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

