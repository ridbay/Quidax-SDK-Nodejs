import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mocks
const mockGet = vi.fn();
const mockPost = vi.fn();
const mockPut = vi.fn();
vi.mock('../../util/http', () => ({
  default: () => ({
    get: mockGet,
    post: mockPost,
    put: mockPut,
  }),
}));

import Beneficiaries from '../beneficiaries';

describe('Beneficiaries endpoints', () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockPost.mockReset();
    mockPut.mockReset();
  });

  it('fetchBeneficiaries builds pagination params', async () => {
    const envelope = { status: 'success' } as const;
    mockGet.mockResolvedValue({ data: envelope });

    const svc = new Beneficiaries('dummy');
    const res = await svc.fetchBeneficiaries('me', { page: 3, per_page: 25 });

    expect(res).toEqual(envelope);
    expect(mockGet).toHaveBeenCalledTimes(1);
    const url = mockGet.mock.calls[0][0] as string;
    expect(url).toContain('/users/me/beneficiaries');
    expect(url).toContain('page=3');
    expect(url).toContain('per_page=25');
  });

  it('createBeneficiary posts payload to expected path', async () => {
    const envelope = { status: 'success' } as const;
    mockPost.mockResolvedValue({ data: envelope });

    const svc = new Beneficiaries('dummy');
    const payload = { bank_code: '001', account_number: '1234567890', name: 'John Doe' };
    const res = await svc.createBeneficiary('me', payload);

    expect(res).toEqual(envelope);
    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost.mock.calls[0][0]).toContain('/users/me/beneficiaries');
    expect(mockPost.mock.calls[0][1]).toEqual(payload);
  });

  it('fetchBeneficiary hits expected path', async () => {
    const envelope = { status: 'success' } as const;
    mockGet.mockResolvedValue({ data: envelope });

    const svc = new Beneficiaries('dummy');
    const res = await svc.fetchBeneficiary('me', 'bene_1');

    expect(res).toEqual(envelope);
    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet.mock.calls[0][0]).toContain('/users/me/beneficiaries/bene_1');
  });

  it('editBeneficiary puts payload to expected path', async () => {
    const envelope = { status: 'success' } as const;
    mockPut.mockResolvedValue({ data: envelope });

    const svc = new Beneficiaries('dummy');
    const payload = { name: 'Jane Doe' };
    const res = await svc.editBeneficiary('me', 'bene_1', payload);

    expect(res).toEqual(envelope);
    expect(mockPut).toHaveBeenCalledTimes(1);
    expect(mockPut.mock.calls[0][0]).toContain('/users/me/beneficiaries/bene_1');
    expect(mockPut.mock.calls[0][1]).toEqual(payload);
  });
});
