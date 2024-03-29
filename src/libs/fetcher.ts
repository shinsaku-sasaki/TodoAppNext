export const fetcher = async <T>(path: string): Promise<T> => {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return await res.json();
};
