// @ts-check

import { CircleCanvas2d } from "../../defines/CircleCanvas2d.js";
import { Vector2 } from "../../defines/Vector2.js";
import { GraphicBase } from "../GraphicBase.d.js";

/**
 * @implements {GraphicBase}
 */
export class GraphicBouncingCircle {
	/**
	 * @private
	 * @type {Vector2} 
	 */
	_canvasCenter;

	/**
	 * @private
	 * @type {CircleCanvas2d} 
	 */
	_smallCircle;

	/**
	 * @private
	 * @type {CircleCanvas2d} 
	 */
	_bigCircle;

	/**
	 * @private
	 * @type {Vector2} 
	 */
	_frameMoveSpeed;

	/**
	 * 初期化
	 * @param {CanvasRenderingContext2D} context 
	 * @returns {number}
	 */
	initialize(context) {
		this._canvasCenter = new Vector2(context.canvas.width / 2, context.canvas.height / 2);
		this._smallCircle = new CircleCanvas2d(this._canvasCenter.x, this._canvasCenter.y, 20);
		this._smallCircle.fillStyle = "green";
		this._bigCircle = new CircleCanvas2d(this._canvasCenter.x, this._canvasCenter.y, 300);
		this._frameMoveSpeed = new Vector2(5, 5);

		return 1;
	}

	/**
	 * 更新
	 * @param {CanvasRenderingContext2D} context 
	 * @returns {number}
	 */
	update(context) {
		// 衝突していたら真ん中に戻す
		if (this._bigCircle.innerCollisionToCircle(this._smallCircle)) {
			this._smallCircle.position = this._canvasCenter.copy();
		}

		return 1;
	}

	/**
	 * 描画
	 * @param {CanvasRenderingContext2D} context 
	 * @returns {number}
	 */
	draw(context) {
		context.fillStyle = "#1c1c1c";
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);

		// big circle
		this._bigCircle.strokeCircle(context);

		// small circle
		this._smallCircle.drawCircle(context);

		this._smallCircle.position.addToSelf(this._frameMoveSpeed);

		return 1;
	}

	/**
	 * 後処理
	 * @param {CanvasRenderingContext2D} context 
	 * @returns {number}
	 */
	release(context) {

		return 1;
	}
}