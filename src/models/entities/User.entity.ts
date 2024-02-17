import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ unique: true, default: "" })
  email: string = "";

  @Column({ default: "" })
  name: string = "";

  @Column({ type: "text" })
  password: string = "";

  @CreateDateColumn()
  createdDate?: string;

  @UpdateDateColumn()
  updatedDate?: string;

  @DeleteDateColumn()
  deletedDate?: string;
}
