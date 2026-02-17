export type SearchResult = {
  title: string;
  snippet: string;
  pageid: number;
  timestamp?: string;
  wordcount?: number;
};

export async function searchWikipedia(query: string): Promise<SearchResult[]> {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=12&srprop=snippet|timestamp|wordcount`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Wikipedia API request failed");

  const data = await res.json();
  return data.query.search;
}
