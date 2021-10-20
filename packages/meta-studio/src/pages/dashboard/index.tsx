import ProjectSelector from '@/components/project-selector/index';
import {MetaProject} from '@/services/meta';
import {PrimaryButton} from '@fluentui/react/lib/Button';
import {useModel} from 'umi';
import styles from './index.less';
/**
 * IndexPage
 * @return {JSX.Element}
 */
export default function Dashboard() {
  // @ts-ignore
  const {initialState: {projects}} = useModel('@@initialState');
  return (
    <div className={styles.dashboard}>
      <div className={styles.projectListContainer}>
        {projects.map((project: MetaProject) => {
          return (<ProjectSelector key={project.title} {...project} />);
        })}
      </div>
      <div className={styles.operationContainer}>
        <PrimaryButton>Create project</PrimaryButton>
      </div>
    </div>
  );
}
