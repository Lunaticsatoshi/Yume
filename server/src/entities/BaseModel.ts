import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { instanceToPlain, Exclude } from 'class-transformer';

export default abstract class BaseModel extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  invoiceFieldKey?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
