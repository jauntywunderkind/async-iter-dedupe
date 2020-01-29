import Map, { DropItem} from "async-iter-map"

export function AsyncIterDedupe( opt= {}){
	const { isEqual, map: innerMap, ...rest}= opt
	Map.call( this, rest)
	Object.defineProperties( this, {
		innerMap: {
			value: innerMap,
			writable: true
		},
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
	map: {
		get: function(){
			return this.outerMap
		},
		set: function( innerMap){
			this.innerMap= innerMap
		}
	},
	outerMap: {
		value: function map( item){
			if( this.innerMap){
				item= this.innerMap( item)
			}
			if( item=== DropItem|| this.isEqual( item, this.state)){
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
