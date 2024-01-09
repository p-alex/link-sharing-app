import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Session from "../session/session.entity";
import Link from "../link/link.entity";
import Identity from "../identity/identity.entity";

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

  @OneToMany(() => Identity, (identity) => identity.user)
  public readonly identities: Identity[];

  @CreateDateColumn({ type: "timestamptz", nullable: false })
  public created_at: Date;

  @UpdateDateColumn({ nullable: false })
  public modified_at: Date;

  @Column("bool", { default: false })
  public readonly is_email_verified: boolean;

  constructor(
    id: string,
    email: string,
    password: string,
    sessions: Session[],
    links: Link[],
    identities: Identity[],
    created_at: Date,
    modified_at: Date,
    is_email_verified: boolean,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.sessions = sessions;
    this.links = links;
    this.identities = identities;
    this.created_at = created_at;
    this.modified_at = modified_at;
    this.is_email_verified = is_email_verified;
  }
}

export default User;
