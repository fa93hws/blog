import * as React from 'react';
import * as classnames from 'classnames';
import styles from './pagination.css';

const STEP_SIZE = 3;

type PaginationProps = {
  totalPage: number;
  currentPage: number;
  getLink(page: number): string;
};

function verifyProps(props: PaginationProps) {
  if (props.currentPage < 0) {
    throw new Error('currentPage must be greater than 0');
  }
  if (props.currentPage > props.totalPage) {
    throw new Error('currentPage must not be greater than totalPage');
  }
}

type NumberProps = number | 'hellip';

function generateItems({
  current,
  total,
}: {
  current: number;
  total: number;
}): NumberProps[] {
  if (total <= 7) {
    return Array.from(new Array(total), (_, idx) => idx + 1);
  }
  if (current <= 1 + STEP_SIZE) {
    return [1, 2, 3, 4, 5, 'hellip', total];
  }
  if (current >= total - STEP_SIZE) {
    return [1, 'hellip', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, 'hellip', current - 1, current, current + 1, 'hellip', total];
}

const NumberButton = ({
  number,
  isCurrent,
}: {
  number: number;
  isCurrent: boolean;
}) => (
  <div
    className={classnames({
      [styles.currentNumber]: isCurrent,
    })}
  >
    {number}
  </div>
);
const Hellip = () => <span>&hellip;</span>;
const Item = React.memo(
  ({ current, item }: { current: number; item: number | 'hellip' }) => {
    if (item === 'hellip') {
      return <Hellip />;
    }
    return <NumberButton isCurrent={current === item} number={item} />;
  },
);

export const Pagination = (props: PaginationProps) => {
  verifyProps(props);
  const items = generateItems({
    current: props.currentPage,
    total: props.totalPage,
  });
  return (
    <ul className={styles.container}>
      {items.map((item, idx) => (
        <li key={idx}>
          <Item item={item} current={props.currentPage} />
        </li>
      ))}
    </ul>
  );
};
