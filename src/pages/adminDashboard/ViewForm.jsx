import React from 'react';
import { AccordionGroup } from "../../components/Accordion";
import { TextField, SelectField, RadioGroup, TextArea } from "../../components/FormFields";
import Table from "../../components/Table";

const ViewForm = ({ data = {}, disabled = true }) => {

    // Financial Table Columns
    const financialColumns = ["Financial Year", "Turnover", "Profit/Loss", "Financial Range", "Audit Applicability", "Audit Status", "Audit Type"];

    const accordionItems = [
        // {
        //     id: "basic-details",
        //     title: "Basic Details",
        //     isInitiallyOpen: true,
        //     content: (
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //             <RadioGroup
        //                 label="FPO Registered under"
        //                 name="registeredUnder"
        //                 value={data?.registeredUnder}
        //                 options={[
        //                     { value: 6, label: "Company Act" },
        //                     { value: 7, label: "Co-operative Society Act" },
        //                 ]}
        //                 disabled={disabled}
        //             />
        //         </div>
        //     )
        // },
        {
            id: "primary-details",
            title: data?.registeredUnder === 7 ? "Co-operative Society Details" : "Company Details",
            isInitiallyOpen: false,
            content: (
                data?.registeredUnder === 7 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <RadioGroup
                                label="FPO Registered under"
                                name="registeredUnder"
                                value={data?.registeredUnder}
                                options={[
                                    { value: 6, label: "Company Act" },
                                    { value: 7, label: "Co-operative Society Act" },
                                ]}
                                disabled={disabled}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField label="Registration No." value={data?.societyDetails?.regdNo} disabled={disabled} />
                            <TextField label="Name of the Co-operative Society" value={data?.societyDetails?.coopsocietyName} disabled={disabled} />
                            <TextField label="Date of Registration" value={data?.societyDetails?.doreg} disabled={disabled} />
                            <TextField label="Status" value={data?.societyDetails?.companyStatus} disabled={disabled} />
                            <TextField label="Name of ROA" value={data?.societyDetails?.roaName} disabled={disabled} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <RadioGroup
                                label="FPO Registered under"
                                name="registeredUnder"
                                value={data?.registeredUnder}
                                options={[
                                    { value: 6, label: "Company Act" },
                                    { value: 7, label: "Co-operative Society Act" },
                                ]}
                                disabled={disabled}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField label="CIN / LLPIN / FCRN" value={data?.companyDetails?.cin} disabled={disabled} />
                            <TextField label="Company Name" value={data?.companyDetails?.companyName} disabled={disabled} />
                            <TextField label="Date of Incorporation" value={data?.companyDetails?.incorporationDate} disabled={disabled} />
                            <TextField label="Company Status" value={data?.companyDetails?.companyStatus} disabled={disabled} />
                            <TextField label="RoC Name" value={data?.companyDetails?.rocName} disabled={disabled} />
                        </div>
                    </>
                )
            )
        },
        {
            id: "location-details",
            title: "FPO Address & Communication",
            isInitiallyOpen: false,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            label="Implementing Agency/Associated With"
                            name="agency"
                            value={data?.agency}
                            disabled={disabled}
                        >
                            <option value={data?.agency}>{data?.agencyName || "N/A"}</option>
                        </SelectField>
                        <SelectField label="District" value={data?.districtId} disabled={disabled}>
                            <option value={data?.districtId}>{data?.districtName || "N/A"}</option>
                        </SelectField>
                        <SelectField label="Block" value={data?.blockId} disabled={disabled}>
                            <option value={data?.blockId}>{data?.blockName || "N/A"}</option>
                        </SelectField>
                    </div>
                    <TextArea label="Communication Address" value={data?.communicationAddress} disabled={disabled} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField label="Pincode" value={data?.pincode} disabled={disabled} />
                    </div>
                </div>
            )
        },
        {
            id: "fpo-statistics",
            title: "FPO Statistics",
            isInitiallyOpen: false,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField label="Total Number of Member Shareholders" value={data?.totalFarmers} disabled={disabled} />
                    <TextField label="Number of Female Shareholders" value={data?.femaleFarmers} disabled={disabled} />
                    <TextField label="Percentage of Female Shareholders" value={data?.percentageOfFemaleFarmers} disabled={disabled} />
                    <TextField label="Number of Male Shareholders" value={data?.maleFarmers} disabled={disabled} />
                    <TextField label="Total Land Owned by FPO (in Acres)" value={data?.landOwnedByFpo} disabled={disabled} />
                </div>
            )
        },
        {
            id: "account-details",
            title: "Account Details",
            isInitiallyOpen: false,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <TextField label="FPO Primary Email" value={data?.email} disabled={disabled} />
                    <TextField label="FPO Primary Mobile/Contact Number" value={data?.contactNumber} disabled={disabled} />
                    <TextField label="Secondary FPO Email" value={data?.secondaryEmail} disabled={disabled} />
                    <TextField label="Secondary FPO Contact Number" value={data?.secondaryMobile} disabled={disabled} />
                    {/* <TextField label="Username" value={data?.username} disabled={disabled} /> */}
                    <TextField label="FPO PAN" value={data?.fpoPanNo} disabled={disabled} />
                </div>
            )
        },
        {
            id: "financial-details",
            title: "Financial Details",
            isInitiallyOpen: false,
            content: (
                <div className="mt-4">
                    <Table
                        columns={financialColumns}
                        data={data?.financialDetails?.map(row => ({
                            "Financial Year": row.financialYearName || row.financialYearId || "N/A",
                            "Turnover": row.turnoverAmount || "N/A",
                            "Profit/Loss": row.profitLossAmount || "N/A",
                            "Financial Range": row.financialRangeName || row.financialRangeId || "N/A",
                            "Audit Applicability": row.auditApplicable ? "Yes" : "No",
                            "Audit Status": row.auditStatus ? "Done" : "Not Done",
                            "Audit Type": row.auditTypeName || "N/A"
                        })) || []}
                    />
                </div>
            )
        }
    ];

    return (
        <div className="view-form">
            <AccordionGroup items={accordionItems} />
        </div>
    );
};

export default ViewForm;