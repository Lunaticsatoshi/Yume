import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Index,
  BeforeInsert,
} from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { Field } from 'type-graphql';
import { v4 as uuidv4 } from "uuid";

export default abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'uuid', unique: true })
  @Index()
  _id: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateId() {
    this._id = uuidv4();
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
