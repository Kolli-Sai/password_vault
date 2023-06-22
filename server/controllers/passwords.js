const { Password } = require("../models/Passwords");

const crypto = require("crypto");
const { NotFoundError } = require("../errors/customErrors");

// Encrypt the password
const encryptPassword = (password, secretKey) => {
  const salt = crypto.randomBytes(16); // Generate a random salt
  const key = crypto.scryptSync(secretKey, salt, 32); // Derive a 32-byte key using scrypt

  const iv = crypto.randomBytes(16); // Generate a random initialization vector (IV)
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encryptedPassword = cipher.update(password, "utf8", "hex");
  encryptedPassword += cipher.final("hex");

  return {
    encryptedPassword,
    salt: salt.toString("hex"),
    iv: iv.toString("hex"),
  };
};

// Decrypt the password
const decryptPassword = (encryptedPassword, salt, iv, secretKey) => {
  const key = crypto.scryptSync(secretKey, Buffer.from(salt, "hex"), 32); // Derive the key using scrypt

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    key,
    Buffer.from(iv, "hex")
  );
  let decryptedPassword = decipher.update(encryptedPassword, "hex", "utf8");
  decryptedPassword += decipher.final("utf8");

  return decryptedPassword;
};

const createPassword = async (req, res, next) => {
  const { userId, name } = req.user;
  const { password } = req.body;
  req.body.createdBy = userId;

  try {
    const encryptedData = encryptPassword(password, process.env.CRYPTO_SECRET); // Encrypt the password
    req.body.password = encryptedData.encryptedPassword;
    req.body.salt = encryptedData.salt;
    req.body.iv = encryptedData.iv;

    const data = await Password.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllPasswords = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const passwords = await Password.find({ createdBy: userId });

    // Decrypt passwords
    const decryptedPasswords = passwords.map((password) => {
      const decryptedPassword = decryptPassword(
        password.password,
        password.salt,
        password.iv,
        process.env.CRYPTO_SECRET
      );
      return { ...password.toObject(), password: decryptedPassword };
    });

    res.status(200).json(decryptedPasswords);
  } catch (error) {
    next(error);
  }
};

const getPassword = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const password = await Password.findOne({ createdBy: userId, _id: id });
    console.log(`password ${password}`);
    if (!password) {
      throw new NotFoundError(`There is no password document with id ${id}`);
    }
    const decryptedPassword = decryptPassword(
      password.password,
      password.salt,
      password.iv,
      process.env.CRYPTO_SECRET
    );
    console.log(`decryptedPassword ${decryptedPassword}`);
    password.password = decryptedPassword;

    res.status(200).json(password);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An error occurred" });
    }
  }
};

const updatePassword = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    // Check if req.body includes password
    if (req.body.password) {
      // Encrypt the new password
      const encryptedData = encryptPassword(
        req.body.password,
        process.env.CRYPTO_SECRET
      );
      req.body.password = encryptedData.encryptedPassword;
      req.body.salt = encryptedData.salt;
      req.body.iv = encryptedData.iv;
    }

    const password = await Password.findByIdAndUpdate(
      { createdBy: userId, _id: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!password) {
      throw new NotFoundError(`There is no document with id ${id}`);
    }

    // Decrypt the updated password
    const decryptedPassword = decryptPassword(
      password.password,
      password.salt,
      password.iv,
      process.env.CRYPTO_SECRET
    );
    password.password = decryptedPassword;

    res.status(200).json(password);
  } catch (error) {
    next(error);
  }
};

const deletePassword = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const password = await Password.findByIdAndRemove({
      createdBy: userId,
      _id: id,
    });
    if (!password) {
      throw new NotFoundError(`There is no password document with id ${id}`);
    }
    res.status(200).json(password);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPassword,
  getAllPasswords,
  getPassword,
  updatePassword,
  deletePassword,
};
