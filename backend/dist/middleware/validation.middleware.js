"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validate;
function validate(schema) {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next();
        }
        catch (err) {
            const zodError = err;
            return res.status(400).json({ errors: zodError.flatten() });
        }
    };
}
