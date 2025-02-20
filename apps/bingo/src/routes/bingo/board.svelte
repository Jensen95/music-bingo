<svelte:options immutable />

<script lang="ts">
	import type { MusicBingoItem } from '@jensen95/bingo-generator';

	import background from './artic-marley.png';

	interface Props {
		bingoItem: MusicBingoItem;
	}

	let { bingoItem }: Props = $props();
</script>

<div>
	<p class="title">Artic Marley musik bingo 2024</p>
	<div class="content">
		<div class="board-background">
			<img src={background} alt="artic marley logo" />
		</div>
		<div class="board">
			{#each bingoItem.songList as song}
				<div class="square">
					<div class="content">
						<div class="song">{song.song}</div>
						<div class="artist">{song.artist}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	div {
		&:nth-child(even) .title {
			margin-top: 10px;
		}
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
		grid-template-columns: repeat(5, 1fr);
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
		opacity: 40%;
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
		font-size: 12px;
		/* word-break: break-all; */
		word-wrap: break-word;
		text-wrap: wrap;
		hyphens: manual;
	}

	.title {
		text-align: center;
		margin: 0;
	}

	/* make a dynamic grid that is based on the varaibles */
</style>
