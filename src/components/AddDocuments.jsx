import React from "react";
import UploadDocument from "./UploadDocument";

const AddDocuments = ({ imgConfig, pdfConfig, onFileSelect }) => {
    return (
        <div className="space-y-6">
            <UploadDocument
                config={imgConfig}
                onFileSelect={(file) => onFileSelect("image", file)}
            />
            <UploadDocument
                config={pdfConfig}
                onFileSelect={(file) => onFileSelect("pdf", file)}
            />
        </div>
    );
};

export default AddDocuments;
