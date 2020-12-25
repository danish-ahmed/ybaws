import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  Unique
} from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

@Entity('users')
@Unique(["username"])
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60, nullable: false})
  email: string;

  @Column({ length: 60, nullable: false})
  username: string;

  @Column({ length: 60, nullable: true })
  first_name: string;
  
  @Column({ length: 60, nullable: true })
  last_name: string;

  @Column({ nullable: true })
  password: string;

  @Column({default: '/images/profile.jpg'})
  profile_image: string;

  @BeforeInsert()
  beforeInsertActions() {
    this.profile_image = '/images/.jpg';
  }

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
  

  hashPassword() {
    if(this.password) this.password = bcrypt.hashSync(this.password, 8);
  }

  generateToken(){
    const token = jwt.sign(
      { userId: this.id },
      config.jwtSecret,
      { expiresIn: "10d" }
    );
    return token;
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

}
