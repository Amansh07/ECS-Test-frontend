import React from 'react';
import { Link } from 'react-router-dom';
import farmers from "../../assets/farmers.svg";

const cards = [
  { title: "Fertilizer Details", description: "Fertilizer types, availability, and distribution managed by the FPO.", icon: farmers, path: "fertilizer-details" },
  { title: "Insecticide/Pesticide Details", description: "Crop protection products supplied or facilitated through the FPO.", icon: farmers, path: "insecticide-or-pesticide-details" },
  { title: "Machinery/Equipment Details", description: "Farm machinery and equipment owned, rented, or shared by the FPO.", icon: farmers, path: "machinery" },
  { title: "Infrastructure Details", description: "Physical assets such as buildings, processing units, and common facilities.", icon: farmers, path: "infrastructure-form" },
  { title: "Storage/Infrastructure", description: "Warehousing, cold storage, and other storage facilities available with the FPO.", icon: farmers, path: "infrastructure" },
];

export const FpoServices = () => {
  return (
    <div className="min-h-[380px]">
      {/* HEADER */}
      <div className="h-[46px]">
        <p className="text-base font-medium text-text-dark">Fpo Services</p>
      </div>

      {/* CARDS */}
      <div className="mt-[80px] flex items-center justify-center gap-6 flex-wrap">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={`/fpo-services/${card.path}`}
            className="
              w-[348px] h-[96px]
              flex
              rounded-2xl
              shadow-md
              hover:shadow-lg
              transition-shadow duration-200
            "
          >
            {/* ICON SIDE */}
            <div className="w-[96px] flex items-center justify-center rounded-tl-2xl rounded-bl-2xl bg-primary-50">
              <div className="w-[46px] h-[46px]">
                <img src={card.icon} alt={`${card.title} icon`} />
              </div>
            </div>

            {/* TEXT SIDE */}
            <div className="flex-1 p-4 bg-white rounded-tr-2xl rounded-br-2xl">
              <p className="text-[14px] font-medium text-text-dark">{card.title}</p>
              <p className="text-[12px] font-normal text-text-hint">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
