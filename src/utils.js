/**
 * @param {string} selector
 * @param {Element | Document} [el]
 * @return {Promise<HTMLElement>}
 */
function waitForElement(selector, el) {
	el ??= document;

	return new Promise((resolve) => {
		/** @type {any} */
		const element = el.querySelector(selector);

		if (element) {
			return resolve(element);
		}

		const observer = new MutationObserver((mutations) => {
			/** @type {any} */
			const element = el.querySelector(selector);

			if (element) {
				resolve(element);

				observer.disconnect();
			}
		});

		observer.observe(el, { childList: true, subtree: true });
	});
}
