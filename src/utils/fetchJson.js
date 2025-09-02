import { TIMEOUT, ERROR } from "../constants";

export const fetchJson = async (url) => {
  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), TIMEOUT);
  try {
    const response = await fetch(url, { signal: abortController.signal });
    if (!response.ok) throw new Error(ERROR.NETWORK);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
};
