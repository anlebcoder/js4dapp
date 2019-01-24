const netconf = require("../conf.json");
const fs = require("fs");
const path = require("path");

let _root = path.dirname(__dirname) + path.sep;

let ls = () => {
	for (let n in netconf) {
		let d = netconf[n];
		console.log("[%s] %s --- %s", d.isUse ? "*" : " ", n, d.httpEndpoint);
	}
}

let save = (c) => {
	fs.writeFile(_root + "conf.json", JSON.stringify(c));
	ls();
}

module.exports = {
	ls: ls,
	use: () => {

		let n = argvs[4];

		if (!netconf[n]) {
			console.warn("Not Found Netname:%s", n);
			return;
		}

		for (let n in netconf) netconf[n].isUse = false;

		netconf[n].isUse = true;

		save(netconf);
	},
	add: () => {
		let n = argvs[4];
		let h = argvs[5];
		let c = argvs[6];

		if (!n || !h || !/^((https|http)?:\/\/)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.test(h)) {
			console.warn("Argv Error!");
			return;
		}

		if (["testnet", "mainnet"].includes(n)) {
			netconf[n].httpEndpoint = h;
		} else {

			if (!c || c.length != 64) {
				console.warn("Argv Error!");
				return;
			}

			netconf[n] = {
				chainId: c,
				httpEndpoint: h
			}

		}

		save(netconf);
	},
	defaultNet: () => {
		let r = {};
		for (let n in netconf) {
			if (netconf[n].isUse) return {
				name: n,
				conf: netconf[n]
			}
		}
	}
}