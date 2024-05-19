import { UserSignupType } from '../types/types';

export type TagType = {
  value: string;
  label: string;
};

export type ServerTagType = {
  id: string;
  label: string;
};

export type PostType = {
  id: string;
  title: string;
  body: string;
  tags: ServerTagType[];
  createdAt: Date;
};

export type PostDataType = {
  status: number;
  result: PostType[];
  message: string;
};

export type PostListResultType = {
  posts: PostType[];
  tags: ServerTagType[];
};

export type PostListType = {
  status: string;
  result: PostListResultType;
  message: string;
};

export type TagListResultType = {
  status: string;
  result: ServerTagType[];
  message: string;
};

export type ServerDefaultResponseType<T> = {
  status: number;
  message: string;
  result: T;
};

export type ApiResponseDefaultType = <T>() => Promise<
  ServerDefaultResponseType<T>
>;

export type RequestPostsFnType = (
  id?: string
) => Promise<ServerDefaultResponseType<PostListResultType>>;

export type NewPostType = {
  title: string;
  body: string;
  tags: ServerTagType[];
};

export type UserRole = 'user' | 'admin';

export type NewUserResponseType = {
  lastContactTime: Date;
  id: string;
  nickName: string;
  password: null;
  role: UserRole;
  token: string;
};

export type LoginUserInfoType = {
  nickName: string;
  password: string;
};

export type ServerResponseLoginUserInfo = {
  token: string;
  nickName: string;
  role: UserRole;
  id: string;
  roomId: string;
  // loginType?: LoginType;
};

export type loginUserApiType = (
  userInfo: LoginUserInfoType
) => Promise<ServerDefaultResponseType<ServerResponseLoginUserInfo>>;

export type createUserApiType = (
  newUser: UserSignupType
) => Promise<ServerDefaultResponseType<NewUserResponseType>>;

export type Char1 = 'A' | 'B';

export type Msg = {
  msgId: number;
  msgType: Char1;
  msg: string;
  contactIp: string;
  msgState: Char1;
  createUserId: string;
  roomId: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date;
  deleteUserId: string;
};
