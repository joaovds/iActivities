import {MigrationInterface, QueryRunner} from 'typeorm';

export class createsTheFirstTables1599489557141 implements MigrationInterface {
    name = 'createsTheFirstTables1599489557141'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner
        .query('CREATE TABLE `student` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `institution` varchar(255) NOT NULL, `age` int NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_a56c051c91dbe1068ad683f536` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
      await queryRunner
        .query('CREATE TABLE `subject` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, UNIQUE INDEX `IDX_d011c391e37d9a5e63e8b04c97` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
      await queryRunner
        .query('CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(100) NOT NULL, `description` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `studentId` int NULL, `subjectId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
      await queryRunner
        .query('ALTER TABLE `post` ADD CONSTRAINT `FK_69fcc5f6a709e8133eef4c8934c` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner
        .query('ALTER TABLE `post` ADD CONSTRAINT `FK_e1b114a8be985356d01aa1095ce` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner
        .query('ALTER TABLE `post` DROP FOREIGN KEY `FK_e1b114a8be985356d01aa1095ce`');
      await queryRunner
        .query('ALTER TABLE `post` DROP FOREIGN KEY `FK_69fcc5f6a709e8133eef4c8934c`');
      await queryRunner
        .query('DROP TABLE `post`');
      await queryRunner
        .query('DROP INDEX `IDX_d011c391e37d9a5e63e8b04c97` ON `subject`');
      await queryRunner
        .query('DROP TABLE `subject`');
      await queryRunner
        .query('DROP INDEX `IDX_a56c051c91dbe1068ad683f536` ON `student`');
      await queryRunner
        .query('DROP TABLE `student`');
    }
}
