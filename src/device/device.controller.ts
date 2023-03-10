import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('device')
@ApiTags('단말기 정보 API')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @Post()
  @ApiOperation({ summary: '단말기 정보 등록 API' })
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    return await this.deviceService.create(createDeviceDto);
  }

  @Get()
  findAll() {
    return this.deviceService.findAll();
  }

  @Get(':token')
  @ApiOperation({ summary: '단말기 정보 상세 API' })
  async findOne(@Param('token') token: string) {
    return await this.deviceService.findOne(token);
  }

  @Patch(':idx')
  @ApiOperation({ summary: '단말기 정보 수정 API' })
  async update(@Param('idx') idx: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return await this.deviceService.update(+idx, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
