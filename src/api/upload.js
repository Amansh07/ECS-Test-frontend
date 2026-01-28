import { uploadApiClientWithAuth, uploadApiClientWithoutAuth,  } from "./clients"; // your custom axios client with auth

// export const uploadBulkDocuments = async ({ fpoId, docTypes, files }) => {
//   const formData = new FormData();

//   // Append multiple files
//   files.forEach((file) => {
//     if (file) formData.append("documents", file);
//   });

//   // Build query params for multiple docTypes
//   const docTypeParams = docTypes.map((type) => `docTypes=${type}`).join("&");

//   // Make the API call; errors will propagate to the caller
//   return await uploadApiClient.post(
//     `/api/v1/document/upload/bulk?fpoId=${fpoId}&${docTypeParams}`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );
// };

export const uploadBulkDocumentsRegistration = async ({ token, docTypes, files }) => {
  const formData = new FormData();

  // Append multiple files
  files.forEach((file) => {
    if (file) formData.append("documents", file);
  });

  // Build query params for multiple docTypes
  const docTypeParams = docTypes.map((type) => `docTypes=${type}`).join("&");

  // Make the API call; errors will propagate to the caller
  return await uploadApiClientWithoutAuth.post(
    `/api/v1/document/upload/registration/bulk?${docTypeParams}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
    }
  );
};

// ---------------- SINGLE DOCUMENT UPLOAD ----------------
export const uploadSingleDocument = async ({ fpoId, docType, file }) => {
  const formData = new FormData();

  if (file) {
    formData.append("document", file); // backend usually expects "document"
  }

  return await uploadApiClientWithAuth.post(
    `/api/v1/document/upload?fpoId=${fpoId}&docType=${docType}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

