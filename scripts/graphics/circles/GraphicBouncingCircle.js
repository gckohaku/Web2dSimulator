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
	 * @type {Vector2}
	 */
	_beforeSmallPosition;

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
	 * @private @readonly
	 * @type {Vector2}
	 */
	INITIAL_MOVE_SPEED = new Vector2(3, -10);

	/**
	 * @private
	 * @type {Vector2}
	 */
	_acceleration;

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
		this._frameMoveSpeed = new Vector2().copyFrom(this.INITIAL_MOVE_SPEED);
		this._acceleration = new Vector2(0, 1);

		this._frameMoveSpeed.subtractToSelf(this._acceleration);
		this._smallCircle.position.subtractToSelf(this._frameMoveSpeed);

		this._beforeSmallPosition = new Vector2();

		return 1;
	}

	/**
	 * 更新
	 * @param {CanvasRenderingContext2D} context 
	 * @returns {number}
	 */
	update(context) {
		this._beforeSmallPosition.copyFrom(this._smallCircle.position);
		this._smallCircle.position.addToSelf(this._frameMoveSpeed);
		
		// 衝突していたら跳ね返る
		if (this._bigCircle.innerCollisionToCircle(this._smallCircle)) {
			const smallPos = this._smallCircle.position;
			const bigPos = this._bigCircle.position;
			const distance = smallPos.subtract(bigPos);
			const beforeDistance = this._beforeSmallPosition.subtract(bigPos);

			// はみ出した分を戻す
			const protrudingRate = Math.max(Math.min((distance.norm() - (this._bigCircle.radius - this._smallCircle.radius)) / (distance.norm() - beforeDistance.norm()), 1), 0);
			smallPos.subtractToSelf(this._frameMoveSpeed.multiplyScalar(protrudingRate));

			const fixDistance = smallPos.subtract(bigPos);

			// big circle の中心から見た角度を元に跳ね返る角度を算出
			const distanceAngle = fixDistance.angle();
			const angleAfterBounce = distanceAngle + (distanceAngle - this._frameMoveSpeed.angle()) + Math.PI;

			// 移動速度ベクトルに設定
			const moveNorm = this._frameMoveSpeed.norm();
			this._frameMoveSpeed.setByPolar(moveNorm, angleAfterBounce);

			// さっきはみ出していた分だけ進める
			smallPos.addToSelf(this._frameMoveSpeed.multiplyScalar(protrudingRate));
		}

		this._frameMoveSpeed.addToSelf(this._acceleration);

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