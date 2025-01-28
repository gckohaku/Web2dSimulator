// @ts-check
import { Vector2 } from "./Vector2";

export class Circle {
	/**
	 * @param {Vector2}
	 */
	position = new Vector2();
	/**
	 * @param {number}
	 */
	radius = 0;

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
			this.position = param1;
			this.radius = param2;
		}
		else if (typeof param1 === "number" && typeof param2 === "number" && typeof param3 === "number") {
			this.position = new Vector2(param1, param2);
			this.radius = param3;
		}
		else if (param1 instanceof Circle) {
			this.position = param1.position;
			this.radius = param1.radius;
		}
	}

	/**
	 * 円との衝突判定
	 * @param {Circle} opponent 相手の円
	 * @return {boolean} 衝突していたら true, そうでなければ false
	 */
	collisionCircle(opponent) {
		const totalRadius = this.radius + opponent.radius;
		const distance = (this.position.subtract(opponent.position)).norm();

		return distance < totalRadius;
	}

	/**
	 * 自身の円の内側にある円が、自身の円と衝突しているか
	 * @param {Circle} opponent 
	 * @return {boolean} 衝突していたら true, そうでなければ false
	 */
	innerCollisionToCircle(opponent) {
		const distance = (this.position.subtract(opponent.position)).norm();

		return distance > this.radius - opponent.radius;
	}
}