import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const name = (formData.get('name') as string) || 'untitled';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const jwt = process.env.PINATA_JWT;
    if (!jwt) {
      return NextResponse.json(
        { error: 'PINATA_JWT not configured on server' },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const pinataForm = new FormData();
    pinataForm.append('file', buffer, {
      filename: file.name,
      contentType: file.type,
    });

    // Optional metadata
    const metadata = JSON.stringify({
      name,
      keyvalues: { project: 'lrrecords-web3-musicnft' },
    });
    pinataForm.append('pinataMetadata', metadata);

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      pinataForm,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          ...pinataForm.getHeaders(),
        },
        maxBodyLength: Infinity,
      }
    );

    const cid = response.data.IpfsHash;
    return NextResponse.json({
      success: true,
      cid,
      uri: `ipfs://${cid}`,
      gateway: `${process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'https://gateway.pinata.cloud/ipfs/'}${cid}`,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
