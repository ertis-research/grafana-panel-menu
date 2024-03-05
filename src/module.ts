import { PanelPlugin } from '@grafana/data';
import {Options } from './utils/types';
import { Main } from './components/main';
import { ItemsEditor } from './components/editors/itemsEditor';
import './css/bootstrap-grid.css';
import './css/grid.css';
import './css/others.css';

export const plugin = new PanelPlugin<Options>(Main).setPanelOptions((builder) => {
  return builder
    .addCustomEditor({
      path : 'items',
      id: 'items',
      name : 'Items',
      editor : ItemsEditor
    })
    .addRadio({
      path: 'seriesCountSize',
      defaultValue: 'sm',
      name: 'Series counter size',
      settings: {
        options: [
          {
            value: 'sm',
            label: 'Small',
          },
          {
            value: 'md',
            label: 'Medium',
          },
          {
            value: 'lg',
            label: 'Large',
          },
        ],
      },
      showIf: (config) => config.showSeriesCount,
    });
});
