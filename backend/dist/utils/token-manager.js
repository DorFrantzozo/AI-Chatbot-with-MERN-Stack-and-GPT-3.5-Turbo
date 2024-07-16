import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[COOKIE_NAME];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token not provided" });
    }
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(decoded);
                }
            });
        });
        console.log("Token Verification Successful");
        res.locals.jwt = decoded;
        return next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Unauthorized / Token expired" });
    }
};
//# sourceMappingURL=token-manager.js.map