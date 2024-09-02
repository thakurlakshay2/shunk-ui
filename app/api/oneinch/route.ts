import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
    const response = await axios.get("https://api.1inch.dev/token/v1.2/8453", {
        headers: {
          Authorization: "Bearer XvuM4bVHatJL9dIBZuSAiFokoJMvVLmf",
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "get",
      });
  return NextResponse.json(response.data);
}
