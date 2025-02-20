import { it, describe, expect } from 'vitest';
import { factorial } from './factorial';

describe('factorial', () => {
	it('should return 1 for 0', () => {
		expect(factorial(0)).toEqual(1);
	});

	it('should return 1 for 1', () => {
		expect(factorial(1)).toEqual(1);
	});

	it('should return 2 for 2', () => {
		expect(factorial(2)).toEqual(2);
	});

	it('should return 6 for 3', () => {
		expect(factorial(3)).toEqual(6);
	});

	it('should return 24 for 4', () => {
		expect(factorial(4)).toEqual(24);
	});

	it('should return 120 for 5', () => {
		expect(factorial(5)).toEqual(120);
	});
});
