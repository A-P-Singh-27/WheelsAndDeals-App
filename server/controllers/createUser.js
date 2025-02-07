const user = require("../models/userModel");

exports.RegisterUser = async (req, res) => {
    try {
        const { name, email, pic } = req.body;
        // console.log("File is =>", pic);

        // console.log(name,email,password);
        if (!name || !email || !pic) {

            return res.status(400).json({
                success: false,
                message: "All field are not filled correctly."
            });
        }




        const userExist = await user.findOne({ email });
        // console.log(userExist);

        if (userExist) {
            return res.status(201).json({
                success: true,
                message: "User already exist.",
                data:userExist

            })
        }

        const newUser = await user.create({ name, email, pic});

        if (newUser) {
            return res.status(200).json({
                success: true,
                message: "User registered succesfully",
                data: newUser
            });
        }

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "User registration Failure."
        });
    }


}