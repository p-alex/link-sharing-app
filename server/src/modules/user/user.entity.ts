import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Session from "../session/session.entity";
import Link from "../link/link.entity";
import Identity from "../identity/identity.entity";
import SecurityToken from "../securityToken/securityToken.entity";
import Profile from "../profile/profile.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Column("uuid", { nullable: true })
  public readonly profileId: string;

  @Column("varchar", { length: 64, unique: true, nullable: false })
  public readonly email: string;

  @Column("varchar", { length: 60, nullable: false })
  public readonly password: string;

  @CreateDateColumn({ type: "timestamptz", nullable: false })
  public created_at: Date;

  @UpdateDateColumn({ nullable: false })
  public modified_at: Date;

  @Column("bool", { default: false })
  public readonly is_email_verified: boolean;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: ["remove"] })
  @JoinColumn()
  public readonly profile: Profile;

  @OneToMany(() => Session, (session) => session.user)
  public readonly sessions: Session[];

  @OneToMany(() => Link, (link) => link.user)
  public readonly links: Link[];

  @OneToMany(() => Identity, (identity) => identity.user)
  public readonly identities: Identity[];

  @OneToMany(() => SecurityToken, (securityToken) => securityToken.user)
  public readonly securityTokens: SecurityToken[];

  constructor(
    id: string,
    profileId: string,
    email: string,
    password: string,
    created_at: Date,
    modified_at: Date,
    is_email_verified: boolean,
    profile: Profile,
    sessions: Session[],
    links: Link[],
    identities: Identity[],
    securityTokens: SecurityToken[],
  ) {
    this.id = id;
    this.profileId = profileId;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.modified_at = modified_at;
    this.is_email_verified = is_email_verified;
    this.profile = profile;
    this.sessions = sessions;
    this.links = links;
    this.identities = identities;
    this.securityTokens = securityTokens;
  }
}

export default User;
