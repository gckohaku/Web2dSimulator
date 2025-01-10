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

		let currentCount = 0;
		const centerX = bouncingCircleCanvas.width / 2;
		const centerY = bouncingCircleCanvas.height / 2;

		if (context) {
			context.fillStyle = "#1c1c1c";
			context.strokeStyle = "white";
		}

		let beforeTimeStamp = -1;
		const fpsViewCount = 60;
		let frameCount = 0;
		let beforeFpsViewTime = performance.now();

		function animationFrame() {
			beforeTimeStamp = performance.now();

			const oneAroundFrames = 120;

			if (context) {
				const angle = (2 * Math.PI * currentCount) / oneAroundFrames;

				context.beginPath();
				context.fillRect(0, 0, bouncingCircleCanvas.width, bouncingCircleCanvas.height);
				context.arc(centerX + Math.cos(angle) * 300, centerY + Math.sin(angle) * 300, 50, 0, Math.PI * 2);
				context.stroke();
			}

			currentCount = (currentCount + 1) % oneAroundFrames;

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
