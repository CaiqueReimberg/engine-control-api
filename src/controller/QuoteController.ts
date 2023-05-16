import { Request, Response } from "express";
import Quote from "../database/schemas/Quote.js";
import mongoose from "mongoose";
import { QuoteProps } from "../interfaces/QuoteProps.interface.js";

class QuoteController {
  async findAll (request: Request, response: Response) {
    try {
      const quotes = await Quote.find({
        approved: false,
      });

      return response.json(quotes);
    } catch (error: any) {
      return response.status(500).send({
        error: 'Error happened.',
        message: error.message
      });
    }
  }

  async findOne (request: Request, response: Response) {
    try {
      const { id } = request.body;

      const quote = await Quote.findOne({
        id
      });

      if (!quote) {
        return response.status(404).send({
          error: 'Not found',
          message: 'Cotação não encontrada'
        });
      }

      return response.json(quote);
    } catch (error: any) {
      return response.status(500).send({
        error: 'Error happened.',
        message: error.message
      });
    }
  }

  async create (request: Request, response: Response) {
    try {
      const quoteData: QuoteProps = request.body;

      const quote = await Quote.create({
        ...quoteData
      });

      return response.status(201).json(quote);
    } catch(error: any) {
      return response.status(500).send({
        error: 'Registration failed',
        message: error.message
      });
    }
  }

  async approveQuote (request: Request, response: Response) {
    try {
      const { id } = request.params;

      const quote = await Quote.findById(id);

      if (!quote) {
        return response.status(404);
      }
      console.log(quote._id);
      await Quote.findOneAndUpdate({_id: quote._id}, {
        approved: true,
        status: 'prod',
      });

      const newQuote = await Quote.findById(id);

      return response.status(200).json(newQuote);
    } catch(error: any) {
      return response.status(500).send({
        error: 'Registration failed',
        message: error.message
      });
    }
  }

  async approveProd (request: Request, response: Response) {
    try {
      const { id } = request.params;

      const quote = await Quote.findById(id);

      if (!quote) {
        return response.status(404);
      }
      console.log(quote._id);
      await Quote.findOneAndUpdate({_id: quote._id}, {
        status: 'quality',
      });

      const newQuote = await Quote.findById(id);

      return response.status(200).json(newQuote);
    } catch(error: any) {
      return response.status(500).send({
        error: 'Registration failed',
        message: error.message
      });
    }
  }

  async approveQuality (request: Request, response: Response) {
    try {
      const { id } = request.params;

      const quote = await Quote.findById(id);

      if (!quote) {
        return response.status(404);
      }

      await Quote.findOneAndUpdate({_id: quote._id}, {
        status: 'finished',
      });

      const newQuote = await Quote.findById(id);

      return response.status(200).json(newQuote);
    } catch(error: any) {
      return response.status(500).send({
        error: 'Registration failed',
        message: error.message
      });
    }
  }

  async findAllProdStatus (request: Request, response: Response) {
    try {
      const quotes = await Quote.find({
        approved: true,
        status: 'prod',
      });

      if (!quotes) {
        return response.status(404);
      }

      return response.status(200).json(quotes);
    } catch(error: any) {
      return response.status(500).send({
        error: 'failed',
        message: error.message
      });
    }    
  }

  async findAllFinishedStatus (request: Request, response: Response) {
    try {
      const quotes = await Quote.find({
        approved: true,
        status: 'finished',
      });

      if (!quotes) {
        return response.status(404);
      }

      return response.status(200).json(quotes);
    } catch(error: any) {
      return response.status(500).send({
        error: 'failed',
        message: error.message
      });
    }    
  }

  async findAllQualityStatus (request: Request, response: Response) {
    try {
      const quotes = await Quote.find({
        approved: true,
        status: 'quality',
      });

      if (!quotes) {
        return response.status(404);
      }

      return response.status(200).json(quotes);
    } catch(error: any) {
      return response.status(500).send({
        error: 'failed',
        message: error.message
      });
    }    
  }
}

export default new QuoteController;
