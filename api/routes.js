'use strict';
module.exports = function (app) {
  let blockchainCtrl = require('./controllers/BlockChainController');
  // let webHookCtrl = require('./controllers/WebHookController');

  app.route('/')
    .get(blockchainCtrl.getHealthServer)

  // todoList Routes
  app.route('/blockchain/getNewWallet')
    .get(blockchainCtrl.getNewWallet)

  // get balance
  app.route('/blockchain/getBalanceOfUSDT/:address')
    .get(blockchainCtrl.getBalanceOfUSDT)

  // tranferUSDT
  app.route('/blockchain/tranferUSDT')
    .get(blockchainCtrl.tranferUSDT)

  // confirmTransactions
  // app.route('/webhook/confirmTransaction/:transactionHash')
  //   .get(webHookCtrl.confirmTransactions)
};
