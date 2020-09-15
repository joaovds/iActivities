import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1600195155596 implements MigrationInterface {
    name = 'createTables1600195155596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `teacher` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `institution` varchar(255) NOT NULL, `age` int NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `subjectId` int NOT NULL, UNIQUE INDEX `IDX_00634394dce7677d531749ed8e` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `subject` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, UNIQUE INDEX `IDX_d011c391e37d9a5e63e8b04c97` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `response` (`id` int NOT NULL AUTO_INCREMENT, `response_body` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `postId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(100) NOT NULL, `description` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `studentId` int NOT NULL, `subjectId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `student` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `institution` varchar(255) NOT NULL, `age` int NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_a56c051c91dbe1068ad683f536` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `like` (`id` int NOT NULL AUTO_INCREMENT, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `studentId` int NOT NULL, `teacherId` int NOT NULL, `postId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `teacher` ADD CONSTRAINT `FK_060316d200c20658db1b1de6639` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `response` ADD CONSTRAINT `FK_f7ab5112d03a0140a4c8ddeb85b` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_69fcc5f6a709e8133eef4c8934c` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_e1b114a8be985356d01aa1095ce` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_3c481a3da415ec7bb194ab5a907` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_8f9e35eab9dc677e94cfc8ba835` FOREIGN KEY (`teacherId`) REFERENCES `teacher`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `like` ADD CONSTRAINT `FK_3acf7c55c319c4000e8056c1279` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_3acf7c55c319c4000e8056c1279`");
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_8f9e35eab9dc677e94cfc8ba835`");
        await queryRunner.query("ALTER TABLE `like` DROP FOREIGN KEY `FK_3c481a3da415ec7bb194ab5a907`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_e1b114a8be985356d01aa1095ce`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_69fcc5f6a709e8133eef4c8934c`");
        await queryRunner.query("ALTER TABLE `response` DROP FOREIGN KEY `FK_f7ab5112d03a0140a4c8ddeb85b`");
        await queryRunner.query("ALTER TABLE `teacher` DROP FOREIGN KEY `FK_060316d200c20658db1b1de6639`");
        await queryRunner.query("DROP TABLE `like`");
        await queryRunner.query("DROP INDEX `IDX_a56c051c91dbe1068ad683f536` ON `student`");
        await queryRunner.query("DROP TABLE `student`");
        await queryRunner.query("DROP TABLE `post`");
        await queryRunner.query("DROP TABLE `response`");
        await queryRunner.query("DROP INDEX `IDX_d011c391e37d9a5e63e8b04c97` ON `subject`");
        await queryRunner.query("DROP TABLE `subject`");
        await queryRunner.query("DROP INDEX `IDX_00634394dce7677d531749ed8e` ON `teacher`");
        await queryRunner.query("DROP TABLE `teacher`");
    }

}
