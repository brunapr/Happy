import orphanageView from '../views/orphanages_view';
import Orphanage from '../models/Orphanage';
import { Request, Response } from 'express';
import * as Yup from 'yup';

import { getRepository } from 'typeorm'; 
/* getRepository é um pattern de operação do banco de dados 
ele determina como que deve ser feito a criação, entre outros comandos de um objeto para o bd */


export default {

    async showOrphanage(request: Request, response: Response) {

        const { id } = request.params; 

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {relations: ['images']})

        return response.json(orphanageView.render(orphanage));
    },

    async listOrphanages(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.json(orphanageView.renderMany(orphanages));
    },

    async createOrphanages(request: Request, response: Response){

        const { 
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;
        
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required('Latitude obrigatória'),
            longitude: Yup.number().required('Longitude obrigatória'),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schema.validate(data, {
            abortEarly: false,
        });
        
        const orphanage = orphanagesRepository.create(data);
        
        await orphanagesRepository.save(orphanage);
        
        return response.status(201).json([{ message: `O orfanato ${orphanage.name} foi criado com sucesso`}, orphanage]);
        
    }
}
    