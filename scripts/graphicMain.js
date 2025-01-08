// @ts-check
export function graphicMain() {
	console.log("test");

	/** @type {NodeListOf<Element>} */
	const canvases = document.querySelectorAll(".graphic-canvas");

	if (canvases[0] instanceof HTMLCanvasElement) {
		/** @type {HTMLCanvasElement} */
		const bouncingCircleCanvas = canvases[0];
		bouncingCircleCanvas.width = window.innerWidth - 200;
		bouncingCircleCanvas.height = window.innerHeight;

		console.log(bouncingCircleCanvas);

		const context = bouncingCircleCanvas.getContext("2d");

		if (context) {
			context.fillStyle = "#1c1c1c";
			context.fillRect(0, 0, bouncingCircleCanvas.width, bouncingCircleCanvas.height);

			context.strokeStyle = "white";

			context.arc(bouncingCircleCanvas.width / 2, bouncingCircleCanvas.height / 2, 50, 0, Math.PI * 2);
			context.stroke();
		}
	}
}

window.onload = graphicMain;