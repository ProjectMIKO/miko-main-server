import { Module } from '@nestjs/common';
import { ConversationModule } from '@conversation//conversation.module';
import { NodeModule } from './node/node.module';
import { EdgeModule } from './edge/edge.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [UserModule, ConversationModule, NodeModule, EdgeModule],
  exports: [UserModule, ConversationModule, NodeModule, EdgeModule],
})
export class ComponentModule {}