const FIBOS = require("fibos.js");
const fs = require("fs");

function dapp(c, ac) {

	let account_name = ac.account;

	let fibos = FIBOS({
		chainId: c.chainId,
		httpEndpoint: c.httpEndpoint,
		keyProvider: ac.prikey,
		logger: {
			log: null,
			error: null
		}
	});

	this.setabi = (abi) => {
		abi = JSON.parse(fs.readTextFile(abi));

		return fibos.setabiSync(account_name, abi, {
			authorization: account_name
		});
	}

	this.setcode = (cpath) => {
		let s = fs.stat(cpath);

		s = s.isDirectory() ? fibos.compileModule(cpath) : fibos.compile(cpath);

		return fibos.setcodeSync(account_name, 0, 0, s, {
			authorization: account_name
		});
	}

	this.import = () => {
		return {
			abi: fibos.getAbiSync(account_name),
			code: fibos.getRawCodeAndAbiSync(account_name)
		}
	}
}

module.exports = dapp;