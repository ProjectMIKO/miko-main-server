import { Module } from '@nestjs/common';
import { ConversationModule } from 'components/conversation/conversation.module';
import { VertexModule } from 'components/vertex/vertex.module';
import { EdgeModule } from 'components/edge/edge.module';
import { UserModule } from 'components/user/user.module';

@Module({
  imports: [UserModule, ConversationModule, VertexModule, EdgeModule],
  exports: [UserModule, ConversationModule, VertexModule, EdgeModule],
})
export class ComponentModule {}
