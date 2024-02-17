import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "text" })
  token: string = "";

  @ManyToOne(() => User, (user) => user.name, { nullable: false })
  user?: User;
}
