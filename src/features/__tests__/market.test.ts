import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the shared HTTP client used by Markets
const mockGet = vi.fn();
vi.mock('../../util/http', () => ({
  default: () => ({
    get: mockGet,
  }),
}));

import Markets from '../market';

describe('Markets.fetchMarketTickers', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it('returns the envelope from the API client', async () => {
    const envelope = {
      status: 'success',
      message: 'Successful',
      data: {
        btcusdt: {
          at: 1760383581,
          ticker: {
            buy: '115478.91',
            sell: '115533.03',
            low: '113861.56',
            high: '115605.03',
            open: '114232.22',
            last: '115119.41',
            vol: '0.0899098',
          },
        },
      },
    } as const;
    mockGet.mockResolvedValue({ data: envelope });

    const markets = new Markets('dummy_api_key');
    const res = await markets.fetchMarketTickers();

    expect(res).toEqual(envelope);
    expect(mockGet).toHaveBeenCalledTimes(1);
    // Ensure we are calling the expected endpoint
    expect(mockGet.mock.calls[0][0]).toContain('/markets/tickers');
  });
});
