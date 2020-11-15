import * as React from 'react';
import { BlogListProto } from 'services/blog-list/blog-list.proto';
import { AbstractCard } from './abstract-card/card';
import styles from './home.css';

type HomePageProps = {
  blogList: BlogListProto;
};

// TODO Change to loading state
const emptyBlogList: BlogListProto = {
  currentPage: 1,
  totalPage: 1,
  blogAbstracts: [],
};

export const HomePage = React.memo(({ blogList }: HomePageProps) => (
  <div className={styles.home}>
    <ul className={styles.blogList}>
      {blogList.blogAbstracts.map(blogAbstract => (
        <li key={blogAbstract.id} className={styles.blogAbstract}>
          <AbstractCard
            time={blogAbstract.time}
            title={blogAbstract.title}
            abstract={blogAbstract.abstract}
            linkTo={`/blog/${blogAbstract.id}`}
          />
        </li>
      ))}
    </ul>
  </div>
));

export function createHomePage() {
  const ConnectedHomePage = () => {
    const [blogList, setBlogList] = React.useState(emptyBlogList);
    React.useEffect(() => {
      import(
        'services/blog-list/fake/fake-blog-list'
      ).then(({ fakeBlogList }) => setBlogList(fakeBlogList));
    }, [setBlogList]);
    return <HomePage blogList={blogList} />;
  };
  return ConnectedHomePage;
}
