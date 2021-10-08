export enum ActionType {
  INQUIRE = 'inquire',
  UPDATE = 'update',
  GOTO = 'goto',
  OUTPUT = 'output',
  UNKNOWN = 'unknown',
}

export interface ActionBase {
  id: string,
  type: ActionType,
  payload: Record<string, any>,
  callback: {
    expression: string
  }
}
