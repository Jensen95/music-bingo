import { firefox } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

const url = 'https://music.youtube.com/playlist?list=PLaHayjzRHUb0juFUTy3ZggICjwhK_kYcR';
const items: { song: string; artist: string; album: string }[] = [];

(async () => {
	const browser = await firefox.launch({ headless: true });
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto('https://music.youtube.com/playlist?list=PLaHayjzRHUb0juFUTy3ZggICjwhK_kYcR');
	await page.click('button[aria-label="Reject all"]');
	await page.waitForSelector('ytmusic-responsive-list-item-renderer');
	const content = await page.content();
	await browser.close();
	const $ = cheerio.load(content);

	$('div #contents .ytmusic-playlist-shelf-renderer').each((index, element) => {
		// Skip first two elements as they either is undefined or contains all elements
		if (index < 2) {
			return;
		}
		const song = $(element).find('.title-column').text().trim();
		let artist = '';
		let album = '';

		$(element)
			.find('.secondary-flex-columns')
			.children()
			.each((i, el) => {
				if (i === 0) {
					artist = $(el).text();
				}

				if (i === 1) {
					album = $(el).text();
				}
			});
		items.push({ song, artist, album });
	});

	// skip last element as it is undefined
	items.pop();
	fs.writeFileSync('playlist.json', JSON.stringify(items, null, 2));
})();
