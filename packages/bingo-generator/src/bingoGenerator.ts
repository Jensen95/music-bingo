

import { calculatePossibleCombinations } from '@jensen95/calculate-possible-combinations';

interface Song {
	song: string;
	artist: string;
	album?: string;
}

export interface MusicBingoItem {
	songList: Song[];
	rawNumbers: (number | string)[];
	hash: string;
}

type ShuffleType = 'dumShuffle' | 'fisherYatesShuffle' | 'durstenfeldShuffle';

export class BingoGenerator {
	#totalCombination = 0;
	private songMap = new Map<number, Song>();
	private b: MusicBingoItem[] = [];
	/**
	 *
	 */
	constructor(
		private boards: number,
		songList: Song[],
		blanks = 0,
		shuffleType: ShuffleType = 'durstenfeldShuffle',
		private rows = 5,
		private columns = 5
	) {
		// super();
		const diversityMap = new Map<number, number>();

		const numberArray = Array.from({ length: songList.length }, (_, index) => index + 1);

		const boardSize = rows * columns;

		this.#totalCombination = calculatePossibleCombinations(songList.length, boardSize);
		const test = calculatePossibleCombinations(songList.length / 5, boardSize / 5); //?
		const blanksNeeded = Math.max(blanks, 0, rows * columns - songList.length);
		songList.forEach((song, songIndex) => {
			const songNumber = songIndex + 1;
			this.songMap.set(songNumber, { song: song.song, artist: song.artist });
			diversityMap.set(songNumber, 0);
		});

		// use the diversity map to generate the most even plates

		const uniqueArrays = new Map<string, (number | string)[]>();
		while (uniqueArrays.size < Math.min(boards * 20, this.#totalCombination)) {
			// loop through diversityMap and pick the lowest 5 numbers
			// const te = new Set<number>();
			// const countMap = new Map<number, Set<number>>();
			// for (const key of diversityMap.keys()) {
			// 	// key;
			// 	// console.log('🚀 ~ BingoGenerator ~ key:', key);

			// 	// const number = parseInt(key);
			// 	const count = diversityMap.get(key);
			// 	setOrAppend(countMap, count, key);
			// 	te.add(count!);
			// }
			// const test = Array.from(te).sort((a, b) => a - b);
			// test; //?
			// countMap; //?

			const combinationResult = this.#createCombination(numberArray, blanksNeeded, shuffleType);
			if (!uniqueArrays.has(combinationResult.hash)) {
				uniqueArrays.set(combinationResult.hash, combinationResult.item);
				combinationResult.numbersInItem.forEach((number) => setOrAddInMap(diversityMap, number));
			}
		}
		uniqueArrays.forEach((value, key) => {
			if (this.b.length < boards) {
				// Type doesn't include blanks ' '
				const songList = value.map((number) => {
					if (typeof number === 'number') {
						return this.songMap.get(number)!;
					}
					return { song: '', artist: '' };
				});
				this.b.push({ songList, rawNumbers: value, hash: key }); //?
			}
		});
		// uniqueArrays.size; //?
		// diversityMap; //?

		/*
		// Create the bingo boards
		Shuffle the songList
		While the songList is not empty
		Generate a random number row add to a set
			- if the number is in the set, discard the number and generate a new row
		
		Calculate the number of unique combinations of rows / songs combinations
		- if possible, generate unique combinations for each row
			- each row should have a hash, maybe in hex?


		when splitting the songlist into row, write the hash of all songs possible in row.
		- this way it's possible to create a hash when songs are picked and makes it easier to check for a bingo

		https://www.calculatorsoup.com/calculators/discretemathematics/combinations.php
		*/
	}

	#createCombination = (
		numberList: number[],
		blanks = 0,
		shuffleType: ShuffleType = 'dumShuffle'
	) => {
		const result: number[] = [];
		let list = [...numberList];
		while (result.length < this.rows * this.columns - blanks) {
			list = shuffles[shuffleType](list);
			const randomNumber = list.pop();

			if (!randomNumber) {
				break;
			}
			if (!result.includes(randomNumber)) {
				result.push(randomNumber);
			}
		}
		const item = result.concat(new Array(blanks).fill(' ')).sort(() => Math.random() - 0.5);
		// return item and the hash of the item
		return {
			item,
			hash: result.sort((a, b) => a - b).join('|'),
			numbersInItem: result
		};
	};

	createBiasedCombination = (numberList: number[], prePickedNumbers: number[], blanks = 0) => {
		const result: number[] = [];
		const list = numberList.filter((n) => !prePickedNumbers.includes(n));
		while (result.length < this.rows * this.columns - blanks) {
			list.sort(() => Math.random() - 0.5);
			const randomNumber = list.pop();
			if (!randomNumber) {
				break;
			}
			if (!result.includes(randomNumber)) {
				result.push(randomNumber);
			}
		}
		const item = result.concat(new Array(blanks).fill(' ')).sort(() => Math.random() - 0.5);
		// return item and the hash of the item
		return {
			item,
			hash: result.sort((a, b) => a - b).join('|'),
			numbersInItem: result
		};
	};

	get bingoBoards() {
		return this.b;
	}

	get totalCombinations() {
		return this.#totalCombination;
	}
}

const setOrAddInMap = <K>(map: Map<K, number>, key: K) => {
	const diversityNumber = map.get(key);
	if (diversityNumber != null) {
		map.set(key, diversityNumber + 1);
		return;
	}
	map.set(key, 1);
};

const setOrAppend = <K>(map: Map<K, Set<number>>, key: K, value: number) => {
	const diversityNumber = map.get(key) ?? new Set<number>();
	diversityNumber.add(value);
	map.set(key, diversityNumber);
};

const dumShuffle = (array: any[]) => {
	const result = [...array].sort(() => Math.random() - 0.5);

	return result;
};

const fisherYatesShuffle = (array: any[]) => {
	let m = array.length,
		t,
		i;

	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
};

const durstenfeldShuffle = (array: any[]) => {
	const result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
};

const shuffles = {
	dumShuffle,
	fisherYatesShuffle,
	durstenfeldShuffle
};
