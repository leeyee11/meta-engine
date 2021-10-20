import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardImage,
  DocumentCardTitle,
} from '@fluentui/react';
import {ImageFit} from '@fluentui/react/lib/Image';
import {history} from 'umi';
import styles from './index.less';

interface ProjectSelectorProps {
  title: string,
  imageSrc: string,
  author: {
    name: string,
    profileImageSrc: string,
  }[],
}

export default ({
  title, imageSrc, author,
}: ProjectSelectorProps): JSX.Element => {
  return (
    <div className={styles.ProjectSelector} >
      <DocumentCard
        onClick={() => history.push('/flow')}
        aria-label=""
      >
        <DocumentCardImage
          height={150}
          imageFit={ImageFit.cover}
          imageSrc={imageSrc}/>
        <DocumentCardTitle title={title}/>
        <DocumentCardActivity
          activity="Created a few minutes ago" people={author}
        />
      </DocumentCard>
    </div>
  );
};
