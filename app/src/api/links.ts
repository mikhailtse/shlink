import axios from 'axios';

export const apiUrl = 'http://localhost:3001'

export interface IGetLinkResponse {
  id: string;
  link: string;
  createdAt: string;
}

export interface IStatsResponse {
  id: string;
  link: string;
  createdAt: string;
  clicks: Array<{
    date: string;
    count: number;
  }>;
}

export async function shorten(link: string): Promise<string> {
  const response = await axios.post<string>(`${apiUrl}/api/shorten`, { link });
  return response.data;
}

export async function getStats(id: string, months?: string): Promise<IStatsResponse | undefined> {
  const url = months
    ? `${apiUrl}/api/stats/${id}/${months}`
    : `${apiUrl}/api/stats/${id}`;

  const response = await axios.get<IStatsResponse>(url);
  return response.data;
}
