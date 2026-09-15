const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export async function shortenUrl(url: string, customId?: string) {
  const response = await fetch(`${API_URL}/url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, customId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Something went wrong");
  }

  return data;
}

export async function getAnalytics(shortId: string) {
  const response = await fetch(`${API_URL}/url/analytics/${shortId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to fetch analytics");
  }

  return data;
}