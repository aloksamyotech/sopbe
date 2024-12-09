import express from 'express';
import asyncWrapper from '../core/config/asyncWrapper.js';  
import { getUser } from '../controllers/customer.js';
// import CustomerController from '../controllers/CustomerController.js'; 

const customerRoutes = express.Router();
router.get('/', asyncWrapper(getUser))
  

// router.post('/', asyncWrapper(async (req, res) => {
//   const newCustomer = await CustomerController.createCustomer(req.body); 
//   res.json({ data: newCustomer });
// }));


export default customerRoutes;
