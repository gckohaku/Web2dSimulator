// @ts-check

/**
 * グラフィッククラスのインターフェース
 * @interface
 */
export class GraphicBase {

}

/**
 * 初期化
 * @param {CanvasRenderingContext2D} _context
 * @return {number} 関数実行後のステータス
 */
GraphicBase.prototype.initialize = function(_context) {
	throw new Error("not implemented")
}

/**
 * 処理
 * @param {CanvasRenderingContext2D} _context
 * @return {number} 関数実行後のステータス
 */
GraphicBase.prototype.update = function(_context) {
	throw new Error("not implemented")
}

/**
 * 描画
 * @param {CanvasRenderingContext2D} _context
 * @return {number} 関数実行後のステータス
 */
GraphicBase.prototype.draw = function(_context) {
	throw new Error("not implemented")
}

/**
 * 後処理
 * @param {CanvasRenderingContext2D} _context
 * @return {number} 関数実行後のステータス
 */
GraphicBase.prototype.release = function(_context) {
	throw new Error("not implemented")
}