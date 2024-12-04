import express from 'express';
const router = express.Router();
import {exampleController} from '../controllers/controller.js'

router.get('/api/example', exampleController.example1)

export default router;
