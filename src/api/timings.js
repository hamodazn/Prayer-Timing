import axios from "axios";

export const getTimingsByCity = async (city, country) => {
  try {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=${country}&city=${city}&method=3`
    );
    return response.data.data.timings;
  } catch (error) {
    console.error(`Error fetching timings for ${city}, ${country}:`, error);
    throw error;
  }
};
