const Tasks = require("./model.js");
const User = require("./model");
const jwt = require("jsonwebtoken");

const getTasks = async (req, res) => {
  try {
    const allTasks = await Tasks.find({});
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const Task = await Tasks.findById(id);
    res.status(200).json(Task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const Task = await Tasks.create(req.body);
    res.status(200).json(Task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const Task = await Tasks.findByIdAndUpdate(id, req.body);

    if (!Task) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedTask = await Tasks.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const Task = await Tasks.findByIdAndDelete(id);
    if (!Task) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userRegister = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.params;
    let exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).send("User Already Exist");
    }
    if (password !== confirmpassword) {
      return res.status(400).send("Passwords are not matching");
    }
    let newUser = new User({
      username,
      email,
      password,
      confirmpassword,
    });
    await newUser.save();
    res.status(200).send("Register Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.params;
    let exist = await User.findOne({ email });
    if (!exist) {
      return res.status(400).send("User Not Found");
    }
    if (exist.password !== password) {
      return res.status(400).send("Invalid credentials");
    }

    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 36000000000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
};
module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  userRegister,
  userLogin,
};
