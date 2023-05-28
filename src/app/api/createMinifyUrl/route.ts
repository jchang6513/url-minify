import { NextResponse } from 'next/server';
import { kv } from "@vercel/kv";
import { v4 } from "uuid";

function generateUniqueKey() {
  const uuid = v4();
  const key = uuid.replace(/-/g, '').substring(0, 8);
  return key;
}

function findKeyByValue(obj: Record<string, unknown>, value: string) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === value) {
      return key;
    }
  }
  return null; // Return null if value not found
}

const checkUrlIsExist = async (url: string) => {
  const result = await kv.hgetall('minified-url');
  if (result) {
    const key = findKeyByValue(result, url)
    return key
  }
  return false
}

const createMinifyUrl = async ({ url, key}: { url: string; key: string}) => {
  const result = await kv.hset('minified-url', { [key]: url });

  return result
}

export async function GET() {
  const result = await kv.hgetall('minified-url');

  return NextResponse.json({ status: true, data: result });
}

export async function POST(request: Request) {
  const res = await request.json() || {};
  const { url } = res
  if (url) {
    const existKey = await checkUrlIsExist(url)
    if (!existKey) {
      const key = generateUniqueKey()
      const result = await createMinifyUrl({ url, key })
      if (result) {
        return NextResponse.json({ status: true, data: { key } });
      }
    } else {
      return NextResponse.json({ status: true, data: { key: existKey } });
    }
  }

  return NextResponse.json({ status: false });
}
