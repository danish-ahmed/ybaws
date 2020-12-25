import { Request, Response } from 'express';
import {getRepository} from 'typeorm';
import * as Joi from 'joi';

import {User} from '../entity/User';

export const login = async (req: Request, res: Response) => {
    const {error} = validate(req.body);
    if (error)
    return res
        .status(400)
        .json({ success: false, message: error.details[0].message, data: [] });
    
    let { username, password } = req.body;
    
    //Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(400).json({
          success:false,
          message:'Username or password invalid',
          data:{}
      });
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        return res
        .status(400)
        .json({ success: false, message: 'Username or password invalid', data: {} });
    }

    //Sing JWT, valid for 1 hour
    const token = user.generateToken();

    //Send the jwt in the response
    return res
        .status(200)
        .json({ 
            success: false,
            message: '', 
            data: {
                token
            } 
        });

};

export const logout = async (req: Request, res: Response) => {
  
};

const validate = (user) => {
    const schema = Joi.object({
      username: Joi.string().min(5).max(60).required(),
      password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(user);
};
