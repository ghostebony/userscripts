// ==UserScript==
// @name        yt-hq
// @namespace   https://github.com/ghostebony
// @match       https://www.youtube.com/*
// @grant       none
// @require		https://raw.githubusercontent.com/ghostebony/userscripts/main/src/utils.js
// @version     0.1.1
// @author      ghostebony
// @description set the highest video quality possible
// @downloadURL https://raw.githubusercontent.com/ghostebony/userscripts/main/src/yt-hq.user.js
// ==/UserScript==

const resolutions = [
	'highres',
	'hd2880',
	'hd2160',
	'hd1440',
	'hd1080',
	'hd720',
	'large',
	'medium',
	'small',
	'tiny',
];

const handler = async () => {
	const videoPlayer =
		await /** @type {typeof waitForElement<HTMLElement & VideoPlayerMethods>} */ (
			waitForElement
		)('#movie_player');

	let quality = 0;

	const availableQualityLevels = videoPlayer.getAvailableQualityLevels();

	while (
		availableQualityLevels.indexOf(resolutions[quality]) === -1 &&
		quality < resolutions.length
	) {
		quality++;
	}

	if (videoPlayer.getPlaybackQuality() !== resolutions[quality]) {
		videoPlayer.loadVideoById(
			videoPlayer.getVideoData().video_id,
			videoPlayer.getCurrentTime(),
			resolutions[quality],
		);
	}

	if (videoPlayer.setPlaybackQualityRange !== undefined) {
		videoPlayer.setPlaybackQualityRange(resolutions[quality], resolutions[quality]);
	}

	videoPlayer.setPlaybackQuality(resolutions[quality]);
};

handler();

window.addEventListener('loadstart', handler, true);
