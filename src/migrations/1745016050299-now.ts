import { MigrationInterface, QueryRunner } from "typeorm";

export class Now1745016050299 implements MigrationInterface {
    name = 'Now1745016050299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`skill\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`cv\` DROP FOREIGN KEY \`FK_e4b7330e64fd0ecce86720e62f9\``);
        await queryRunner.query(`ALTER TABLE \`cv\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`cv\` CHANGE \`path\` \`path\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cv\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cv\` ADD CONSTRAINT \`FK_e4b7330e64fd0ecce86720e62f9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cv\` DROP FOREIGN KEY \`FK_e4b7330e64fd0ecce86720e62f9\``);
        await queryRunner.query(`ALTER TABLE \`cv\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cv\` CHANGE \`path\` \`path\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cv\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cv\` ADD CONSTRAINT \`FK_e4b7330e64fd0ecce86720e62f9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skill\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
    }

}
