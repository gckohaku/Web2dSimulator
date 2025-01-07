// @ts-check
export function graphicMain() {
	/** @type {NodeListOf<Element>} */
	const canvases = document.querySelectorAll(".graphic-canvas");

	if (canvases[0] instanceof HTMLCanvasElement) {
		/** @type {HTMLCanvasElement} */
		const bouncingCircleCanvas = canvases[0];

		console.log(bouncingCircleCanvas);
	}
}
