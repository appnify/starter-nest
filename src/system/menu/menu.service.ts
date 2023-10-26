import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { FindMenuDto } from './dto/find-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { listToTree } from '@/utils/list-tree';

@Injectable()
export class MenuService extends BaseService {
  constructor(@InjectRepository(Menu) private menuRepository: Repository<Menu>) {
    super();
  }

  /**
   * 新增菜单
   */
  async create(createMenuDto: CreateMenuDto) {
    const menu = this.menuRepository.create(createMenuDto);
    const { parentId } = createMenuDto;
    if (parentId) {
      const parent = await this.menuRepository.findOne({ where: { id: parentId } });
      menu.parent = parent;
    }
    delete menu.parentId;
    await this.menuRepository.save(menu);
    return menu;
  }

  /**
   * 条件/分页查询
   */
  async findMany(findMenudto: FindMenuDto) {
    const { page, size, tree } = findMenudto;
    const { skip, take } = this.formatPagination(page, size, true);
    let [data, total] = await this.menuRepository.findAndCount({ skip, take });
    if (tree) {
      data = listToTree(data);
    }
    return [data, total];
  }

  /**
   * 根据ID查询
   */
  findOne(idOrOptions: number | Partial<Menu>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : (idOrOptions as any);
    return this.menuRepository.findOne({ where });
  }

  /**
   * 根据ID更新
   */
  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const { parentId } = updateMenuDto;
    if (parentId !== undefined) {
      const parent = await this.menuRepository.findOne({ where: { id: parentId } });
      updateMenuDto.parentId = parent?.id;
    }
    return this.menuRepository.update(id, updateMenuDto);
  }

  /**
   * 根据ID删除(软删除)
   */
  remove(id: number) {
    return this.menuRepository.softDelete(id);
  }
}
