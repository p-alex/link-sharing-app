import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../user/user.entity";

export const OAUTH_PROVIDERS = ["google", "github", "discord", "linkedin"] as const;
export type OAuthProvidersType = (typeof OAUTH_PROVIDERS)[number];

@Entity("identities")
class Identity {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @ManyToOne(() => User, (user) => user.identities, { onDelete: "CASCADE" })
  public readonly user: User;

  @Column("enum", { enum: OAUTH_PROVIDERS })
  public readonly provider: OAuthProvidersType;

  @CreateDateColumn({ type: "timestamptz" })
  public readonly created_at: Date;

  constructor(id: string, user: User, provider: OAuthProvidersType, created_at: Date) {
    this.id = id;
    this.user = user;
    this.provider = provider;
    this.created_at = created_at;
  }
}

export default Identity;
