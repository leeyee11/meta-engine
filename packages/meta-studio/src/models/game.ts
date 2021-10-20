import {useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import {createGameBlueprint} from '@/utils';
import type {FlowBase, FlowType} from '@meta-engine/flow';
import type {ActionBase, ActionType} from '@meta-engine/action';
import type {RuleBase, RuleType} from '@meta-engine/rule';
import {useModel} from '@/.umi/plugin-model/useModel';

type GameBlueprintCategory = 'flows' | 'actions' | 'rules';

export interface GameBlueprint {
  flows: Record<FlowType, Record<string, FlowBase>>
  actions: Record<ActionType, Record<string, ActionBase>>
  rules: Record<RuleType, Record<string, RuleBase>>
};

export default () => {
  const {
    initialState: {blueprints} = {blueprints: null},
  } = useModel('@@initialState');
  const [
    selected,
    setSelected,
  ] = useState({
    gameId: '',
    blueprint: createGameBlueprint(),
  });

  const select = (gameId: string) => {
    setSelected({
      gameId,
      blueprint: blueprintDict.current[gameId] as any,
    });
  };

  const blueprintDict = useRef<Record<string, GameBlueprint>>(
    createGameBlueprint() as any,
  );

  // update blueprint dictionary
  useEffect(() => {
    if (!blueprints) return;
    let defaultGameId = 'untitled';
    if (Object.keys(blueprints).length) {
      defaultGameId = Object.keys(blueprints)[0];
      blueprintDict.current = blueprints;
    } else {
      blueprintDict.current = {
        [defaultGameId]: createGameBlueprint() as any,
      };
    }
    select(defaultGameId);
  }, [blueprints]);

  const updateBlueprint = (
      category: GameBlueprintCategory,
      type: FlowType | ActionType | RuleType,
      id: string,
      payload: FlowBase | ActionBase | RuleBase,
  ) => {
    const path = `${selected.gameId}.${category}.${type}.${id}`;
    const nextDict = _.set(blueprintDict.current, path, payload);
    blueprintDict.current = nextDict;
  };

  return {
    select,
    updateFlow: (
        type: FlowType,
        flowId: string,
        payload: FlowBase,
    ) => updateBlueprint('flows', type, flowId, payload),
    updateAction: (
        type: ActionType,
        actionId: string,
        payload: ActionBase,
    ) => updateBlueprint('actions', type, actionId, payload),
    updateRule: (
        type: RuleType,
        ruleId: string,
        payload: RuleBase,
    ) => updateBlueprint('rules', type, ruleId, payload),
    blueprint: selected.blueprint,
  };
};
