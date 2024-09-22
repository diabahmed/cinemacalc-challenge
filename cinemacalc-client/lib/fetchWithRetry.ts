export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = 3,
  delay: number = 1000
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      }
      throw new Error(`Request failed with status ${response.status}`);
    } catch (error) {
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries reached");
}
