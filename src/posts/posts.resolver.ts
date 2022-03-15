import { Args, Resolver, Query, Mutation } from '@nestjs/graphql'
import { CreatePostInput, UpdatePostInput } from '@generated'
import { PostsService } from './posts.service'
import { UsersService } from 'src/users/users.service'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Resolvable } from '@types'

@Resolver('Post')
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @Query()
  post(@Args('id') id: string): Resolvable<'post'> {
    const post = this.postsService.findOne(id)
    if (!post) {
      throw new NotFoundException('post does not exist')
    }
    return post
  }

  @Query()
  posts(@Args('authorId') authorId: string): Resolvable<'posts'> {
    const nodes = this.postsService.findByAuthorId(authorId)
    return { nodes, totalCount: nodes.length }
  }

  @Mutation()
  createPost(
    @Args('input')
    { title, authorId, content }: CreatePostInput,
  ): Resolvable<'createPost'> {
    const user = this.usersService.findOne(authorId)
    if (!user) {
      throw new BadRequestException('author does not exist')
    }
    return { post: this.postsService.create({ title, content, author: user }) }
  }

  @Mutation()
  updatePost(@Args('input') input: UpdatePostInput): Resolvable<'updatePost'> {
    return { post: this.postsService.update(input) }
  }

  @Mutation()
  deletePost(@Args('id') id: string): Resolvable<'deletePost'> {
    return { deleted: this.postsService.delete(id) }
  }
}
