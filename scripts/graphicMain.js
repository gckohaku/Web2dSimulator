// @ts-check
export function graphicMain() {
	console.log("test");

	/** @type {NodeListOf<Element>} */
	const canvases = document.querySelectorAll(".graphic-canvas");

	if (canvases[0] instanceof HTMLCanvasElement) {
		/** @type {HTMLCanvasElement} */
		const bouncingCircleCanvas = canvases[0];

		console.log(bouncingCircleCanvas);

		const context = bouncingCircleCanvas.getContext("2d");

		if (context) {
			context.fillStyle = "#1c1c1c";
			context.fillRect(0, 0, bouncingCircleCanvas.width, bouncingCircleCanvas.height);
		}
	}
}

window.onload = graphicMain;