import React from 'react';
import {getTheme, IDropdownOption} from '@fluentui/react';
import {getProjects, getBluePrints} from './services/meta';
import ProjectDropdown from '@/components/project-dropdown';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

export const getInitialState = async () => {
  const projects = await getProjects();
  const blueprints = await getBluePrints();

  const options = projects.map(
      ({id, title}, index) => ({key: id, text: title, isSelected: !index}),
  );

  return {
    options,
    projects,
    blueprints,
  };
};

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings, options: IDropdownOption[] };
}): BasicLayoutProps => {
  const theme = getTheme();
  return {
    layout: 'top',
    logo: <img src="/assets/img/meta-studio.png"/>,
    rightContentRender: () =>
      <ProjectDropdown options={initialState?.options ?? []}/>,
    navTheme: 'light',
    headerContentRender: () => <h1>Meta Engine</h1>,
    contentStyle: {
      backgroundColor: theme.palette.white,
      boxShadow: `0 1.6px 3.6px 0 rgb(0 0 0 / 13%),
      0 0.3px 0.9px 0 rgb(0 0 0 / 11%)`,
      display: 'flex',
      height: 'calc(100vh - 96px)',
      minWidth: 360,
    },
    disableContentMargin: false,
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};
