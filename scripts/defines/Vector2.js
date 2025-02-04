// @ts-check
export class Vector2 {
	/**
	 * @private
	 * @type {number}
	 */
	_x = 0;
	get x() {
		return this._x;
	}
	set x(value) {
		this._x = value
	}

	/**
	 * @private
	 * @type {number}
	 */
	_y = 0;
	get y() {
		return this._y;
	}
	set y(value) {
		this._y = value;
	}

	/**
	 * @overload
	 * @param {number} x ベクトルの x 要素の値
	 * @param {number} y ベクトルの y 要素の値
	 *
	 * @overload
	 * @param {Vector2} v 2次元ベクトル
	 *
	 * @overload
	 */
	constructor(param1, param2) {
		if (typeof param1 === "number" && typeof param2 === "number") {
			this._x = param1;
			this._y = param2;
		}
		else if (!param2) {
			if (param1 instanceof Vector2) {
				this._x = param1._x;
				this._y = param1._y;
			}
		}
	}

	/**
	 * ノルムの取得
	 * @return {number}
	 */
	norm() {
		return Math.sqrt(this._x ** 2 + this._y ** 2);
	}

	/**
	 * ベクトル加算
	 * @param {Vector2} opponent
	 * @return {Vector2} 加算結果
	 */
	add(opponent) {
		return new Vector2(this._x + opponent._x, this._y + opponent._y);
	}

	/**
	 * 自分自身にベクトルを足す (破壊的操作)
	 * @param {Vector2} opponent 
	 */
	addToSelf(opponent) {
		this._x += opponent._x;
		this._y += opponent._y;
	}

	/**
	 * ベクトルのスカラー積
	 * @param {number} n
	 * @return {Vector2} スカラー積の値 
	 */
	scalarMultiply(n) {
		return new Vector2(this._x * n, this._y * n);
	}

	/**
	 * 自分自身をスカラー積する (破壊的操作)
	 * @param {number} n
	 */
	scalarMultiplyToSelf(n) {
		this._x *= n;
		this._y *= n;
	}

	/**
	 * 自身のベクトルに単行マイナスを付けたベクトル (逆ベクトル) を返す
	 * @return {Vector2} 自身のベクトルの逆ベクトル
	 */
	unaryMinus() {
		return this.scalarMultiply(-1);
	}

	/**
	 * ベクトル減算
	 * @param {Vector2} opponent
	 * @return {Vector2} 減算結果 
	 */
	subtract(opponent) {
		return this.add(opponent.unaryMinus());
	}

	/**
	 * 自分自身からベクトルを引く (破壊的操作)
	 * @param {Vector2} opponent 
	 */
	subtractToSelf(opponent) {
		this.addToSelf(opponent.unaryMinus());
	}

	/**
	 * ドット積の計算
	 * @param {Vector2} opponent
	 * @return {number} ドット積の結果
	 */
	dot(opponent) {
		return this._x * opponent._x + this._y * opponent._y;
	}

	/**
	 * クロス積の計算 (戻り値は本来はベクトルだが、2次元ベクトルでは z 要素の値をスカラー値とする)
	 * @param {Vector2} opponent
	 * @return {number} クロス積の結果の z 要素の値
	 */
	cross(opponent) {
		return this._x * opponent._y - this._y * opponent._x;
	}

	// 自身を複製する
	copy() {
		return new Vector2(this);
	}
}
