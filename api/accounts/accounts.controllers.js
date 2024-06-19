let accounts = require("../../accounts");
const Accounts = require("../../models/Accounts");

exports.accountsGet = async (req, res) => {
  try {
    const accounts = await Accounts.find().select("-createdAt -updatedAt");
    return res.json(accounts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Accounts.create(req.body);
    return res.status(201).json(newAccount);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Accounts.findById(accountId);
    if (foundAccount) {
      await Accounts.updateOne({ _id: accountId }, req.body);
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.accountDelete = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Accounts.findById(accountId);
    if (foundAccount) {
      await Accounts.deleteOne({ _id: accountId });
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(200).json(accountInUsd);
  }
  res.status(200).json(foundAccount);
};
