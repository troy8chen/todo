import { generateId } from '@/utils/generateId'

describe('generateId', () => {
  it('generates a string of expected length', () => {
    const id = generateId();
    expect(id.length).toBe(7);
  });

  it('generates alphanumeric strings', () => {
    const id = generateId();
    expect(id).toMatch(/^[a-z0-9]+$/);
  });

  it('generates unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('generates multiple unique IDs', () => {
    const ids = new Set();
    // Generate 100 IDs and check they're all unique
    for (let i = 0; i < 100; i++) {
      ids.add(generateId());
    }
    expect(ids.size).toBe(100);
  });

  it('generates valid base36 strings', () => {
    const id = generateId();
    // Should only contain characters valid in base36 (0-9, a-z)
    expect(id).not.toMatch(/[^0-9a-z]/);
  });
});