import { Request, Response } from 'express';
import { Store } from '../../models/store.model';
import { IStoreService } from './IStoreService';

class StoreService implements IStoreService {
  public async saveStores(req: Request, res: Response) {
    try {
      const stores = req.body;
      if (!Array.isArray(stores)) {
        throw new Error('Invalid format');
      }

      await Store.deleteMany({});
      const result = await Store.insertMany(stores);

      res.status(201).json({
        message: 'Tiendas reemplazadas exitosamente.',
        count: result.length,
        stores: result
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async getAllStores(req: Request, res: Response) {
    try {
      const stores = await Store.find();
      res.json(stores);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default StoreService;
