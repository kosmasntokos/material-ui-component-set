import { Icon, prefab } from '@betty-blocks/component-sdk';
import { ActionJSButton } from './structures/ActionJSButton';

const attributes = {
  category: 'FORMV2',
  icon: Icon.ButtonIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Action Button Beta', attributes, undefined, [
  ActionJSButton({}),
]);
