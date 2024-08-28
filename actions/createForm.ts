"use server"
import axios from "axios";

export const oneInchList = async () => {
  const response = await axios.get("https://api.1inch.dev/token/v1.2/8453", {
    headers: {
      Authorization: "Bearer XvuM4bVHatJL9dIBZuSAiFokoJMvVLmf",
      "Content-Type": "application/json",
      accept: "application/json",
    },
    method: "get",
  });
  console.log(response.status, "1inch")
  return response.data;
};


