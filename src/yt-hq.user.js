// ==UserScript==
// @name        yt-hq
// @namespace   https://github.com/ghostebony
// @match       https://www.youtube.com/watch*
// @grant       none
// @require		https://raw.githubusercontent.com/ghostebony/userscripts/main/src/utils.js
// @version     0.0.2
// @author      ghostebony
// @description set the highest video quality possible
// @downloadURL https://raw.githubusercontent.com/ghostebony/userscripts/main/src/yt-hq.user.js
// ==/UserScript==

waitForElement('title').then((title) => {
	const observer = new MutationObserver(() => {
		waitForElement('button.ytp-hd-quality-badge').then((settings) => {
			settings.click();

			waitForElement(
				'div.ytp-panel-menu > div.ytp-menuitem[role="menuitem"]:last-child',
			).then((quality) => {
				quality.click();

				waitForElement(
					'div.ytp-panel-menu > div.ytp-menuitem[role="menuitemradio"]:first-child',
				).then((highestQuality) => {
					highestQuality.click();

				});
			});
		});
	});

	observer.observe(title, { childList: true });
});
