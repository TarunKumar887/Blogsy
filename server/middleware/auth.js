import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Authentication failed: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // 1. Verify the token AND capture the decoded data (the payload)
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        
        // 2. Attach the decoded data to the request object for the next function to use
        req.user = decodedPayload;
        
        // 3. Proceed to the next step (e.g., the toggleLike controller)
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Authentication failed: Invalid token" });
    }
};

export default auth;