import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("verificationTokens")
class VerificationToken {
  @PrimaryColumn("varchar", { length: 32, nullable: false })
  public readonly token: string;

  @Column({ type: "timestamptz", nullable: false })
  public readonly expires_at: Date;

  constructor(token: string, expires_at: Date) {
    this.token = token;
    this.expires_at = expires_at;
  }
}

export default VerificationToken;
