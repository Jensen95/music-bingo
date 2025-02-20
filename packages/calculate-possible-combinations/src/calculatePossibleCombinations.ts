// Old implementation
// import { factorial } from '../factorial';
// const calculatePossibleCombinations = (n: number, r: number) => factorial(n) / (factorial(r) * factorial(n - r));

// Tail recursive
// export const calculatePossibleCombinations = (n: number, r: number, result = 1): number => {
// 	if (r === 0) {
// 		return result;
// 	}
// 	return calculatePossibleCombinations(n - 1, r - 1, (result * n) / r);
// };

export const calculatePossibleCombinations = (n: number, r: number): number => {
	let result = 1;
	for (let i = 1; i <= r; i++) {
		result *= n - r + i;
		result /= i;
	}
	return result;
};
