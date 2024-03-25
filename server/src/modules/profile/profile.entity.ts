import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "../user/user.entity";

export const FIRST_NAME_MAX_LENGTH = 18;
export const LAST_NAME_MAX_LENGTH = 18;
export const FIRST_NAME_MIN_LENGTH = 2;
export const LAST_NAME_MIN_LENGTH = 2;

@Entity("profiles")
class Profile {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Column("uuid")
  public readonly userId: string;

  @Column("varchar", { length: 255, default: "" })
  public profilePicture: string | null;

  @Column("varchar", { length: FIRST_NAME_MAX_LENGTH, default: "" })
  public firstName: string | null;

  @Column("varchar", { length: LAST_NAME_MAX_LENGTH, default: "" })
  public lastName: string | null;

  @Column("varchar", { length: 64, default: "" })
  public publicEmail: string | null;

  @CreateDateColumn({ type: "timestamptz" })
  public readonly createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  public readonly updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile, { onDelete: "CASCADE" })
  public readonly user: User;

  constructor(
    id: string,
    userId: string,
    profilePicture: string,
    firstName: string,
    lastName: string,
    publicEmail: string,
    createdAt: Date,
    updatedAt: Date,
    user: User,
  ) {
    this.id = id;
    this.userId = userId;
    this.profilePicture = profilePicture;
    this.firstName = firstName;
    this.lastName = lastName;
    this.publicEmail = publicEmail;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
  }
}

export default Profile;
