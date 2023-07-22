import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(
    @GetUser('id') userid: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userid, dto);
  }

  @Patch(':id')
  editUserById(@Param('id', ParseIntPipe) userid: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(parseInt(userid), dto);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) userid: number) {
    return this.userService.getUser(userid);
  }
}
