import mock from 'mockjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1682693329275 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const numbers = Array(20).fill(0);
    const users = numbers.map(() => {
      const username = `"${mock.Random.name()}"`;
      const nickname = `"${mock.Random.cname()}"`;
      const description = `"${mock.Random.csentence(100, 120)}"`;
      const avatar = `"https://picsum.photos/400/300"`;
      const password = `"123456"`;
      const createdAt = `"${mock.Random.datetime()}"`;
      return [username, nickname, description, avatar, password, createdAt];
    });
    const fields = ['username', 'nickname', 'description', 'avatar', 'password', 'created_at'].join(',');
    const values = users.map((user) => `(${user.join(',')})`).join(',');
    await queryRunner.query(`INSERT INTO user (${fields}) VALUES ${values}`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE user`);
  }
}
