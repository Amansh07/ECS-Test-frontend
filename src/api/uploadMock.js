export const uploadDocument = async ({ file, fpoId, docType, createdBy }) => {
  console.log("Mock uploadDocument called:", file, fpoId, docType, createdBy);

  if (!file) {
    return { status: 400, data: { success: false, message: "No file uploaded" } };
  }

  return {
    status: 200,
    data: {
      success: true,
      message: "Document uploaded successfully (mock)",
      documentId: "DOC-MOCK-" + Math.floor(Math.random() * 10000),
      docUuid: "UUID-MOCK-" + Math.floor(Math.random() * 10000),
      filePath: "/mock/path/" + file.name,
      fileName: file.name,
      originalFileName: file.name,
    },
  };
};

export const uploadDocumentsBulk = async ({ files, fpoIds, docTypes, createdBy }) => {
  console.log("Mock uploadDocumentsBulk called:", files, fpoIds, docTypes);

  const results = files.map((file, index) => ({
    documentId: "DOCBULK-MOCK-" + index,
    docUuid: "UUIDBULK-MOCK-" + index,
    fileName: file.name,
    originalFileName: file.name,
    filePath: "/mock/path/" + file.name,
    fpoId: fpoIds[index] || 1,
    docType: docTypes[index] || 1,
    success: true,
    errorMessage: null,
  }));

  return {
    status: 200,
    data: {
      success: true,
      message: "Bulk upload successful (mock)",
      totalDocuments: files.length,
      successfulUploads: files.length,
      failedUploads: 0,
      results,
    },
  };
};
