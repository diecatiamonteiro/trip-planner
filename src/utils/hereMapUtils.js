import axios from "axios";

const API_KEY = import.meta.env.VITE_HERE_API_KEY;

// Initialize the platform
const platform = new H.service.Platform({
  apikey: API_KEY,
});

// Get default layers
export const defaultLayers = platform.createDefaultLayers();

// For city/destination search on homepage
export const getCitySuggestions = async (query) => {
  try {
    const response = await axios.get(
      `https://autocomplete.search.hereapi.com/v1/autocomplete`,
      {
        params: {
          q: query,
          apikey: API_KEY,
          limit: 5,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("City suggestions error:", error);
    return [];
  }
};

// For local attractions/activities search
export const getAutocompleteSuggestions = async (query, mapCenter) => {
  try {
    // Use default coordinates if mapCenter is not provided
    const defaultCoords = { lat: 52.52, lng: 13.405 };
    const coords = mapCenter || defaultCoords;

    const response = await axios.get(
      `https://autocomplete.search.hereapi.com/v1/discover`,
      {
        params: {
          q: query,
          apikey: API_KEY,
          limit: 5,
          at: `${coords.lat},${coords.lng}`,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Autocomplete error:", error);
    return [];
  }
};

export const getPlaceDetails = async (placeId) => {
  try {
    const response = await axios.get(
      `https://lookup.search.hereapi.com/v1/lookup`,
      {
        params: {
          id: placeId,
          apikey: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Place details error:", error);
    return null;
  }
};
