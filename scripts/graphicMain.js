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

		let positionX = centerX;
		let positionY = centerY;
		let moveX = 5;
		let moveY = 5;
		const radius = 20;

		function animationFrame() {
			beforeTimeStamp = performance.now();

			// 衝突していたら真ん中に戻す
			if (Math.sqrt(Math.abs(positionX - centerX) ** 2 + Math.abs(positionY - centerY) ** 2) >= 300 - radius) {
				positionX = centerX;
				positionY = centerY;
			}

			if (context) {
				context.fillStyle = "#1c1c1c";
				context.fillRect(0, 0, bouncingCircleCanvas.width, bouncingCircleCanvas.height);

				// big circle
				context.beginPath();
				context.arc(centerX, centerY, 300, 0, 2 * Math.PI);
				context.stroke();

				// small circle
				context.beginPath();
				context.arc(positionX, positionY, radius, 0, 2 * Math.PI);
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

			positionX += moveX;
			positionY += moveY;

			const before = beforeTimeStamp;
			const now = performance.now();
			const timeOutDuration = Math.max(1000 / 60 - (now - before), 0);
			setTimeout(animationFrame, timeOutDuration);
		}

		animationFrame();
	}
}

window.onload = graphicMain;
