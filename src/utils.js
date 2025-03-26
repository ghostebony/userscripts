const today = new Date();

const encoder = new TextEncoder();

const utils = /** @type {const} */ ({
	/**
	 * @template {HTMLElement} T
	 * @param {string} selector
	 * @param {Element | Document} [el]
	 * @returns {Promise<T>}
	 */
	waitForElement(selector, el) {
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
	},
	/**
	 * @param {string} string
	 * @param {'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'} [hash]
	 * @returns {Promise<string>}
	 */
	async hash(string, hash = 'SHA-1') {
		const hashBuffer = await crypto.subtle.digest(hash, encoder.encode(string));

		return Array.from(new Uint8Array(hashBuffer))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('');
	},
	/**
	 * @template {Record<string, unknown> | Record<string, unknown>[] | string[] | number[] | null} TData
	 *
	 * @param {string} url
	 * @param {{ method?: string; data?: string; headers?: Record<string, string> }} [options]
	 * @returns {Promise<{ data: TData; status: number }>}
	 */
	async request(url, options) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				url,
				method: options?.method ?? 'GET',
				data: options?.data,
				headers: options?.headers,
				onabort: reject,
				onerror: reject,
				onload({ status, responseText }) {
					resolve({
						status: status,
						data: responseText ? JSON.parse(responseText) : null,
					});
				},
				ontimeout: reject,
			});
		});
	},
	/**
	 * @param {string} date
	 * @returns {Date | null}
	 */
	parseDate(date) {
		return !isNaN(Date.parse(date)) ? new Date(date) : null;
	},
	/**
	 * @param {Date} date
	 * @returns {string}
	 */
	dateToString(date) {
		return date.toISOString().split('T')[0];
	},
	getInfoHash(/** @type {string} */ href) {
		return new URL(href).searchParams.get('xt')?.replace('urn:btih:', '').toLowerCase();
	},
});
