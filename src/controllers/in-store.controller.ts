import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { DocumentInStore } from '../models/in-store.model';
import responses from '../helpers/responses';
import inStoreService from '../db/in-store.service';

const findAllInStore = async (req: Request, res: Response) => {
  try {
    const allInStore: DocumentInStore[] = await inStoreService.findAll(req.query);
    return responses.success(res, StatusCodes.OK, allInStore);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const findInStoreById = async (req: Request, res: Response) => {
  try {
    const productInStore: DocumentInStore =
            await inStoreService.findById(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, productInStore);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const addProductToStore = async (req: Request, res: Response) => {
  try {
    const productInStore: DocumentInStore = await inStoreService.addToStore(
            req.body
        );
    return responses.success(res, StatusCodes.OK, productInStore);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const updateProductInStore = async (req: Request & { body: DocumentInStore }, res: Response) => {
  try {
    const productInStore: DocumentInStore = await inStoreService.update(
            new Types.ObjectId(req.params.id), req.body
        );
    return responses.success(res, StatusCodes.OK, productInStore);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const removeProductFromStore = async (req: Request, res: Response) => {
  try {
    const removedProduct: DocumentInStore =
            await inStoreService.removeFromStore(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, removedProduct);
  } catch (error) {
    return responses.fail(res, error);
  }
};

export default {
  removeProductFromStore, updateProductInStore, addProductToStore,
  findInStoreById, findAllInStore
};