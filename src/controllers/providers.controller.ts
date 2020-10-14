import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { DocumentProvider } from '../models/provider.model';
import providersService from '../db/providers.service';
import responses from '../helpers/responses';

const findAllProviders = async (req: Request, res: Response) => {
  try {
    const providers: DocumentProvider[] = await providersService.findAll(req.query);
    return responses.success(res, StatusCodes.OK, providers);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const findProviderById = async (req: Request, res: Response) => {
  try {
    const provider: DocumentProvider =
      await providersService.findById(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, provider);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const createProvider = async (req: Request, res: Response) => {
  try {
    const newProvider: DocumentProvider = await providersService.create(
      req.body
    );
    return responses.success(res, StatusCodes.OK, newProvider);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const updateProvider = async (req: Request & { body: DocumentProvider }, res: Response) => {
  try {
    const updatedProvider: DocumentProvider = await providersService.update(
      new Types.ObjectId(req.params.id), req.body
    );
    return responses.success(res, StatusCodes.OK, updatedProvider);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const deleteProvider = async (req: Request, res: Response) => {
  try {
    const deletedProvider: DocumentProvider =
      await providersService.deleteProvider(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, deletedProvider);
  } catch (error) {
    return responses.fail(res, error);
  }
};

export default {
  findAllProviders, findProviderById,
  deleteProvider, updateProvider, createProvider
};
