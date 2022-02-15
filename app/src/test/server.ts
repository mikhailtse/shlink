import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { apiUrl, IGetLinkResponse, IStatsResponse } from '../api/links';

export const mockLinkId = '24rAmteYa';

export const mockGetLinkResponse: IGetLinkResponse = {
  createdAt: '2022-02-16T04:46:21.402Z',
  id: mockLinkId,
  link: 'https://google.com',
};

export const mockStatsResponse: IStatsResponse = {
  ...mockGetLinkResponse,
  clicks: [{ date:'2022-02-16T18:00:00.000Z', count: 1 }],
}

export const server = setupServer(
  rest.get(`${apiUrl}/api/${mockLinkId}`, (req, res, ctx) => res(ctx.json(mockGetLinkResponse))),
  rest.get(`${apiUrl}/api/stats/${mockLinkId}/1`, (req, res, ctx) => res(ctx.json(mockStatsResponse))),
  rest.post(`${apiUrl}/api/shorten`, (req, res, ctx) => res(ctx.json(mockLinkId))),
);

export function mockApi() {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
