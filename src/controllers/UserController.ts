import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import * as Joi from 'joi';

export const newUser = async (req: Request, res: Response) => {
    const {error} = validate(req.body);
    if (error)
    return res
        .status(400)
        .json({ success: false, message: error.details[0].message, data: [] });
    
    //Get parameters from the body
    let { email, username, password, first_name, last_name } = req.body;
    let user = new User();
    user.email = email;
    user.username = username;
    user.password = password;
    user.first_name = first_name;
    user.last_name = last_name;
    
    //Hash the password, to securely store on DB
    user.hashPassword();
  
    //Try to save. If fails, the username is already in use
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      return res.status(400)
        .json({
            success:false,
            message:'username already exists',
            data:{},
        });
    }
  
    //If all ok, send 201 response
    res.status(200)
        .json({ success: true, message: '', 
        data: {user:
            {email:user.email, username:user.username}
        }});;
};
  
const validate = (user) => {
    const schema = Joi.object({
      email: Joi.string().min(5).max(60).email().required(),
      username: Joi.string().min(5).max(60).required(),
      password: Joi.string().min(5).max(255).required(),
      first_name: Joi.string().min(5).max(60),
      last_name: Joi.string().min(5).max(60),
    });
    return schema.validate(user);
};