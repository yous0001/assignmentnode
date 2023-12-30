import Joi from "joi";

export const signupschema = {
    body: Joi.object({
        username: Joi.string().required().alphanum().min(5).max(10),
        email: Joi.string().email({tlds:{allow:true}}).required(),
        password: Joi.string().required(),
        age: Joi.number().min(15).max(100),
        gender: Joi.string().valid("male", "female"),
        phone: Joi.string().regex(/^01[0125][0-9]{8}$/)
    })
};
