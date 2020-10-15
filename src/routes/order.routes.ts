import express, { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { protectMiddleware } from '../middlewares/protected.middleware';
import { isOwnerMiddleware } from '../middlewares/is-owner.middleware';
import orderController from '../controllers/order.controller';

const router: Router = express.Router();

router
    .route('/')
    .get(authMiddleware, protectMiddleware, orderController.findAllOrders)
    .post(authMiddleware, orderController.createOrder);

router
    .route('/:id')
    .delete(authMiddleware, protectMiddleware, orderController.deleteOrder)
    .get(authMiddleware, isOwnerMiddleware, orderController.findOrderById)
    .patch(authMiddleware, protectMiddleware, orderController.updateOrder);

router
    .route('/status/:status')
    .get(authMiddleware, protectMiddleware, orderController.findOrdersByStatus)

router
    .route('/customer/:id')
    .get(authMiddleware, protectMiddleware, orderController.findOrdersByCustomer)

router.route('/my').get(authMiddleware, orderController.findMyOrders)

export default router;
