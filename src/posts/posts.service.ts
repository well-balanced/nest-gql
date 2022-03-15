import { Post, User } from '@generated'
import { BadRequestException, Injectable } from '@nestjs/common'
import cuid from 'cuid'
import { Nullable } from '@types'

interface CreatePostArgs {
  title: string
  author: User
  content?: Nullable<string>
}

interface UpdatePostArgs {
  id: string
  title?: Nullable<string>
  content?: Nullable<string>
}

@Injectable()
export class PostsService {
  private _posts: Post[] = []

  findOne(id: string) {
    return this._posts.find((post) => post.id === id)
  }

  findByAuthorId(authorId: string) {
    return this._posts.filter((post) => post.author.id === authorId)
  }

  create({ title, content, author }: CreatePostArgs): Post {
    const post: Post = {
      id: cuid(),
      createdAt: new Date().toISOString(),
      title,
      content: content ? content : null,
      author,
    }
    this._posts.push(post)
    return { ...post }
  }

  update({ id, title, content }: UpdatePostArgs): Post {
    const post = this.findOne(id)
    if (!post) {
      throw new BadRequestException('a invalid post id')
    }

    const updated: Post = {
      ...post,
      ...(title && { title }),
      ...(content && { content }),
    }
    this._posts = [...this._posts.filter((post) => post.id !== id), updated]

    return { ...updated }
  }

  delete(id: string): boolean {
    const prevSize = this._posts.length
    this._posts = this._posts.filter((post) => post.id !== id)
    return this._posts.length < prevSize
  }
}
