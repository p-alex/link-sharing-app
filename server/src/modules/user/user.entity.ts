import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Session from "../session/session.entity";

const AUTH_PROVIDERS = ["github", "google", "linkedin", "discord"] as const;

export type AuthProvidersType = (typeof AUTH_PROVIDERS)[number];

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

  @Column("bigint", { default: Date.now(), nullable: false })
  public created_at: number;

  @Column("bigint", { default: Date.now(), nullable: false })
  public modified_at: number;

  @Column("enum", { enum: AUTH_PROVIDERS, nullable: true })
  public readonly auth_provider: AuthProvidersType;

  constructor(
    id: string,
    email: string,
    password: string,
    sessions: Session[],
    created_at: number,
    modified_at: number,
    auth_provider: AuthProvidersType,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.sessions = sessions;
    this.created_at = created_at;
    this.modified_at = modified_at;
    this.auth_provider = auth_provider;
  }
}

export default User;
