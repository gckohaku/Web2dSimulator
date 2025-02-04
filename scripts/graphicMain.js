// @ts-check
import { GraphicBouncingCircle } from "./graphics/circles/GraphicBouncingCircle.js";

export function graphicMain() {
	/** @type {NodeListOf<Element>} */
	const canvases = document.querySelectorAll(".graphic-canvas");

	if (canvases[0] instanceof HTMLCanvasElement) {
		/** @type {HTMLCanvasElement} */
		const bouncingCircleCanvas = canvases[0];
		bouncingCircleCanvas.width = window.innerWidth - 200;
		bouncingCircleCanvas.height = window.innerHeight;

		const context = bouncingCircleCanvas.getContext("2d");

		const graphicBouncingCircle = new GraphicBouncingCircle();

		if (context) {
			graphicBouncingCircle.initialize(context);
		}

		let beforeTimeStamp = -1;
		const fpsViewCount = 60;
		let frameCount = 0;
		let beforeFpsViewTime = performance.now();

		function animationFrame() {
			beforeTimeStamp = performance.now();

			if (context) {
				graphicBouncingCircle.update(context);
				graphicBouncingCircle.draw(context);
			}

			frameCount++;
			if (frameCount >= fpsViewCount) {
				const now = performance.now();
				console.log("fps: ", frameCount / (now - beforeFpsViewTime) * 1000);

				frameCount = 0;
				beforeFpsViewTime = now;
			}

			const before = beforeTimeStamp;
			const now = performance.now();
			const timeOutDuration = Math.max(1000 / 60 - (now - before), 0);
			setTimeout(animationFrame, timeOutDuration);
		}

		animationFrame();
	}
}

window.onload = graphicMain;
