# js4dapp

js4dapp 是一个快速解决 FIBOS 合约开发的脚手架，支持 Windows 以及 Linux。

[√] 快速搭建一个可以调试的 Dapp 合约环境

[√] 快速导入一个合约

[√] 便捷工具：生成公私钥等


## 安装说明

安装 FIBJS

```
curl -s http://fibjs.org/download/installer.sh | sh
```

安装 js4dapp

```
npm install js4dapp -g
```


## 使用说明

```
Usage: js4dapp [plugin] [option] [params]

Plugins Options:

	dapp,
		create,		create dapp (create [dapp-work-path])
		import,		import dapp (import [dapp-name])
		setabi,		setabi (setabi [abi path] [testnet/mainnet])
		setcode,	setcode (setcode [abi path] [testnet/mainnet])

	net,
		ls,			output js4dapp network
		add,		add define network(--todo)

	wallet,
		import,		import account(--todo)
		random,		random account

	help,			output usage information
```


### dapp 使用说明

搭建一个 Dapp 环境

```
jsd4pp dapp create hello
```

```

************************************* dapp create *************************************

[√] create: hello/
[√] create: hello/conf.json
[√] create: hello/test/
[√] create: hello/test/index.js
[√] create: hello/contracts/
[√] create: hello/contracts/example.js
[√] create: hello/abi_example.json

************************************* dapp create *************************************
```


从区块上导入一个合约，智能区分 JS 合约以及 WASM 合约。

```
js4dapp dapp import mailmailmail
```

```
************************************* dapp import *************************************

[testnet]http://testnet.fibos.fo:8870

[mainnet]http://to-rpc.fibos.io:8870

Choose Network:mainnet

Network:mainnet(http://to-rpc.fibos.io:8870)


[√] create: mailmailmail/
[√] create: mailmailmail/conf.json
[√] create: mailmailmail/test/
[√] create: mailmailmail/test/index.js
[√] create: mailmailmail/contracts/
[√] create: mailmailmail/contracts/example.js
[√] create: mailmailmail/abi_example.json
[√] import ABI: Success!
[√] import CODE: WASM Contract Success!

************************************* dapp import *************************************
```

目录结构：

```
mailmailmail
├── abi.json
├── abi_example.json
├── conf.json
├── contracts
│   ├── example.js
│   └── index.wasm
└── test
    └── index.js

2 directories, 6 files
```

### net 使用说明

```
jsd4pp dapp net ls
```

```
************************************* net ls *************************************

{
  "testnet": {
    "chainId": "68cee14f598d88d340b50940b6ddfba28c444b46cd5f33201ace82c78896793a",
    "httpEndpoint": "http://testnet.fibos.fo:8870"
  },
  "mainnet": {
    "chainId": "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
    "httpEndpoint": "http://to-rpc.fibos.io:8870"
  }
}

************************************* net ls *************************************
```

### wallet 使用说明

```
js4dapp wallet random
```

```
************************************* wallet random *************************************

Account Name : nklh5rdu3u5k

Private Key : 5JNR3Ww6P4ci2q373pGhXS4Jn9AZEzD7pnP1pDs7tJd2mBg8YLy

Public Key : FO8AkbgH8TCFugPfsHNdrH6so4Qdy62Up9KqTFwtuTh88Dc1hN7U


************************************* wallet random *************************************
```