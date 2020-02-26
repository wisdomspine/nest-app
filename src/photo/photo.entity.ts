import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, RelationId, JoinTable } from "typeorm";
import { Author } from "src/author/author.entity";
import { Expose } from "class-transformer";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 500})
    name: string;

    @Column({type: "text"})
    description: string;

    @Column({type: "int", default: 0})
    views: number;

    @Column({type:"boolean", default: true})
    isPublished: boolean;

    @Column({type: "varchar", nullable: false})
    filename: string;

    @ManyToMany(type => Author)
    @JoinTable()
    authors: Author[];
    

    @RelationId("authors")
    authorsIds: number[];

    @Expose()
    get slug(): string {
        return "777777777777777";
    }
}