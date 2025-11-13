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

import Wallets from '../wallets';

describe('Wallets endpoints', () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockPost.mockReset();
  });

  it('fetchPaymentAddressById hits the expected path', async () => {
    const envelope = { status: 'success' } as const;
    mockGet.mockResolvedValue({ data: envelope });

    const wallets = new Wallets('dummy');
    const res = await wallets.fetchPaymentAddressById('me', 'btc', 'addr_1');

    expect(res).toEqual(envelope);
    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet.mock.calls[0][0]).toContain('/users/me/wallets/btc/addresses/addr_1');
  });

  it('reEnqueGeneratedWalletAddress posts to re_enque endpoint', async () => {
    const envelope = { status: 'success' } as const;
    mockPost.mockResolvedValue({ data: envelope });

    const wallets = new Wallets('dummy');
    const res = await wallets.reEnqueGeneratedWalletAddress('me', 'usdt', 'addr_2');

    expect(res).toEqual(envelope);
    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost.mock.calls[0][0]).toContain('/users/me/wallets/usdt/addresses/addr_2/re_enque');
  });
});
