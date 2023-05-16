import { Request, Response } from "express";
import Role from "../database/schemas/Role.js";

class RoleController {
  async findAll (request: Request, response: Response) {
    try {
      const roles = await Role.find();

      return response.json(roles);
    } catch (error: any) {
      return response.status(500).send({
        error: 'Error happened.',
        message: error.message
      });
    }
  }
}

export default new RoleController;
