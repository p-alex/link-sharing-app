import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../user/user.entity";
import { PLATFORMS_LIST } from "./link.schema";

@Entity("links")
class Link {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @ManyToOne(() => User, (user) => user.links, { onDelete: "CASCADE" })
  public user: User;

  @Column("varchar", { length: 255, nullable: false })
  public link: string;

  @Column("enum", { enum: PLATFORMS_LIST, nullable: false })
  public platform: keyof typeof PLATFORMS_LIST;

  @Column("int", { nullable: false })
  public index: number;

  constructor(
    id: string,
    user: User,
    link: string,
    platform: keyof typeof PLATFORMS_LIST,
    index: number,
  ) {
    this.id = id;
    this.user = user;
    this.link = link;
    this.platform = platform;
    this.index = index;
  }
}

export default Link;
