import { Request, Response } from "express";
import Client from "../database/schemas/Client.js";
import { ClientProps } from "../interfaces/ClientProps.interface.js";

class ClientController {
  async findAll (request: Request, response: Response) {
    try {
      const clients = await Client.find();

      return response.json(clients);
    } catch (error: any) {
      return response.status(500).send({
        error: 'Error happened.',
        message: error.message
      });
    }
  }

  async findOne (request: Request, response: Response) {
    try {
      const { email, cpf } = request.body;

      const client = await Client.findOne({
        email,
        cpf
      });

      if (!client) {
        return response.status(404).send({
          error: 'Not found',
          message: 'Cliente não encontrado'
        });
      }

      return response.json(client);
    } catch (error: any) {
      return response.status(500).send({
        error: 'Error happened.',
        message: error.message
      });
    }
  }

  async create (request: Request, response: Response) {
    try {
      const clientData: ClientProps = request.body;

      const clientExists = await Client.findOne({
        email: clientData.email
      });

      if (clientExists) {
        return response.status(400).send({
          error: 'Ooops',
          message: 'Cliente já existe',
        });
      }

      const client = await Client.create({
        ...clientData
      });

      return response.status(201).json(client);
    } catch(error: any) {
      return response.status(500).send({
        error: 'Registration failed',
        message: error.message
      });
    }
  }
}

export default new ClientController;
