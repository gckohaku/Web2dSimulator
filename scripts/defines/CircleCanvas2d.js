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
	 * 円のパスを作成
	 * @param {CanvasRenderingContext2D} context 
	 */
	createPath(context) {
		context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
	}

	/**
	 * 円の輪郭を表示
	 * @param {CanvasRenderingContext2D} context 
	 * @param {boolean} [isNewCreatePath=true] 新たにパスを作成するか
	 */
	strokeCircle(context, isNewCreatePath = true) {
		if (isNewCreatePath) {
			context.beginPath();
			this.createPath(context);
		}

		context.strokeStyle = this.strokeStyle;
		context.stroke();
	}

	/**
	 * 円を塗りつぶして表示
	 * @param {CanvasRenderingContext2D} context 
	 * @param {boolean} [isNewCreatePath=true] 新たにパスを作成するか
	 */
	fillCircle(context, isNewCreatePath = true) {
		if (isNewCreatePath) {
			context.beginPath();
			this.createPath(context);
		}

		context.fillStyle = this.fillStyle;
		context.fill();
	}

	/**
	 * 円の表示 (塗りつぶし + 輪郭)
	 * @param {CanvasRenderingContext2D} context 
	 * @param {boolean} [isNewCreatePath=true] 新たにパスを作成するか
	 */
	drawCircle(context, isNewCreatePath = true) {
		if (isNewCreatePath) {
			context.beginPath();
			this.createPath(context);
		}

		this.fillCircle(context, false);
		this.strokeCircle(context, false);
	}
}