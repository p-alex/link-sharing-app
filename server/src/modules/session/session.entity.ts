import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../user/user.entity";

@Entity("sessions")
class Session {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: "CASCADE" })
  public readonly user: User;

  @Column("varchar", { length: 32, unique: true, nullable: false })
  public session: string;

  @Column({ type: "timestamptz" })
  public readonly expires_at: Date;

  @CreateDateColumn({ type: "timestamptz" })
  public readonly created_at: Date;

  constructor(id: string, user: User, session: string, created_at: Date, expires_at: Date) {
    this.id = id;
    this.user = user;
    this.session = session;
    this.created_at = created_at;
    this.expires_at = expires_at;
  }
}

export default Session;
