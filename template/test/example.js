"use strict";

const test = require('test');
test.setup();

describe("example", () => {

	it("global __fibos", () => {

		assert.ok(!!__fibos);
	});

	it("get_info", () => {
		let r = __fibos.getInfoSync();

		console.notice(r);
	});
});