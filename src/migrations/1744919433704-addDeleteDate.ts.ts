import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeleteDate1744919433704 implements MigrationInterface {
  name = 'AddDeleteDate.ts1744919433704';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`skill\` ADD \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cv\` ADD \`deletedAt\` datetime(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`cv\` DROP COLUMN \`deletedAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deletedAt\``);
    await queryRunner.query(`ALTER TABLE \`skill\` DROP COLUMN \`deletedAt\``);
  }
}
