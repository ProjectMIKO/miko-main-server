import { Module } from '@nestjs/common';
import { ConversationModule } from '@conversation//conversation.module';
import { VertexModule } from '@vertex/vertex.module';
import { EdgeModule } from '@edge/edge.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [UserModule, ConversationModule, VertexModule, EdgeModule],
  exports: [UserModule, ConversationModule, VertexModule, EdgeModule],
})
export class ComponentModule {}