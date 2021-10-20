import {Dropdown, IDropdownOption} from '@fluentui/react';
import styles from './index.less';

export default ({
  options,
}: {options: IDropdownOption[]}): JSX.Element => {
  return (
    <div className={styles.ProjectDropdown} >
      <Dropdown
        className={styles.Dropdown}
        options={options}
        styles={{dropdown: {backgroundColor: 'inherit'}}}
      />
    </div>
  );
};
