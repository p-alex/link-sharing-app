import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import User from "../user/user.entity";

@Entity("securityCodes")
class SecurityCode {
  @PrimaryColumn("uuid")
  public readonly userId: string;

  @PrimaryColumn("varchar", { length: 6, nullable: false })
  public readonly code: string;

  @Column("timestamptz", { nullable: false })
  public readonly expires_at: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  public readonly user: User;

  constructor(userId: string, user: User, code: string, expires_at: Date) {
    this.userId = userId;
    this.code = code;
    this.expires_at = expires_at;
    this.user = user;
  }
}

export default SecurityCode;
