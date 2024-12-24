import User from "../model/userSchema.js";
import { hashPassword, isMatch } from "./auth.js";

export const signUpHandler = async (req, res) => {
    try {
        const { name, email, password, cpassword, userType } = req.body;
        if (!name) {
           return res.json({
                error: "please enter name"
            });
        }
        if (!email) {
           return res.json({
                error: "please enter email"
            });
        }
        if (!password || password.length < 6) {
           return res.json({
                error: "password is requred atleast of 6 length"
            });
        }
        if (password !== cpassword) {
           return res.json({
                error: "password mismatch"
            });
        }
        const user = await User.findOne({ email });
        if (user) {
           return res.json({
                error: "user is existing"
            });
        }
        await User.create({
            name, email, password: await hashPassword(password), userType
        });
       return res.status(201).json(req.body);

    } catch (e) {
        console.log("internal error")
    }
}

export const loginHandler = async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: "user not found"
            });
        }
        const ismatch = await isMatch(password, user.password)
        if (!ismatch) {
           return res.json({
                error: "password did not match"
            })
          
        }
        return res.status(200).json(user)


    } catch (e) {
        console.log("internal error",e)
    }
}