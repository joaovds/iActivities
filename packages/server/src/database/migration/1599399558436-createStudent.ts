import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createStudent1599354240118 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'student',
        columns: [
          {
            name: 'cd_student',
            type: 'integer',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '100'
          },
          {
            name: 'institution',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'age',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
            length: '100'
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'created_At',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_At',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('student');
  }
}
