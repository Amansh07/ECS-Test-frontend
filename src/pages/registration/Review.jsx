import React from "react";

const Review = ({ values }) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <span className="font-semibold text-gray-700">Implementing Agency:</span>{" "}
                    <span className="text-gray-600">{values.implementingAgency || "N/A"}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Block:</span>{" "}
                    <span className="text-gray-600">{values.block || "N/A"}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Communication Address:</span>{" "}
                    <span className="text-gray-600">{values.communicationAddress || "N/A"}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Pincode:</span>{" "}
                    <span className="text-gray-600">{values.pincode || "N/A"}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Total Shareholders:</span>{" "}
                    <span className="text-gray-600">{values.totalShareholders || "N/A"}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Female Shareholders:</span>{" "}
                    <span className="text-gray-600">{values.femaleShareholders || "N/A"}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Male Shareholders:</span>{" "}
                    <span className="text-gray-600">{values.maleShareholders || "N/A"}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Female Percentage:</span>{" "}
                    <span className="text-gray-600">{values.femalePercentage || "N/A"}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Total Land:</span>{" "}
                    <span className="text-gray-600">{values.totalLand || "N/A"}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Secondary Email:</span>{" "}
                    <span className="text-gray-600">{values.secondaryEmail || "N/A"}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Secondary Contact:</span>{" "}
                    <span className="text-gray-600">{values.secondaryContact || "N/A"}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Username:</span>{" "}
                    <span className="text-gray-600">{values.username || "N/A"}</span>
                </div>
            </div>

            {/* Document Status */}
            <div className="mt-4 pt-4 border-t">
                <h3 className="font-semibold text-gray-800 mb-2">Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <span className="font-semibold text-gray-700">Banner Image:</span>{" "}
                        <span className="text-gray-600">{values.bannerImage ? values.bannerImage.name : "Not Uploaded"}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">Shareholder Sheet:</span>{" "}
                        <span className="text-gray-600">{values.shareholderSheet ? values.shareholderSheet.name : "Not Uploaded"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
