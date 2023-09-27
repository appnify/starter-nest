import { BaseController } from '@/common/base';
import { Respond, RespondType } from '@/common/response';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoryDto } from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';

@ApiTags('category')
@Controller('categories')
export class CategoryController extends BaseController {
  constructor(private categoryService: CategoryService) {
    super();
  }

  /**
   * 新增分类
   */
  @Post()
  addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  /**
   * 根据分页/过滤参数查询分类
   */
  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOkResponse({ isArray: true, type: Category })
  getCategorys(@Query() query: FindCategoryDto) {
    return this.categoryService.findMany(query);
  }

  /**
   * 根据ID查询分类
   */
  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  /**
   * 根据ID更新分类
   */
  @Patch(':id')
  updateCategory(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  /**
   * 根据ID删除分类
   */
  @Delete(':id')
  delCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(+id);
  }
}
