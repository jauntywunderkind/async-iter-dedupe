import Map, { DropItem} from "async-iter-map"

export function AsyncIterDedupe( opt= {}){
	const { isEqual, ...rest}= opt
	Map.call( this, rest)
	Object.defineProperties( this, {
		...(isEqual&& { isEqual: {
			value: isEqual,
			writable: true
		}}),
		state: {
			value: undefined,
			writable: true
		}
	})
	return this
}
export {
	AsyncIterDedupe as default,
	AsyncIterDedupe as asyncIterDedupe,
	AsyncIterDedupe as dedupe,
	AsyncIterDedupe as Dedupe
}
AsyncIterDedupe.prototype= Object.create( Map.prototype, {
	_maps: {
		value: [ "_dedupe", "map"]
	},
	_dedupe: {
		value: function map( item){
			if( this.isEqual( item, this.state)){
				return DropItem
			}
			this.state= item
			return item
		},
	},
	isEqual: {
		value: function( a, b){
			return a=== b
		}
	}
})
AsyncIterDedupe.prototype.constructor= AsyncIterDedupe
