import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1744918727509 implements MigrationInterface {
    name = 'CreateTables1744918727509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`skill\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`designation\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cv\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`firstname\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`cin\` int NOT NULL, \`job\` varchar(255) NOT NULL, \`path\` varchar(255) NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cv_skills_skill\` (\`cvId\` int NOT NULL, \`skillId\` int NOT NULL, INDEX \`IDX_5adf1336ce64eb1b5e0ed23bea\` (\`cvId\`), INDEX \`IDX_078a4872121f8b4f6e66522170\` (\`skillId\`), PRIMARY KEY (\`cvId\`, \`skillId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cv\` ADD CONSTRAINT \`FK_e4b7330e64fd0ecce86720e62f9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cv_skills_skill\` ADD CONSTRAINT \`FK_5adf1336ce64eb1b5e0ed23bea6\` FOREIGN KEY (\`cvId\`) REFERENCES \`cv\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`cv_skills_skill\` ADD CONSTRAINT \`FK_078a4872121f8b4f6e665221706\` FOREIGN KEY (\`skillId\`) REFERENCES \`skill\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cv_skills_skill\` DROP FOREIGN KEY \`FK_078a4872121f8b4f6e665221706\``);
        await queryRunner.query(`ALTER TABLE \`cv_skills_skill\` DROP FOREIGN KEY \`FK_5adf1336ce64eb1b5e0ed23bea6\``);
        await queryRunner.query(`ALTER TABLE \`cv\` DROP FOREIGN KEY \`FK_e4b7330e64fd0ecce86720e62f9\``);
        await queryRunner.query(`DROP INDEX \`IDX_078a4872121f8b4f6e66522170\` ON \`cv_skills_skill\``);
        await queryRunner.query(`DROP INDEX \`IDX_5adf1336ce64eb1b5e0ed23bea\` ON \`cv_skills_skill\``);
        await queryRunner.query(`DROP TABLE \`cv_skills_skill\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`cv\``);
        await queryRunner.query(`DROP TABLE \`skill\``);
    }

}
