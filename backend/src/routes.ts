import { Router } from 'express';

import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);
const cors = require('cors');

routes.post('/createOrphanages', cors(), upload.array('images'), OrphanagesController.createOrphanages)
routes.get('/listOrphanages', cors(), OrphanagesController.listOrphanages)
routes.get('/showOrphanage/:id', cors(), OrphanagesController.showOrphanage)
    
export default routes;