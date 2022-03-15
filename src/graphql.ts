
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum CacheControlScope {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}

export interface CreatePostInput {
    title: string;
    content?: Nullable<string>;
    authorId: string;
}

export interface UpdatePostInput {
    id: string;
    title?: Nullable<string>;
    content?: Nullable<string>;
}

export interface CreateUserInput {
    name: string;
}

export interface Post {
    __typename?: 'Post';
    id: string;
    title: string;
    content?: Nullable<string>;
    author: User;
    createdAt: string;
}

export interface CreatePostPayload {
    __typename?: 'CreatePostPayload';
    post: Post;
}

export interface UpdatePostPayload {
    __typename?: 'UpdatePostPayload';
    post: Post;
}

export interface PostConnection {
    __typename?: 'PostConnection';
    nodes: Nullable<Post>[];
    totalCount: number;
}

export interface DeletePostPayload {
    __typename?: 'DeletePostPayload';
    deleted?: Nullable<boolean>;
}

export interface IQuery {
    __typename?: 'IQuery';
    posts(authorId: string): Nullable<PostConnection> | Promise<Nullable<PostConnection>>;
    post(id: string): Post | Promise<Post>;
    user(id: string): User | Promise<User>;
}

export interface IMutation {
    __typename?: 'IMutation';
    createPost(input: CreatePostInput): CreatePostPayload | Promise<CreatePostPayload>;
    updatePost(input?: Nullable<UpdatePostInput>): UpdatePostPayload | Promise<UpdatePostPayload>;
    deletePost(id: string): DeletePostPayload | Promise<DeletePostPayload>;
    createUser(input: CreateUserInput): CreateUserPayload | Promise<CreateUserPayload>;
}

export interface User {
    __typename?: 'User';
    id: string;
    name: string;
    posts: Nullable<Post>[];
    createdAt: string;
}

export interface CreateUserPayload {
    __typename?: 'CreateUserPayload';
    user: User;
}

type Nullable<T> = T | null;
