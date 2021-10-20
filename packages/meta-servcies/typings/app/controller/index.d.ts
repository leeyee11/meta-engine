// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMeta from '../../../app/controller/meta';

declare module 'egg' {
  interface IController {
    meta: ExportMeta;
  }
}
