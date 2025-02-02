// @ts-check
import { Circle } from "./Circle.js";
import { Vector2 } from "./Vector2.js";

export class CircleCanvas2d extends Circle {
	/** @property {string | CanvasGradient | CanvasPattern} */
	fillStyle = "white";
	/** @property {string | CanvasGradient | CanvasPattern} */
	strokeStyle = "white";

	/**
	 * @overload
	 * @param {Vector2} position 円の中心の位置  
	 * @param {number} radius 円の半径
	 * 
	 * @overload
	 * @param {number} x 円の中心の x 座標
	 * @param {number} y 円の中心の y 座標
	 * @param {number} radius 円の半径
	 * 
	 * @overload
	 * @param {Circle} 円
	 * 
	 * @overload
	 */
	constructor(param1, param2, param3) {
		super(param1, param2, param3);
	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} context 
	 */
	drawPath(context) {
		context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} context 
	 * @param {boolean} [isIndependentPath=true]
	 */
	strokeCircle(context, isIndependentPath) {
		if (isIndependentPath) {
			context.beginPath();
		}

		context.fillStyle = this.fillStyle;
		context.fill();
	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} context 
	 * @param {boolean} [isIndependentPath=true]
	 */
	fillCircle(context, isIndependentPath = true) {
		if (isIndependentPath) {
			context.beginPath();
		}

		context.fillStyle = this.fillStyle;
		context.fill();
	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} context 
	 * @param {boolean} [isIndependentPath=true]
	 */
	drawCircle(context, isIndependentPath = true) {
		if (isIndependentPath) {
			context.beginPath();
		}

		this.drawPath(context);
		this.fillCircle(context);
		this.strokeCircle(context);
	}
}