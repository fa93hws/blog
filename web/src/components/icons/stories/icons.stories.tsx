import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { StorySubSection } from 'components/storybook/storybook';
import { Size } from '../create-icon';
import * as Icons from '../icons';
import styles from './icons.stories.css';

const IconContainer = ({
  Icon,
  title,
}: {
  Icon: React.ComponentType<{ size: Size; title: string; className: string }>;
  title: string;
}) => {
  const allSizes: readonly Size[] = ['small', 'medium', 'large'];
  return (
    <div>
      <StorySubSection>
        <h1>{title}: </h1>
        <div className={styles.section}>
          {allSizes.map(s => (
            <Icon
              size={s}
              title={`${title}-${s}`}
              key={s}
              className={styles.icon}
            />
          ))}
        </div>
      </StorySubSection>
    </div>
  );
};

storiesOf('components.icons', module).add('global nav', () => (
  <div>
    {Object.entries(Icons).map(([title, Icon]) => (
      <IconContainer title={title} Icon={Icon} key={title} />
    ))}
  </div>
));
