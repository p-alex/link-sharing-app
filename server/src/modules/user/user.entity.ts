import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Session from "../session/session.entity";
import Link from "../link/link.entity";

const AUTH_PROVIDERS = ["github", "google", "linkedin", "discord"] as const;

export type OAuthProvidersType = (typeof AUTH_PROVIDERS)[number];

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Column("varchar", { length: 64, unique: true, nullable: false })
  public readonly email: string;

  @Column("varchar", { length: 60, nullable: false })
  public readonly password: string;

  @OneToMany(() => Session, (session) => session.user)
  public readonly sessions: Session[];

  @OneToMany(() => Link, (link) => link.user)
  public readonly links: Link[];

  @Column("bigint", { default: Date.now(), nullable: false })
  public created_at: number;

  @Column("bigint", { default: Date.now(), nullable: false })
  public modified_at: number;

  @Column("enum", { enum: AUTH_PROVIDERS, nullable: true })
  public readonly auth_provider: OAuthProvidersType;

  @Column("bool", { default: false })
  public readonly is_email_verified: boolean;

  constructor(
    id: string,
    email: string,
    password: string,
    sessions: Session[],
    links: Link[],
    created_at: number,
    modified_at: number,
    auth_provider: OAuthProvidersType,
    is_email_verified: boolean,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.sessions = sessions;
    this.links = links;
    this.created_at = created_at;
    this.modified_at = modified_at;
    this.auth_provider = auth_provider;
    this.is_email_verified = is_email_verified;
  }
}

export default User;
