const query = (schema) => {
    return (req, res, next) => {
        const ValidatorResult = schema.validate(req.body);
        if(ValidatorResult.error){
            return res.status(400).json(ValidatorResult.error.details);
        }
        if(!req.query)
            req.query = {};
        const obj = Object.assign( ValidatorResult.value, req.query);
        req.query = obj;
        next();
    }
}
const body = (schema) => {
    return (req, res, next) => {
        const ValidatorResult = schema.validate(req.body);
        if (ValidatorResult.error) {
            return res.status(400).json(ValidatorResult.error.details);
        }
        else {
            if (!req.value)
                req.value = {};
            if (!req.value['body'])
                req.value.body = {};
            const obj = Object.assign(req.value.body, ValidatorResult.value);
            req.value.body = obj;
            next();
        }
    }
}
module.exports = { 
    query,
    body
}