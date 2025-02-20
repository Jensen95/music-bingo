<script lang="ts">
	import { BingoGenerator } from '@jensen95/bingo-generator';
	import playlist from './playlist.json';
	import Board from './board.svelte';
	const test = new BingoGenerator(200, playlist);

	export let boards = test.bingoBoards;
</script>

<svelte:head>
	<title>Bingo Generator</title>
	<meta name="description" content="Generate boards for bingo" />
</svelte:head>
<!-- <div>
	<button
		on:click={() => {
			console.log(boards);
			// generate html for div with class cla
			const html = document.querySelector('.cla').outerHTML;
			const styles = `
				.cla {
					// background-color: hotpink;
					display: grid;
					grid-auto-rowboardss: min-content;
				}

				.content {
		display: grid;
		grid-template-columns: 1fr;
		align-items: center;
		justify-items: center;
	}

	.board {
		--size: 87px;
		display: grid;
		/* gap: 3px; */
		grid-template-columns: repeat(5, var(--size));
		grid-auto-rows: var(--size);
	}

	.board-background,
	.board {
		grid-row: 1;
		grid-column: 1;
	}

	.artist {
		padding-top: 5px;
	}

	img {
		opacity: 20%;
		filter: grayscale(100%);
		height: 410px;
	}

	.square {
		display: flex;
		padding: 3px;
		justify-content: center;
		border: 1px solid black;
		align-items: center;
		text-align: center;
		font-size: 10px;
		/* word-break: break-all; */
		word-wrap: break-word;
		text-wrap: wrap;
		hyphens: manual;
	}

	.title {
		text-align: center;
		margin: 0;
	}

			`;
			// add styles to html
			const element = `<html><head><style>${styles}</style></head><body>${html}</body></html>`;

			// write to blob and open in new tab
			const blob = new Blob([element], { type: 'text/html' });
			const url = URL.createObjectURL(blob);
			window.open(url, '_blank');
		}}>log boards</button
	>
</div> -->
<div class="cla">
	<!-- loop through each board -->
	{#each boards as board}
		<Board bingoItem={board} />
	{/each}
</div>

<style>
	.cla {
		background-color: hotpink;
		display: grid;
		grid-auto-rows: min-content;
	}
</style>
