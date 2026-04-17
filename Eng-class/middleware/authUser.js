import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.mycookie;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token required"
            })
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;

        next()
    } catch (error) {
        console.log(error); // 🔥 add this for debugging
        res.status(401).json({
            success: false,
            message: "invalid token"
        })
    }
}

export default authUser;