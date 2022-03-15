import {
  Args,
  Resolver,
  Query,
  ResolveField,
  Mutation,
  Parent,
} from '@nestjs/graphql'
import { CreateUserInput, User } from '@generated'
import { UsersService } from './users.service'
import { PostsService } from 'src/posts/posts.service'
import { Resolvable, ResolvableField } from '@types'

@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Query()
  user(@Args('id') id: string): Resolvable<'user'> {
    return this.usersService.findOne(id)
  }

  @ResolveField()
  posts(@Parent() user: User): ResolvableField<User, 'posts'> {
    return this.postsService.findByAuthorId(user.id)
  }

  @Mutation()
  createUser(
    @Args('input')
    { name }: CreateUserInput,
  ): Resolvable<'createUser'> {
    return { user: this.usersService.create({ name }) }
  }
}
