import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mocks
const mockGet = vi.fn();
const mockPost = vi.fn();
vi.mock('../../util/http', () => ({
  default: () => ({
    get: mockGet,
    post: mockPost,
  }),
}));

import Orders from '../orders';

describe('Orders endpoints', () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockPost.mockReset();
  });

  it('fetchOrders builds query params correctly', async () => {
    const envelope = { status: 'success' } as const;
    mockGet.mockResolvedValue({ data: envelope });

    const orders = new Orders('dummy');
    const res = await orders.fetchOrders('me', {
      market: 'btcusdt',
      state: 'done',
      order_by: 'desc',
      page: 2,
      per_page: 50,
    });

    expect(res).toEqual(envelope);
    expect(mockGet).toHaveBeenCalledTimes(1);
    const url = mockGet.mock.calls[0][0] as string;
    expect(url).toContain('/users/me/orders');
    expect(url).toContain('market=btcusdt');
    expect(url).toContain('state=done');
    expect(url).toContain('order_by=desc');
    expect(url).toContain('page=2');
    expect(url).toContain('per_page=50');
  });

  it('fetchOrder hits the expected path', async () => {
    const envelope = { status: 'success' } as const;
    mockGet.mockResolvedValue({ data: envelope });

    const orders = new Orders('dummy');
    const res = await orders.fetchOrder('me', 'order_123');

    expect(res).toEqual(envelope);
    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet.mock.calls[0][0]).toContain('/users/me/orders/order_123');
  });

  it('cancelOrder posts to cancel endpoint', async () => {
    const envelope = { status: 'success' } as const;
    mockPost.mockResolvedValue({ data: envelope });

    const orders = new Orders('dummy');
    const res = await orders.cancelOrder('me', 'order_123');

    expect(res).toEqual(envelope);
    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost.mock.calls[0][0]).toContain('/users/me/orders/order_123/cancel');
  });
});
