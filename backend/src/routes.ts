import { Router } from 'express';

import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);


routes.post('/createOrphanages', upload.array('images'), OrphanagesController.createOrphanages)
routes.get('/listOrphanages', OrphanagesController.listOrphanages)
routes.get('/showOrphanage/:id', OrphanagesController.showOrphanage)
    

export default routes;