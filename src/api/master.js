import axios from "axios";

const BASE_URL = "http://10.0.1.6:8082";

export const getDistricts = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/master/districts`
    );

    // Your actual array is inside response.data.data
    return response.data.data;

  } catch (error) {
    console.error("Error fetching districts:", error);
    throw error;
  }
};
