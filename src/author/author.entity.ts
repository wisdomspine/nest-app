import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false})
    author: string;

    @Column({type: "date", nullable: true})
    birthday: Date;
}