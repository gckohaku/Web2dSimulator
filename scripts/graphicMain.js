// @ts-check
import { Circle } from "./defines/Circle.js";
import { Vector2 } from "./defines/Vector2.js";

export function graphicMain() {
	/** @type {NodeListOf<Element>} */
	const canvases = document.querySelectorAll(".graphic-canvas");

	if (canvases[0] instanceof HTMLCanvasElement) {
		/** @type {HTMLCanvasElement} */
		const bouncingCircleCanvas = canvases[0];
		bouncingCircleCanvas.width = window.innerWidth - 200;
		bouncingCircleCanvas.height = window.innerHeight;

		const context = bouncingCircleCanvas.getContext("2d");

		/** @type {Vector2} */
		const center = new Vector2(bouncingCircleCanvas.width, bouncingCircleCanvas.height).scalarMultiply(0.5);

		if (context) {
			context.strokeStyle = "white";
		}

		let beforeTimeStamp = -1;
		const fpsViewCount = 60;
		let frameCount = 0;
		let beforeFpsViewTime = performance.now();

		/** @type {Circle} */
		const smallCircle = new Circle(center.x, center.y, 20);

		/** @type {Circle} */
		const bigCircle = new Circle(center.x, center.y, 300);

		/** @type {Vector2} */
		const move = new Vector2(5, 5);

		function animationFrame() {
			beforeTimeStamp = performance.now();

			// 衝突していたら真ん中に戻す
			if (bigCircle.innerCollisionToCircle(smallCircle)) {
				smallCircle.position = center.copy();
			}

			if (context) {
				context.fillStyle = "#1c1c1c";
				context.fillRect(0, 0, bouncingCircleCanvas.width, bouncingCircleCanvas.height);

				// big circle
				context.beginPath();
				context.arc(bigCircle.position.x, bigCircle.position.y, bigCircle.radius, 0, 2 * Math.PI);
				context.stroke();

				// small circle
				context.beginPath();
				context.arc(smallCircle.position.x, smallCircle.position.y, smallCircle.radius, 0, 2 * Math.PI);
				context.fillStyle = "green";
				context.fill();
				context.stroke();
			}

			frameCount++;
			if (frameCount >= fpsViewCount) {
				const now = performance.now();
				console.log("fps: ", frameCount / (now - beforeFpsViewTime) * 1000);

				frameCount = 0;
				beforeFpsViewTime = now;
			}

			smallCircle.position.addToSelf(move);

			const before = beforeTimeStamp;
			const now = performance.now();
			const timeOutDuration = Math.max(1000 / 60 - (now - before), 0);
			setTimeout(animationFrame, timeOutDuration);
		}

		animationFrame();
	}
}

window.onload = graphicMain;
