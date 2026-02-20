import { Chute } from "../app/types"


const BASE_URL = import.meta.env.VITE_API_URL;

/** Get all available items. Used to show all data in the dashboard */
export const getAllChutes = async (): Promise<Chute[]> => { 

 const response = await fetch(`${BASE_URL}/item`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch status list");
  }

  return response.json();
};

/** Get specific item based on Barcode*/
export const getChuteStatusByBarcode = async (
  barcode: string
): Promise<Chute[]> => {

  const response = await fetch(`${BASE_URL}/status/getByBarcode/${barcode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chute status");
  }

  return response.json();
};


/** Get specific item based on ID*/
export const getChuteStatusById= async (
  id: string
): Promise<Chute[]> => {

  const response = await fetch(`${BASE_URL}/status/getById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chute status");
  }

  return response.json();
};
