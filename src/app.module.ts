import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/user.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule { }
