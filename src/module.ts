import { PanelPlugin } from '@grafana/data';
import {GridMode, GridModeSetting, ImageMode, ImageModeSetting, LayoutMode, LayoutModeSetting, Options } from './utils/types';
import { Main } from './components/main';
import { ItemsEditor } from './components/editors/itemsEditor';

export const plugin = new PanelPlugin<Options>(Main).setPanelOptions((builder) => {
  return builder
    .addCustomEditor({
      path : 'items',
      id: 'items',
      name : 'Items',
      editor : ItemsEditor
    })
    .addRadio({
      path: 'columns',
      defaultValue: 'auto',
      name: 'Columns',
      settings: {
        options: LayoutModeSetting,
      }
    })
    .addNumberInput({
      path: 'columnsNumber',
      name: 'Columns number',
      defaultValue: 3,
      settings: {
        min: 1,
        integer: true
      },
      showIf: (config) => config.columns === LayoutMode.fixed
    })
    .addRadio({
      path: 'rows',
      defaultValue: 'auto',
      name: 'Rows',
      settings: {
        options: LayoutModeSetting,
      }
    })
    .addNumberInput({
      path: 'rowsNumber',
      name: 'Rows number',
      defaultValue: 3,
      settings: {
        min: 1,
        integer: true
      },
      showIf: (config) => config.rows === LayoutMode.fixed
    })
    .addRadio({
      path: 'cellHeightMode',
      defaultValue: 'auto',
      name: 'Cell height',
      settings: {
        options: LayoutModeSetting,
      }
    })
    .addNumberInput({
      path: 'cellHeightValue',
      name: 'Height value (px)',
      defaultValue: 200,
      settings: {
        min: 1,
        integer: true
      },
      showIf: (config) => config.cellHeightMode === LayoutMode.fixed
    })
    .addRadio({
      path: 'cellWidthMode',
      defaultValue: 'auto',
      name: 'Cell width',
      settings: {
        options: LayoutModeSetting,
      }
    })
    .addNumberInput({
      path: 'cellWidthValue',
      name: 'Width value (px)',
      defaultValue: 200,
      settings: {
        min: 1,
        integer: true
      },
      showIf: (config) => config.cellWidthMode === LayoutMode.fixed
    })
    .addRadio({
      path: 'gridMode',
      defaultValue: GridMode.fill,
      name: 'Grid fit in panel',
      settings: {
        options: GridModeSetting,
      }
    })
    .addRadio({
      path: 'imageMode',
      defaultValue: ImageMode.contain,
      name: 'Image fit in cell',
      settings: {
        options: ImageModeSetting,
      }
    })
    .addNumberInput({
      path: 'gap',
      name: 'Gap value (px)',
      defaultValue: 20,
      settings: {
        min: 0,
        integer: true
      }
    });
});

//showIf: (config) => config.showSeriesCount,
