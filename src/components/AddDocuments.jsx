import React from "react";
import UploadDocument from "./UploadDocument";

const AddDocuments = ({ imgConfig, pdfConfig, onFileSelect, disabled = false }) => {
    return (
        <div className="space-y-6">
            <UploadDocument
                config={imgConfig}
                onFileSelect={(file) => onFileSelect("image", file)}
                disabled={disabled}
            />
            <UploadDocument
                config={pdfConfig}
                onFileSelect={(file) => onFileSelect("pdf", file)}
                disabled={disabled}
            />
        </div>
    );
};

export default AddDocuments;
