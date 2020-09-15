import {MigrationInterface, QueryRunner} from 'typeorm';

export class createTables1599941621240 implements MigrationInterface {
    name = 'createTables1599941621240'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `teacher` DROP FOREIGN KEY `FK_060316d200c20658db1b1de6639`');
      await queryRunner.query('ALTER TABLE `teacher` CHANGE `subjectId` `subjectId` int NULL');
      await queryRunner.query('ALTER TABLE `response` DROP FOREIGN KEY `FK_f7ab5112d03a0140a4c8ddeb85b`');
      await queryRunner.query('ALTER TABLE `response` CHANGE `postId` `postId` int NULL');
      await queryRunner.query('ALTER TABLE `post` DROP FOREIGN KEY `FK_69fcc5f6a709e8133eef4c8934c`');
      await queryRunner.query('ALTER TABLE `post` DROP FOREIGN KEY `FK_e1b114a8be985356d01aa1095ce`');
      await queryRunner.query('ALTER TABLE `post` CHANGE `studentId` `studentId` int NULL');
      await queryRunner.query('ALTER TABLE `post` CHANGE `subjectId` `subjectId` int NULL');
      await queryRunner.query('ALTER TABLE `like` DROP FOREIGN KEY `FK_3c481a3da415ec7bb194ab5a907`');
      await queryRunner.query('ALTER TABLE `like` DROP FOREIGN KEY `FK_8f9e35eab9dc677e94cfc8ba835`');
      await queryRunner.query('ALTER TABLE `like` DROP FOREIGN KEY `FK_3acf7c55c319c4000e8056c1279`');
      await queryRunner.query('ALTER TABLE `like` CHANGE `studentId` `studentId` int NULL');
      await queryRunner.query('ALTER TABLE `like` CHANGE `teacherId` `teacherId` int NULL');
      await queryRunner.query('ALTER TABLE `like` CHANGE `postId` `postId` int NULL');
      await queryRunner.query('ALTER TABLE `teacher` ADD CONSTRAINT `FK_060316d200c20658db1b1de6639` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE `response` ADD CONSTRAINT `FK_f7ab5112d03a0140a4c8ddeb85b` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE `post` ADD CONSTRAINT `FK_69fcc5f6a709e8133eef4c8934c` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE `post` ADD CONSTRAINT `FK_e1b114a8be985356d01aa1095ce` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE `like` ADD CONSTRAINT `FK_3c481a3da415ec7bb194ab5a907` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE `like` ADD CONSTRAINT `FK_8f9e35eab9dc677e94cfc8ba835` FOREIGN KEY (`teacherId`) REFERENCES `teacher`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE `like` ADD CONSTRAINT `FK_3acf7c55c319c4000e8056c1279` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `like` DROP FOREIGN KEY `FK_3acf7c55c319c4000e8056c1279`');
      await queryRunner.query('ALTER TABLE `like` DROP FOREIGN KEY `FK_8f9e35eab9dc677e94cfc8ba835`');
      await queryRunner.query('ALTER TABLE `like` DROP FOREIGN KEY `FK_3c481a3da415ec7bb194ab5a907`');
      await queryRunner.query('ALTER TABLE `post` DROP FOREIGN KEY `FK_e1b114a8be985356d01aa1095ce`');
      await queryRunner.query('ALTER TABLE `post` DROP FOREIGN KEY `FK_69fcc5f6a709e8133eef4c8934c`');
      await queryRunner.query('ALTER TABLE `response` DROP FOREIGN KEY `FK_f7ab5112d03a0140a4c8ddeb85b`');
      await queryRunner.query('ALTER TABLE `teacher` DROP FOREIGN KEY `FK_060316d200c20658db1b1de6639`');
      await queryRunner.query("ALTER TABLE `like` CHANGE `postId` `postId` int NULL DEFAULT 'NULL'");
      await queryRunner.query("ALTER TABLE `like` CHANGE `teacherId` `teacherId` int NULL DEFAULT 'NULL'");
      await queryRunner.query("ALTER TABLE `like` CHANGE `studentId` `studentId` int NULL DEFAULT 'NULL'");
      await queryRunner.query('ALTER TABLE `like` ADD CONSTRAINT `FK_3acf7c55c319c4000e8056c1279` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE `like` ADD CONSTRAINT `FK_8f9e35eab9dc677e94cfc8ba835` FOREIGN KEY (`teacherId`) REFERENCES `teacher`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE `like` ADD CONSTRAINT `FK_3c481a3da415ec7bb194ab5a907` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query("ALTER TABLE `post` CHANGE `subjectId` `subjectId` int NULL DEFAULT 'NULL'");
      await queryRunner.query("ALTER TABLE `post` CHANGE `studentId` `studentId` int NULL DEFAULT 'NULL'");
      await queryRunner.query('ALTER TABLE `post` ADD CONSTRAINT `FK_e1b114a8be985356d01aa1095ce` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE `post` ADD CONSTRAINT `FK_69fcc5f6a709e8133eef4c8934c` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query("ALTER TABLE `response` CHANGE `postId` `postId` int NULL DEFAULT 'NULL'");
      await queryRunner.query('ALTER TABLE `response` ADD CONSTRAINT `FK_f7ab5112d03a0140a4c8ddeb85b` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query("ALTER TABLE `teacher` CHANGE `subjectId` `subjectId` int NULL DEFAULT 'NULL'");
      await queryRunner.query('ALTER TABLE `teacher` ADD CONSTRAINT `FK_060316d200c20658db1b1de6639` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
}
