export interface BlogAbstractProto {
  id: string;
  time: string;
  title: string;
  abstract: string;
}

export interface BlogListProto {
  currentPage: number;
  totalPage: number;
  blogAbstracts: BlogAbstractProto[];
}
