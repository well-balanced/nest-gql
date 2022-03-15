import { forwardRef, Module } from '@nestjs/common'
import { PostsModule } from 'src/posts/posts.module'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [forwardRef(() => PostsModule)],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
