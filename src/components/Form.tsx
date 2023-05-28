import { kv } from "@vercel/kv";
import axios from "axios";
import { useCallback, useState } from "react";

const isValidURL = (url: string) => {
  // Regular expression pattern for URL validation
  var pattern = new RegExp(
    "^(https?:\\/\\/)" + // Protocol (http:// or https://)
    "(([a-zA-Z0-9\\.-]+\\.[a-zA-Z]{2,})|" + // Domain name (e.g., example.com)
    "(localhost)|" + // Localhost
    "([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))" + // IP address (e.g., 192.168.0.1)
    "(:[0-9]{1,5})?" + // Port number
    "(\\/\\S*)?$", // Path and query string
    "i"
  );

  // Return true if the URL matches the pattern, false otherwise
  return pattern.test(url);
}

const checkUrlIsExist = async (url: string) => {
  const result = await kv.hgetall('minified-url');
  if (result) {
    const urls = Object.values(result)
    return urls.includes(url)
  }
  return false
}

export const Form = () => {
  const [url, setUrl] = useState('')
  const [hashLink, setHashLink] = useState('')

  const submit = useCallback(async () => {
    const { data: result } = await axios.post('/api/createMinifyUrl/', { url })
    setHashLink(result?.data?.key)
  }, [url])

  return (
    <>
      <input
        className="
          placeholder:text-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1
          block bg-white border border-slate-300 rounded-md
          p-3 shadow-sm text-xl w-96
        "
        placeholder="Input URL"
        type="text"
        name="url"
        value={url}
        onChange={(e) => setUrl(e.currentTarget.value)}
      />
      <button
        className="rounded-md bg-sky-500 py-2 px-5 mt-2 text-white"
        disabled={!isValidURL(url)}
        onClick={submit}
      >
        Submit
      </button>
      {hashLink && (
        <>{window.location.origin}/{hashLink}</>
      )}
    </>
  );
}
