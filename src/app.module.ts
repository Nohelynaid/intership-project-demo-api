import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { FieldService } from './services/field.service';
import { InventoryService } from './services/inventory.service';
import { InventoryAccessService } from './services/inventoryAccess.service';
import { ItemService } from './services/item.service';
import { NumberingService } from './services/numbering.service';
import { FieldController } from './controllers/field.controller';
import { InventoryController } from './controllers/inventory.controller';
import { InventoryAccessController } from './controllers/inventoryAccess.controller';
import { ItemController } from './controllers/item.controller';
import { NumberingController } from './controllers/numbering.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60, // 1 min
      max: 100, // items in cache
    }),
  ],
  controllers: [AppController, UserController, FieldController, InventoryController, InventoryAccessController, ItemController, NumberingController],
  providers: [AppService, PrismaService, UserService, FieldService, InventoryService, InventoryAccessService, ItemService, NumberingService],
})
export class AppModule { }
