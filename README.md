# js4dapp

js4dapp 是一个快速解决 FIBOS 合约开发的脚手架，帮助开发者解决开发、部署、管理、调试环节的困难，支持 Windows 以及 Linux 环境。

它可以让你：

[√] 快速搭建一个 Dapp 合约编码环境，立刻进入！

[√] 快速从区块链上导入一个 Dapp 合约，立刻阅读！

[√] 快速部署 Dapp 合约，包括 ABI 文件以及 Contracts 合约

[√] 提供便捷的区块网络 network 的管理

[√] 提供简易的钱包 wallet 功能


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
		create,		create dapp (create [dapp_work_path])
		import,		import dapp (import [dapp name])
		setabi,		setabi (setabi [abi_path])
		setcode,	setcode (setcode [code_path])

	net,
		ls,		output js4dapp network
		add,		add define network
		use,		use default network

	wallet,
		import,		import account
		random,		random account

	test,			run test case（test [case path]）

	help,			output usage information
```


## 应用场景

###  快速开始一个 Dapp 开发之旅

1. 一键搭建

一键搭建一个 Dapp 编码环境，无需创建目录、安装 package 包，自动生成默认代码。至少节省 20分钟时间！


```
~ $: js4dapp dapp create hello
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

自动生成部分源码，目录结构如下：

```
hello
├── abi_example.json
├── conf.json
├── contracts
│   └── example.js
└── test
    └── example.js

2 directories, 4 files
```

2. 快速部署

让我们来尝试发布一下 ABI 文件，默认 js4dapp 启用 [testnet 网络](https://testnet.fibos.fo/#/)

```
~ $: cd hello;
~ $: js4dapp dapp setabi abi_example.json
```

输出：

```

************************************* [testnet] dapp setabi *************************************

account: zijpooldpwjb
prikey: "私钥"

[setabi Result]Success!broadcast:true

transaction_id:080644552240ad9ae3dc9e26f1121f00ba9894c205232da867a67b98034a3e1e

************************************* [testnet] dapp setabi *************************************
```

发布合约代码：

```
~ $: js4dapp dapp setcode contracts
```

输出：

```

************************************* [testnet] dapp setcode *************************************

account:zijpooldpwjb
prikey:5JzSUgELnzieMiWfEo4kef5BqUxj5kSNxjWT5bRKFcGrUefynRg
[setcode Result]Success!
broadcast:true
transaction_id:5d59cc6b30e2c104429fc918765fe07876576d6257a003514d3ac9cd0292ebb6

************************************* [testnet] dapp setcode *************************************
```

### 快速导入一个 Dapp 合约

经常会遇到需要阅读其他开发者的合约代码，那么 js4dapp import 功能非常便捷。从区块上导入一个合约，并且导入可以智能区分 JS 合约以及 WASM 合约。

让我们切换一下区块网络到主网 mainnet，进行导入：

```
~ $: js4dapp net use mainnet
```

输出：

```
************************************* [testnet] net use *************************************

[ ] localnet --- http://127.0.0.1:8870
[ ] testnet --- http://testnet.fibos.fo:8870
[*] mainnet --- http://to-rpc.fibos.io:8870

************************************* [testnet] net use *************************************
```

开始从主网导入一个合约：
```
~ $: js4dapp dapp import eth2fibosgtw
```


输出日志：

```
************************************* [mainnet] dapp import *************************************


[√] create: eth2fibosgtw/
[√] create: eth2fibosgtw/conf.json
[√] create: eth2fibosgtw/test/
[√] create: eth2fibosgtw/test/example.js
[√] create: eth2fibosgtw/contracts/
[√] create: eth2fibosgtw/contracts/example.js
[√] create: eth2fibosgtw/abi_example.json
[√] import ABI: Success!
[√] import CODE: JS Contract Success!

************************************* [mainnet] dapp import *************************************
```


### 区块主网网络管理

1. 查看网络情况

```
~ $: js4dapp dapp net ls
```

```
************************************* [mainnet] net ls *************************************

[ ] localnet --- http://127.0.0.1:8870
[ ] testnet --- http://testnet.fibos.fo:8870
[*] mainnet --- http://to-rpc.fibos.io:8870

************************************* [mainnet] net ls *************************************
```


2. 切换网络


```
~ $: js4dapp net use testnet
```

```
************************************* [mainnet] net use *************************************

[ ] localnet --- http://127.0.0.1:8870
[*] testnet --- http://testnet.fibos.fo:8870
[ ] mainnet --- http://to-rpc.fibos.io:8870

************************************* [mainnet] net use ************************************
```


3. 修改/自定义网络

```
~ $: js4dapp net add testnet http://se-rpc.fibis.io:8879
```

```
************************************* [localnet] net add *************************************

[*] localnet --- http://127.0.0.1:8870
[ ] testnet --- http://se-rpc.fibis.io:8879
[ ] mainnet --- http://to-rpc.fibos.io:8870

************************************* [localnet] net add *************************************
```

### wallet 管理


#### 1. 快速生成一个随机账户

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