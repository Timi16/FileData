// File: /app/api/upload-to-pinata/route.ts (App Router)
// OR /pages/api/upload-to-pinata.ts (Pages Router)

import { NextRequest, NextResponse } from 'next/server';

// App Router version
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Create FormData for Pinata
    const pinataFormData = new FormData();
    pinataFormData.append("file", file);

    // Optional metadata
    const metadata = JSON.stringify({ name: file.name });
    pinataFormData.append("pinataMetadata", metadata);

    // Optional options
    const options = JSON.stringify({ cidVersion: 1 });
    pinataFormData.append("pinataOptions", options);

    // Upload to Pinata
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.JWT || ""}`, // Use your JWT token here
      },
      body: pinataFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Pinata API Error:', errorText);
      throw new Error(`Pinata upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Upload successful:', result);

    return NextResponse.json({
      ipfsHash: result.IpfsHash,
      pinSize: result.PinSize,
      timestamp: result.Timestamp
    });

  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    return NextResponse.json({
      error: 'Failed to upload file to IPFS'
    }, { status: 500 });
  }
}
