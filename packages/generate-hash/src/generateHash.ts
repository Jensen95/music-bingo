const letters: string[] = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const generateHash = (path: string, hashLength = 3): string => {
	const hash: Int32Array = new Int32Array(hashLength);
	let result: string = '';
	for (let i = 0; i < path.length; i++) {
		hash[i % hashLength] = hash[i % hashLength] ^ path.charCodeAt(i);
	}
	for (let i = 0; i < hashLength; i++) {
		hash[i] = letters[hash[i] % letters.length].charCodeAt(0);
	}

	for (let i = 0; i < hash.length; i++) {
		result = result + String.fromCharCode(hash[i]);
	}

	return result; //?
};

// calculate possible hashes for generateHash
const possibleHashes = (hashLength: number): number => {
	return Math.pow(letters.length, hashLength);
};
// check if it is possible to generate a unique hash with generateHash
export const isPossibleToGenerateUniqueHash = (hashLength: number, totalPaths: number): boolean => {
	return possibleHashes(hashLength) >= totalPaths;
};
// calculate total possible paths for generateHash

// calculate probability of getting a collision with generateHash

export const calculateCollisionProbability = (hashLength: number, totalPaths: number): number => {
	const probability =
		1 - Math.pow(1 - 1 / Math.pow(letters.length, hashLength), (totalPaths * (totalPaths - 1)) / 2);
	return probability;
};
