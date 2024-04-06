"use strict";
const config = require("../../config");
const { ethers } = require("ethers");
var interValTimeOut;
module.exports = {
  getHealthServer: async (req, res) => {
    res.json({
      server: "OK Server"
    });
  },
  getBalanceOfUSDT: async (req, res) => {
    const providerWeb3 = await config.checkMainNetURL;
    console.log(providerWeb3);
    //const wallet = new ethers.Wallet().createRandom();
    let balanceUSDT = await providerWeb3.tokenContract.balanceOf(
      req.params.address
    );
    const balanceBNB = await providerWeb3.providerFromBSC.getBalance(
      req.params.address
    );
    console.log(
      ethers.formatEther(balanceUSDT),
      ethers.formatEther(balanceBNB).substring(0, 6)
    );
    // (balanceUSDT / 10n ** 18n).toString()
    res.json({
      balanceUSDT: ethers.formatEther(balanceUSDT),
      balanceBNB: ethers.formatEther(balanceBNB).substring(0, 6),
    });
  },
  getNewWallet: async (req, res) => {
    let wallet = ethers.Wallet.createRandom();
    res.json({
      address: wallet.address,
      private: wallet.privateKey,
      publickey: wallet.publicKey,
    });
  },
  tranferUSDT: async (req, res) => {
    try {
      const providerWeb3 = await config.checkMainNetURL;
      //let privateKeyAddress = '0xa3589a0c507baa0c60cf4f76c5e721f7a14268552a098e50c7e7242463709271';
      const privateKeyAddress = req.query.privateKeyOfSender
      console.log(privateKeyAddress);
      let wallet = new ethers.Wallet(
        privateKeyAddress,
        providerWeb3.providerFromBSC
      );

      const amount = BigInt(req.query.amount.toString()) * 10n ** 18n;
      let recipientAddress = req.query.toAddress;
      console.log(amount, recipientAddress, wallet.address);
      const approvalTx = await providerWeb3.tokenContract
        .connect(wallet)
        .transfer(recipientAddress, amount);
      console.log(approvalTx.hash);
      interValTimeOut = setInterval(
        () => ConfirmationTransaction(approvalTx.hash),
        2000
      );
      res.json({ result: "ok", transactionHash: approvalTx.hash });
    } catch (error) {
      console.log(error);
      res.json({ FailedtotransferUSDT: error });
    }
  },
};
async function ConfirmationTransaction(transactionHash) {
  const providerWeb3 = await config.checkMainNetURL;
  const transaction = await providerWeb3.providerFromBSC.getTransactionReceipt(
    transactionHash
  );
  console.log(transaction);
  if (transaction?.status === 1) {
    NotifyMe();
  }
}
function NotifyMe() {
  console.log("Token Sent Successfully");
  clearInterval(interValTimeOut);
}
