import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import User from "../user/user.entity";

@Entity("securityTokens")
class SecurityToken {
  @PrimaryColumn("uuid")
  public readonly userId: string;

  @PrimaryColumn("varchar", { length: 64, unique: true, nullable: false })
  public readonly token: string;

  @ManyToOne(() => User, (user) => user.securityTokens, { onDelete: "CASCADE" })
  public readonly user: User;

  @Column({ type: "timestamptz", nullable: false })
  public readonly expires_at: Date;

  constructor(userId: string, token: string, user: User, expires_at: Date) {
    this.userId = userId;
    this.token = token;
    this.user = user;
    this.expires_at = expires_at;
  }
}

export default SecurityToken;
