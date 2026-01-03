import apiClient from "./apiClient";

/**
 * Add a new board member
 * @param {Object} payload - Form data
 */
export const addBoardMember = async (payload) => {
  try {
    console.log("inside board members");
    const response = await apiClient.post("/board-members", payload);
    return response;
  } catch (error) {
    console.error("Error adding board member:", error);
    throw error;
  }
};

/**
 * Fetch all board members
 */
export const getBoardMembers = async () => {
  try {
    const response = await apiClient.get("/board-members");
    return response;
  } catch (error) {
    console.error("Error fetching board members:", error);
    throw error;
  }
};

/**
 * Update a board member
 * @param {string} id - Board member ID
 * @param {Object} payload - Updated data
 */
export const updateBoardMember = async (id, payload) => {
  try {
    const response = await apiClient.put(`/board-members/${id}`, payload);
    return response;
  } catch (error) {
    console.error("Error updating board member:", error);
    throw error;
  }
};

/**
 * Delete a board member
 * @param {string} id - Board member ID
 */
export const deleteBoardMember = async (id) => {
  try {
    const response = await apiClient.delete(`/board-members/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting board member:", error);
    throw error;
  }
};
