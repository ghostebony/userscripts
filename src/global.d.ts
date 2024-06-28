declare function GM_deleteValue(key: string): boolean;

declare function GM_getValue<T>(key: string, fallback: T): T;

declare function GM_listValues(): string[];

declare function GM_setValue(
	key: string,
	value: string | number | string[] | number[],
): boolean;

declare function GM_xmlhttpRequest(details: {
	data?: string;
	headers?: Record<string, string>;
	method: string;
	url: string;
	onabort?: () => void;
	onerror?: () => void;
	onload: (response: { responseText: string; status: number }) => void;
	ontimeout?: () => void;
}): undefined;
