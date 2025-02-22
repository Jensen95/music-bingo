<script lang="ts">
	import { browser } from '$app/environment';
	import playlist from '$lib/playlist.json';
	import { quintOut, sineOut, bounceOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 100,
				easing: bounceOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	let mappedPlaylist = playlist
		.map((song, index) => {
			return {
				...song,
				id: index + 1,
				played: false
			};
		})
		.sort((a, b) => a.song.localeCompare(b.song));

	const getSongColor = (songId: number) => {
		switch (songId % 4) {
			case 0:
				return 'color-1';
			case 1:
				return 'color-2';
			case 2:
				return 'color-3';
			case 3:

			default:
				return 'color-1';
		}
	};

	// only do it in browser
	if (browser) {
		if (localStorage.getItem('playlist')) {
			mappedPlaylist = JSON.parse(localStorage.getItem('playlist')!);
		}
	}

	$: {
		browser ? localStorage.setItem('playlist', JSON.stringify(mappedPlaylist)) : null;
	}

	// clear all played songs
	const clear = () => {
		mappedPlaylist = mappedPlaylist.map((s) => {
			return {
				...s,
				played: false
			};
		});
	};
</script>

<svelte:head>
	<title>Bingo Manager</title>
	<meta name="description" content="Manage played songs" />
</svelte:head>

<div class="cla">
	<div class="song-grid">
		{#each mappedPlaylist.filter((s) => !s.played) as song (song.id)}
			<label in:receive={{ key: song.id }} out:send={{ key: song.id }} animate:flip>
				<div class="song">
					<input type="checkbox" bind:checked={song.played} />
					<div class="title">
						{song.song}
					</div>
					<div class="artist">
						{song.artist}
					</div>
				</div>
			</label>
		{/each}
	</div>
	<div class="list-title">Played songs</div>
	<div class="song-grid">
		{#each mappedPlaylist.filter((s) => s.played) as song (song.id)}
			<label in:receive={{ key: song.id }} out:send={{ key: song.id }} animate:flip>
				<div class="song">
					<input type="checkbox" bind:checked={song.played} />
					<div class="title">
						{song.song}
					</div>
					<div class="artist">
						{song.album}
					</div>
				</div>
			</label>
		{/each}
	</div>
	<button on:click={clear}>Clear songs</button>
</div>

<style>
	label div.song.color-1 {
		background-color: #e8c872;
	}

	label div.song.color-2 {
		background-color: #98abee;
	}

	label div.song.color-3 {
		background-color: #f9e8c9;
	}

	label div.song.color-4 {
		background-color: #99e4c8;
	}

	label:nth-child(3n - 2) > div {
		background-color: #e8c872;
	}

	label:nth-child(3n - 1) > div {
		background-color: #98abee;
	}

	label:nth-child(3n) > div {
		background-color: #f9e8c9;
	}

	.list-title {
		margin-top: 20px;
		margin-bottom: 20px;
		font-size: 1.5em;
	}

	button {
		margin-top: 20px;
		/* make a liniar gradient */
		background: linear-gradient(
			45deg,
			rgba(0, 255, 0, 1),
			rgba(255, 0, 0, 1),
			rgba(255, 255, 0, 1)
		);

		transition: background 0.3s;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	button:hover {
		background: linear-gradient(
			35deg,
			rgba(255, 255, 0, 1),
			rgba(255, 0, 0, 1),
			rgba(0, 255, 0, 1)
		);
	}

	button:active {
		background: linear-gradient(
			65deg,
			rgba(0, 255, 0, 1),
			rgba(255, 0, 0, 1),
			rgba(255, 255, 0, 1)
		);
	}

	input[type='checkbox'] {
		display: none;
	}

	.song-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 10px;
	}

	.song {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column nowrap;
		text-align: center;
		padding: 10px;
		height: 80px;
		border: 1px solid #000;
		border-radius: 6px;
		cursor: pointer;
	}
	.song .artist {
		margin-top: 5px;
	}
</style>
