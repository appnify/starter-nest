import mock from 'mockjs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 } from 'uuid';

export class MockPosts1685026010848 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const numbers = Array(20).fill(0);
    const users = numbers.map(() => {
      const guid = `"${v4()}"`;
      const title = `"${mock.Random.csentence(10, 30)}"`;
      const description = `"${mock.Random.csentence(100, 120)}"`;
      const content = `"${mock.Random.csentence(200, 220)}"`;
      return [guid, title, description, content];
    });
    const fields = ['guid', 'title', 'description', 'content'].join(',');
    const values = users.map((user) => `(${user.join(',')})`).join(',');
    await queryRunner.query(`INSERT INTO post (${fields}) VALUES ${values}`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE post`);
  }
}
