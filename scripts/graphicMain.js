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

		const centerX = bouncingCircleCanvas.width / 2;
		const centerY = bouncingCircleCanvas.height / 2;

		if (context) {
			context.strokeStyle = "white";
		}

		let beforeTimeStamp = -1;
		const fpsViewCount = 60;
		let frameCount = 0;
		let beforeFpsViewTime = performance.now();

		function animationFrame() {
			beforeTimeStamp = performance.now();

			if (context) {
				context.fillStyle = "#1c1c1c";
				context.fillRect(0, 0, bouncingCircleCanvas.width, bouncingCircleCanvas.height);

				context.beginPath();
				context.arc(centerX, centerY, 300, 0, 2 * Math.PI);
				context.stroke();

				context.beginPath();
				context.arc(centerX, centerY, 25, 0, 2 * Math.PI);
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

			const before = beforeTimeStamp;
			const now = performance.now();
			const timeOutDuration = Math.max(1000 / 60 - (now - before), 0);
			setTimeout(animationFrame, timeOutDuration);
		}

		animationFrame();
	}
}

window.onload = graphicMain;
