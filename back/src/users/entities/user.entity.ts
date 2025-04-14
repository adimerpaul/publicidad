import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  @Expose() // Agregar para asegurar que se incluya en la transformación
  id: number;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  role: string;

  @Column()
  @Expose()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  // @OneToMany(() => Sale, (sale) => sale.user)
  // sales: Sale[];
  //
  // @OneToMany(() => Documento, (documento) => documento.user)
  // documentos: Documento[];
}
