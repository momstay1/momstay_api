import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminUsersEntity } from 'src/admin-users/entities/admin-user.entity';
import { GetUser } from 'src/auth/getuser.decorator';
import { Auth } from 'src/common/decorator/role.decorator';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboard')
@ApiTags('관리자 대시보드 API')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get()
  findAll() {
    return this.dashboardService.findAll();
  }

  // 관리자 대시보드 정보
  @Get('users')
  @Auth(['root', 'admin'])
  @ApiOperation({ summary: '관리자_대시보드 회원 정보 API' })
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      example: {
        total_cnt: 'number',
        admin_cnt: 'number',
        users_cnt: 'number'
      }
    }
  })
  async getUsersDashboard(@GetUser() user: AdminUsersEntity) {
    return await this.dashboardService.usersCount(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
