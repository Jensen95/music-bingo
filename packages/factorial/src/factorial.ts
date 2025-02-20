// Old implementation
// export const factorial = (number: number, result = 1): number => {
// 	if (number === 0 || number === 1) {
// 		return result;
// 	}
// 	return factorial(number - 1, result * number);
// };

export const factorial = (number: number): number => {
	if (number === 0 || number === 1) {
		return 1;
	}
	let result = 1;
	for (let i = 2; i <= number; i++) {
		result *= i;
	}
	return result;
};
