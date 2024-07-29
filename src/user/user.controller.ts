import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  createUser(@Body() requestBody: createUserDto) {
    return this.userService.createUser(requestBody);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getOneUser(@Param('id') id: number) {
    return this.userService.getOneUser(id);
  }

  @Put('/:id')
  updateById(@Query('id') id: number, @Body() requestBody: updateUserDto) {
    return this.userService.UpdateById(id, requestBody);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: number) {
    return this.userService.deleteById(id);
  }
}
