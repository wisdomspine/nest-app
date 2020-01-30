import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 500})
    name: string;

    @Column({type: "text"})
    description: string;

    @Column()
    filename: string;

    @Column({type: "int"})
    views: number;

    @Column({type:"boolean"})
    isPublished: boolean;
}
