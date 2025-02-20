import { it, describe, expect } from 'vitest';

import { generateHash } from './generateHash';

describe('generateHash', () => {
	it('should return the same hash for the same path', () => {
		expect(generateHash('test')).toEqual(generateHash('test'));
	});

	it('should return a different hash for a different path', () => {
		expect(generateHash('test')).not.toEqual(generateHash('test2'));
	});

	it('should return a different hash for a different path', () => {
		expect(generateHash('test')).not.toEqual(generateHash('test3'));
	});
});
