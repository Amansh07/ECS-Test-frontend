import React from "react";
import RegistrationForm from "./RegistrationForm";
import AddDocuments from "../../components/AddDocuments";

const Review = ({ values, imgConfig, pdfConfig, onFileSelect }) => {
    return (
        <div className="space-y-6">
            <RegistrationForm
                values={values}
                handleChange={() => { }}
                disabled={true}
            />

            <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">
                    Documents
                </h3>
                <AddDocuments
                    imgConfig={imgConfig}
                    pdfConfig={pdfConfig}
                    onFileSelect={onFileSelect}
                    disabled={true}
                />
            </div>
        </div>
    );
};

export default Review;
