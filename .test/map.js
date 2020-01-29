#!/usr/bin/env node
import tape from "tape"
import Dedupe from "../dedupe.js"
import Fixture001122 from "./_fixture_001122.js"

function map( item){
	return item* 2
}

tape( "map", async function( t){
	t.plan( 4)
	const deduped= new Dedupe({ input: Fixture001122(), map})
	let expected= [ 0, 2, 4]
	for await( let item of deduped){
		const exp= expected.shift()
		t.equal( item, exp, `item=${exp}`)
	}
	t.equal( expected.length, 0, "length=0")
	t.end()
})
