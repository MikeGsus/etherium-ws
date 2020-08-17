const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction

const URL = 'https://ropsten.infura.io/v3/64a393f4d10449a58efa5dcb12e9d2dc'

const web3 = new Web3(URL)

// Create eth account
// console.log(web3.eth.accounts.create())

const privateKey = Buffer.from('0583130344549c67da0fdf90df2caa12a7b4d080a91f633176469c84f59a121a', 'hex')
const address = '0x08866Cd697B150Bd4d549a2b59b2b21B6FC7e4Ff'

const habacuc = '0x114d2CDC9Bc2d8f1018500F0f33F25460360128a'

// Get ether balance
// web3.eth.getBalance(address, (err, bal) => {
//   if (err) console.error(err)
//   {balance = bal}
//   etherBalance = web3.utils.fromWei(balance, 'ether')
//   console.log('Balance in Wei: ', balance)
//   console.log('Balance in Either: ', etherBalance)
// })

web3.eth.getTransactionCount(address, (err, txCount) => {
  if (err) console.error(err)
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: habacuc,
    value: web3.utils.toHex(web3.utils.toWei('0.5', 'ether')),
    gasLimit: web3.utils.toHex(22000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }
  const txTest = new Tx(txObject, {chain: 'ropsten'})
  
  txTest.sign(privateKey)

  const serializedTx = txTest.serialize()

  let raw = '0x' + serializedTx.toString('hex')

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    if (err) console.error(err)
    console.log('txHash: ', txHash)
  })
})