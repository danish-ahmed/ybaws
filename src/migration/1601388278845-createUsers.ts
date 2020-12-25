import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";


export class createUsers1601388278845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let user1 = new User();
        user1.email = "ahmed@user.com";
        user1.username = "ahmed";
        user1.password = await bcrypt.hashSync('12345678', 8);
        user1.first_name = "ahmed_123";
        const userRepository = getRepository(User);
        await userRepository.save(user1);

        let user2 = new User();
        user2.email = "ali@user.com";
        user2.username = "ali_123";
        user2.password = await bcrypt.hashSync('12345678', 8);
        user2.first_name = "ali";
        await userRepository.save(user2);

        let user3 = new User();
        user3.email = "john@user.com";
        user3.username = "john_123";
        user3.password = await bcrypt.hashSync('12345678', 8);
        user3.first_name = "john";
        await userRepository.save(user3);

        let user4 = new User();
        user4.email = "faisal@user.com";
        user4.username = "faisal_123";
        user4.password = await bcrypt.hashSync('12345678', 8);
        user4.first_name = "faisal";
        await userRepository.save(user4);

        let user5 = new User();
        user5.email = "faisal@user.com";
        user5.username = "faisal_123";
        user5.password = await bcrypt.hashSync('12345678', 8);
        user5.first_name = "faisal";
        await userRepository.save(user5);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
