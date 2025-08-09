// app/api/upload-json/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const jsonData = await request.json();

    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Pinata API Error:', errorText);
      throw new Error(`Pinata JSON upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json({
      ipfsHash: result.IpfsHash,
    });
  } catch (error) {
    console.error("Error uploading JSON to Pinata:", error);
    return NextResponse.json(
      { error: 'Failed to upload JSON to IPFS' },
      { status: 500 }
    );
  }
}