import { Vector2 } from "./Vector2";

// @ts-check
class Circle {
	/**
	 * @param {Vector2}
	 */
	position = new Vector2();
	/**
	 * @param {number}
	 */
	radius = 0;

	constructor(param1, param2) {
		if (param1 instanceof Vector2 && typeof param2 === "number") {
			this.position = param1;
			this.radius = param2;
		}
		else if (param1 instanceof Circle) {
			this.position = param1.position;
			this.radius = param1.radius;
		}
	}
}