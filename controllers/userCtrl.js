const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "이미 존재하는 이메일 입니다" });
        
      if (password.length < 6)
        return res.status(400).json({ msg: "비밀번호 6자리 이상" });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });
      await newUser.save();

      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
      try{
        const {email, password} = req.body;

        const user = await Users.findOne({email})
        if(!user) return res.status(400).json({ msg: "이메일이 존재하지 않습니다" });
  
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다" });
  
        const accesstoken = createAccessToken({ id: user._id });
        const refreshtoken = createRefreshToken({ id: user._id });
  
        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        });

        res.json({accesstoken} )

      }catch(err){
        return res.status(500).json({ msg: err.message });
      }
  },
  logout: async (req, res) => {
    try{
        res.clearCookie('resfreshtoken', {path: '/user/refresh_token'})
        return res.json({msg: "로그아웃"})

    }catch (err) {
        return res.status(500).json({ msg: err.message });
      }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "로그인 및 계정을 생성해 주세요" });

      jwt.verify(rf_token, process.env.REFRESS_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "로그인 및 계정을 생성해 주세요" });
        const accesstoken = createAccessToken({ id: user.id }); 

        res.json({user, accesstoken});
      });

      //   res.json({ rf_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password')
        if(!user) return res.status(400).json({ msg: "아이디가 정확하지 않습니다" });

        res.json(user)
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
  }
}
  const createAccessToken = user => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
  };
  const createRefreshToken = user => {
    return jwt.sign(user, process.env.REFRESS_TOKEN_SECRET, { expiresIn: "1d" });
  };
  
  module.exports = userCtrl;
  