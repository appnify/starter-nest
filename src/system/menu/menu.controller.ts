import { BaseController } from '@/common/base';
import { Respond, RespondType } from '@/middlewares/response';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';
import { FindMenuDto } from './dto/find-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { MenuService } from './menu.service';

@ApiTags('menu')
@Controller('menus')
export class MenuController extends BaseController {
  constructor(private menuService: MenuService) {
    super();
  }

  @Post()
  @ApiOperation({ description: '新增菜单', operationId: 'addMenu' })
  addMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOkResponse({ isArray: true, type: Menu })
  @ApiOperation({ description: '查询菜单', operationId: 'getMenus' })
  getMenus(@Query() query: FindMenuDto) {
    return this.menuService.findMany(query);
  }

  @Get(':id')
  @ApiOperation({ description: '获取菜单', operationId: 'getMenu' })
  getMenu(@Param('id') id: number): Promise<Menu> {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新菜单', operationId: 'setMenu' })
  updateMenu(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除菜单', operationId: 'delMenu' })
  delMenu(id: number) {
    return this.menuService.remove(+id);
  }
}
