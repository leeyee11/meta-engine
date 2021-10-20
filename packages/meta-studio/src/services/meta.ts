import {GameBlueprint} from '@/models/game';
import request from 'umi-request';

export interface MetaProject {
  id: string,
  title: string,
  imageSrc: string,
  author: {
    profileImageSrc: string,
    name: string,
  }[]
}

export const getProjects = (query = '') => {
  return request('/meta/projects') as Promise<MetaProject[]>;
};

export const getBluePrints = () => {
  return request('/meta/blueprints') as Promise<Record<string, GameBlueprint>>;
};
