import { it, describe, expect } from "vitest";
import { BingoGenerator } from "./bingoGenerator";

// import songs from playList.json
import playlist from "./playlist.json";

const songSet = new Set<string>();
playlist.forEach((item) => {
  songSet.add(item.song);
});
const songs = Array.from(songSet);
describe("bingoGenerator", () => {
  // it('should generate a bingo card', () => {
  // 	const bingoGenerator = new BingoGenerator(4, playlist, 3);

  // 	expect(bingoGenerator.bingoBoards).toEqual([
  // 		['a', 'b', 'c'],
  // 		['b', 'c', 'a'],
  // 		['c', 'a', 'b']
  // 	]);
  // });

  // it('should generate multiple bingo cards', () => {
  // 	const bingoGenerator = new BingoGenerator(100, playlist);

  // 	expect(bingoGenerator.bingoBoards).toEqual([
  // 		['a', 'b', 'c'],
  // 		['b', 'c', 'a'],
  // 		['c', 'a', 'b'],
  // 		['a', 'b', 'c'],
  // 		['b', 'c', 'a'],
  // 		['c', 'a', 'b']
  // 	]);
  // });

  it("should use dumShuffle", () => {
    const bingoGenerator = new BingoGenerator(100, playlist, 0, "dumShuffle");

    expect(bingoGenerator.bingoBoards).toEqual([
      ["a", "b", "c"],
      ["b", "c", "a"],
      ["c", "a", "b"],
    ]);
  });

  it("should use durstenfeldShuffle", () => {
    const bingoGenerator = new BingoGenerator(
      100,
      playlist,
      0,
      "durstenfeldShuffle"
    );

    expect(bingoGenerator.bingoBoards).toEqual([
      ["a", "b", "c"],
      ["b", "c", "a"],
      ["c", "a", "b"],
    ]);
  });

  it("should use fisherYatesShuffle", () => {
    const bingoGenerator = new BingoGenerator(
      100,
      playlist,
      0,
      "fisherYatesShuffle"
    );

    expect(bingoGenerator.bingoBoards).toEqual([
      ["a", "b", "c"],
      ["b", "c", "a"],
      ["c", "a", "b"],
    ]);
  });
});
