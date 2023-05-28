import { redirect } from 'next/navigation';
import { kv } from "@vercel/kv";

export default async function Profile({ params }: { params: { key: string } }) {
  const result = await kv.hget<string>('minified-url', params.key);

  if (result) {
    redirect(result);
  } else {
    redirect('/')
  }
}
