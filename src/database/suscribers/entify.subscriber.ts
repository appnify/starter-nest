import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DataSource, EntitySubscriberInterface, InsertEvent, SoftRemoveEvent, UpdateEvent } from 'typeorm';

/**
 * 实体订阅器
 * @description 自动插入创建/更新用户的ID
 */
@Injectable()
export class EntitySubscripber implements EntitySubscriberInterface {
  static request: Request;

  constructor(private datasource: DataSource) {
    this.datasource.subscribers.push(this);
  }

  static setRequest(req: Request) {
    this.request = req;
  }

  beforeInsert(event: InsertEvent<any>): void | Promise<any> {
    if (event.entity) {
      event.entity.createdBy = this.getUser();
    }
  }

  beforeUpdate(event: UpdateEvent<any>): void | Promise<any> {
    if (event.entity) {
      event.entity.updatedBy = this.getUser();
    }
  }

  beforeSoftRemove(event: SoftRemoveEvent<any>): void | Promise<any> {
    if (event.entity) {
      event.entity.deletedBy = this.getUser();
    }
  }

  getUser() {
    const user = EntitySubscripber.request?.user;
    if (!user) {
      return;
    }
    return user.nickname;
  }
}
