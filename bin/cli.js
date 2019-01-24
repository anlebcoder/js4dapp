#!/usr/bin/env fibjs

const ps = require("process");
const zip = require("zip");
const fs = require("fs");
const path = require("path");
const cs = console;
const conf = require("../conf.json");
const js4dapp = require("../lib/");
const defaultNet = js4dapp.net.defaultNet();

global.argvs = argv;

let _root = path.dirname(__dirname) + path.sep;

let _rootTemplatePath = _root + "template" + path.sep;

if (!ps.versions.fibjs) {
	cs.warn("Not Found FIBJS\nInstall FIBJS: curl -s http://fibjs.org/download/installer.sh|sh")
	_exit();
}

let _exit = () => ps.exit(0);

let __loadTemplate = (dappname) => {
	if (!dappname) {
		cs.warn("Not Found Dapp name!");
		_exit();
	}

	let dp = dappname + path.sep;

	let pf = ps.cwd() + path.sep;

	if (fs.exists(pf + dp)) {
		cs.warn("Dapp Exists!");
		_exit();
	}

	cs.notice("[√] create: %s", dp);

	fs.mkdir(pf + dp);

	let __copy = (d) => {
		let s = fs.stat(_rootTemplatePath + d);

		if (!s.isDirectory()) {
			console.notice("[√] create: %s", dp + d);
			fs.copy(_rootTemplatePath + d, pf + dp + d);
		} else {

			d = d + path.sep;

			console.notice("[√] create: %s", dp + d);

			fs.mkdir(pf + dp + d);

			fs.readdir(_rootTemplatePath + d).map((o) => {
				__copy(d + o);
			});
		}
	}

	fs.readdir(_rootTemplatePath).forEach(__copy);

	return pf + dp;
}

let __js4dapp = (ac) => {
	if (!ac) {
		try {
			let acs = require(ps.cwd() + path.sep + "conf.json");

			if (acs.length) {
				while (true) {
					acs.forEach((a, i) => {
						console.log("[%s]%s\n", i, a.account);
					});

					let i = parseInt(console.readLine("Choose Account:"));

					ac = acs[i];

					if (ac) break;
				}
			}
		} catch (e) {
			cs.warn("Not Found Account!");
		}

		if (!ac) {
			ac = {
				account: console.readLine("account:"),
				prikey: console.readLine("prikey:")
			};
		}
	}

	return new js4dapp.dapp(defaultNet.conf, ac);
}

let cmds = {
	dapp: {
		import: () => {

			let dappname = argvs[4];

			if (!/^[a-z1-5.]{1,12}$/.test(dappname)) {
				cs.error("Dapp name Formart Error");
				_exit();
			}

			let _js4dapp = __js4dapp({
				account: dappname
			});

			let data = _js4dapp.import();
			console.error();

			let dpath = __loadTemplate(dappname);

			console.notice("[√] import ABI: Success!");

			fs.writeFile(dpath + path.sep + "abi.json", JSON.stringify(data.abi.abi));

			let code = Buffer.from(data.code.wasm, 'base64');
			let isJSContract = code.hex().substr(0, 10) === '504b03042d';

			console.notice("[√] import CODE: %s Contract Success!", isJSContract ? "JS" : "WASM");

			if (isJSContract) {
				let zipfile = zip.open(code);
				zipfile.extractAll(dpath + path.sep + "contracts");
			} else {
				fs.writeFile(dpath + path.sep + "contracts" + path.sep + "index.wasm", code);
			}
		},
		create: () => __loadTemplate(argvs[4]),
		setabi: () => {
			let abiPath = path.resolve(argvs[4]);

			if (!fs.exists(abiPath)) {
				cs.warn("Not Found ABI File!");
				_exit();
			}

			let _js4dapp = __js4dapp();

			let r = _js4dapp.setabi(abiPath);

			console.notice("[setabi Result]Success!broadcast:%s\ntransaction_id:%s", r.broadcast, r.transaction_id);
		},
		setcode: () => {
			let codePath = path.resolve(argvs[4]);

			if (!fs.exists(codePath)) {
				cs.warn("Not Found code path!");
				_exit();
			}

			let _js4dapp = __js4dapp();


			let r = _js4dapp.setcode(codePath);

			console.notice("[setcode Result]Success!\nbroadcast:%s\ntransaction_id:%s", r.broadcast, r.transaction_id);
		}
	},
	net: js4dapp.net,
	wallet: {
		random: () => {
			let result = js4dapp.wallet.random();

			for (let n in result) console.log("%s : %s\n", n, result[n]);
		},
		import: () => {}
	}
}

let plugin = argvs[2];
let option = argvs[3];

if (!cmds[plugin] || !cmds[plugin][option]) {
	cs.log(`
Usage: js4dapp [plugin] [option] [params]

Plugins Options:
	
	dapp,		
		create,		create dapp (create [dapp-work-path])
		import,		import dapp (import [dapp-name])
		setabi,		setabi (setabi [abi path])
		setcode,	setcode (setcode [abi path])

	net,				
		ls,		output js4dapp network
		add,		add define network
		use,		use default network

	wallet,
		import,		import account
		random,		random account

	test,			run test case（test [case path]）

	help,			output usage information
	`);

	_exit();
}

console.notice("\n************************************* [%s] %s %s *************************************\n", defaultNet.name, plugin, option);
cmds[plugin][option]();
console.notice("\n************************************* [%s] %s %s *************************************\n", defaultNet.name, plugin, option);