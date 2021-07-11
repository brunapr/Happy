import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

import Image from './Image';

@Entity('orphanages') // ao fazer isso ele associa a classe a tabela orphanages 
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;
    
    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert', 'update']
    })
    // referencia a coluna que armazena o relacionamento de orfanato com imagens
    @JoinColumn({name: 'orphanage_id' })     
    images: Image[];
    
}