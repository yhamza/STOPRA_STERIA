import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity ({name : 'auths'})
export class AuthEntity{    
    @PrimaryColumn('uuid')
    id: string;
    @Column()
    token : string ;
}

