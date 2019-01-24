const FIBOS = require('fibos.js');


module.exports = {
	random: () => {
		function _random(randomFlag, min, max) {
			let str = "",
				range = min,
				arr = ['1', '2', '3', '4', '5', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
			if (randomFlag) {
				range = Math.round(Math.random() * (max - min)) + min;
			}

			for (let i = 0; i < range; i++) {
				const pos = Math.round(Math.random() * (arr.length - 1));
				str += arr[pos];
			}
			return str;
		}

		let result = {};

		result["Account Name"] = _random(false, 12);

		result["Private Key"] = FIBOS.modules.ecc.randomKeySync();
		result["Public Key"] = FIBOS.modules.ecc.privateToPublic(result["Private Key"]);

		return result;
	}
}