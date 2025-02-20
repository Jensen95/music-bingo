import { it, describe, expect } from 'vitest';

import { calculatePossibleCombinations } from './calculatePossibleCombinations';

describe('calculateCombinations', () => {
	it('should return 1 for 0 choose 0', () => {
		expect(calculatePossibleCombinations(0, 0)).toEqual(1);
	});

	it('should return 1 for 1 choose 0', () => {
		expect(calculatePossibleCombinations(1, 0)).toEqual(1);
	});

	it('should return 1 for 1 choose 1', () => {
		expect(calculatePossibleCombinations(1, 1)).toEqual(1);
	});

	it('should return 2 for 2 choose 1', () => {
		expect(calculatePossibleCombinations(2, 1)).toEqual(2);
	});

	it('should return 6 for 4 choose 2', () => {
		expect(calculatePossibleCombinations(4, 2)).toEqual(6);
	});

	it('should return 10 for 5 choose 2', () => {
		expect(calculatePossibleCombinations(5, 2)).toEqual(10);
	});

	it('should return 20 for 6 choose 3', () => {
		expect(calculatePossibleCombinations(6, 3)).toEqual(20);
	});

	it('should return 70 for 8 choose 4', () => {
		expect(calculatePossibleCombinations(8, 4)).toEqual(70);
	});
});
