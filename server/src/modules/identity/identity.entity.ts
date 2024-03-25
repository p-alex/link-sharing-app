import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../user/user.entity";

export const OAUTH_PROVIDERS = ["google", "github", "discord", "linkedin"] as const;
export type OAuthProvidersType = (typeof OAUTH_PROVIDERS)[number];

@Entity("identities")
class Identity {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Column("uuid")
  public readonly userId: string;

  @Column("enum", { enum: OAUTH_PROVIDERS })
  public readonly provider: OAuthProvidersType;

  @CreateDateColumn({ type: "timestamptz" })
  public readonly created_at: Date;

  @ManyToOne(() => User, (user) => user.identities, { onDelete: "CASCADE" })
  public readonly user: User;

  constructor(
    id: string,
    userId: string,
    user: User,
    provider: OAuthProvidersType,
    created_at: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.provider = provider;
    this.created_at = created_at;
    this.user = user;
  }
}

export default Identity;
