import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import User from "../database/schemas/User.js";

class UserController {
  async findAll (request: Request, response: Response) {
    try {
      const users = await User.find();

      return response.json(users);
    } catch (error: any) {
      return response.status(500).send({
        error: 'Error happened.',
        message: error.message
      });
    }
  }

  async findOne (request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const hashPassword = await bcrypt.hash(password, 12);

      const user = await User.findOne({
        email,
        password: hashPassword,
      });

      if (!user) {
        console.log('m3er');
        return response.status(404).send({
          error: 'Not found',
          message: 'Usuário não encontrado'
        });
      }

      return response.json(user);
    } catch (error: any) {
      return response.status(500).send({
        error: 'Error happened.',
        message: error.message
      });
    }
  }

  async create (request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        return response.status(400).send({
          error: 'Ooops',
          message: 'User already exists',
        });
      }

      const user = await User.create({
        name,
        email,
        password
      });

      return response.status(201).json(user);
    } catch(error: any) {
      return response.status(500).send({
        error: 'Registration failed',
        message: error.message
      });
    }
  }
}

export default new UserController;
