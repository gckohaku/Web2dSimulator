// @ts-check
import { Vector2 } from "./Vector2.js";

export class Circle {
	/**
	 * @private 
	 * @type {Vector2} 
	 */
	_position = new Vector2();
	get position() {
		return this._position;
	}
	set position(v) {
		this._position.x = v.x;
		this._position.y = v.y;
	}

	/**
	 * @private
	 * @type {number}
	 */
	_radius = 0;
	get radius() {
		return this._radius;
	}
	set radius(value) {
		this._radius = value;
	}

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
		if (param1 instanceof Vector2 && typeof param2 === "number") {
			this._position = param1;
			this.radius = param2;
		}
		else if (typeof param1 === "number" && typeof param2 === "number" && typeof param3 === "number") {
			this._position = new Vector2(param1, param2);
			this.radius = param3;
		}
		else if (param1 instanceof Circle) {
			this._position = param1._position;
			this.radius = param1._radius;
		}
	}

	/**
	 * 円との衝突判定
	 * @param {Circle} opponent 相手の円
	 * @return {boolean} 衝突していたら true, そうでなければ false
	 */
	collisionCircle(opponent) {
		const totalRadius = this._radius + opponent._radius;
		const distance = (this._position.subtract(opponent._position)).norm();

		return distance < totalRadius;
	}

	/**
	 * 自身の円の内側にある円が、自身の円と衝突しているか
	 * @param {Circle} opponent 
	 * @return {boolean} 衝突していたら true, そうでなければ false
	 */
	innerCollisionToCircle(opponent) {
		const distance = (this._position.subtract(opponent._position)).norm();

		return distance > this._radius - opponent._radius;
	}
}