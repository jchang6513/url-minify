import { CREATE_MINIFY_URL_PATH } from "@/constants";
import { isValidURL } from "@/utils/isValidUrl";
import { Card, TextField, Tooltip } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { LoadingButton } from '@mui/lab';
import axios from "axios";
import { useCallback, useState, useEffect } from "react";

export const Form = () => {
  const [url, setUrl] = useState('')
  const [hashLink, setHashLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const submit = useCallback(async () => {
    setLoading(true)
    const { data: result } = await axios.post(CREATE_MINIFY_URL_PATH, { url })
    setHashLink(result?.data?.key)
    setLoading(false)
  }, [url])

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  return (
    <Card
      className="max-w-lg p-8 bg-cyan-100 drop-shadow-2xl border-none"
      variant="outlined"
      elevation={3}
    >
      <div className="flex relative">
        <TextField
          label="URL"
          maxRows={1}
          sx={{ width: '500px' }}
          inputProps={{ sx: { pr: '140px' } }}
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
        />
        <LoadingButton
          variant="contained"
          color="primary"
          type="submit"
          loading={loading}
          sx={{
            width: 120,
            position: 'absolute',
            right: 10,
            top: 10,
            '&:not(.Mui-disabled)': {
              backgroundColor: '#1976d2 !important',
            },
          }}
          disabled={!isValidURL(url)}
          onClick={submit}
        >
          Submit
        </LoadingButton>
      </div>
      {hashLink && (
        <div className="text-2xl mt-6 flex justify-between items-center">
          {window.location.origin}/{hashLink}
          <Tooltip title="URL Copied" open={copied}>
            <ContentCopyIcon
              className="cursor-pointer mr-2"
              onClick={() => {
                setCopied(true)
                navigator.clipboard.writeText(`${window.location.origin}/${hashLink}`);
              }}
            />
          </Tooltip>
        </div>
      )}
    </Card>
  );
}
