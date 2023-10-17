import { BaseController } from '@/common/base';
import { Respond, RespondType } from '@/common/response';
import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoryDto } from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@ApiTags('category')
@Controller('categories')
export class CategoryController extends BaseController {
  constructor(private categoryService: CategoryService) {
    super();
  }

  @Post()
  @ApiOperation({ description: '添加分类', operationId: 'addCategory' })
  addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOkResponse({ isArray: true, type: Category })
  @ApiOperation({ description: '分页获取分类', operationId: 'getCategories' })
  getCategorys(@Query() query: FindCategoryDto) {
    return this.categoryService.findMany(query);
  }

  @Get(':id')
  @ApiOperation({ description: '添加分类', operationId: 'getCategory' })
  getCategory(id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新分类', operationId: 'setCategory' })
  updateCategory(id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除分类', operationId: 'delCategory' })
  delCategory(id: number) {
    return this.categoryService.remove(+id);
  }
}
