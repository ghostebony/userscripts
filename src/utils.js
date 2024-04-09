/**
 * @template {HTMLElement} T

 * @param {string} selector
 * @param {Element | Document} [el]
 * 
 * @return {Promise<T>}
 */
function waitForElement(selector, el) {
	el ??= document;

	return new Promise((resolve) => {
		/** @type {any} */
		const element = el.querySelector(selector);

		if (element) {
			return resolve(element);
		}

		const observer = new MutationObserver(() => {
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
