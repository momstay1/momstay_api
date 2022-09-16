import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { commonUtils } from 'src/common/common.utils';
import { map } from 'lodash';

@Controller('settings')
@ApiTags('설정관련 API')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) { }

  sanitizeSettings(data) {
    return commonUtils.sanitizeEntity(data, this.settingsService.getPrivateColumn());
  };

  @Post()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_환경설정 등록 API' })
  @ApiBody({ type: CreateSettingDto })
  async create(@Body() createSettingDto: CreateSettingDto) {
    return await this.settingsService.create(createSettingDto);
  }

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  @Get(':key')
  @Auth(['Any'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_환경설정 가져오기 API' })
  async findOne(@Param('key') key: string) {
    const settings = await this.settingsService.find(key);
    return this.sanitizeSettings(settings);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(+id, updateSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settingsService.remove(+id);
  }
}
