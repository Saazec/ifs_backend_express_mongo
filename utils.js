const jwt = require('jsonwebtoken');

module.exports = {
    validateToken: (req, res, next) => {
        const authorizationHeader = req.headers.authorization;
        let result;
        if (authorizationHeader) {
            //  authorization will come in the form of "authorization: 'bearer <token>'"
            const token = req.headers.authorization.split(' ')[1];
            const options = {
                expiresIn: '2d',
                issuer: 'https://scotch.io'
            };

            try {
                // verify makes sure that the token has not expired and was issued by us (issuer).
                result = jwt.verify(token, process.env.JWT_SECRET, options);

                // passing back the decoded token to request object

                req.decoded = result;
                next();
            } catch (err) {
                throw new Error(err);
            }
        } else {
            result = {
                error: `Authentication error. Token required`,
                status: 401
            };
            res.status(401).send(result);
        }
    }
}