import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { Main } from './components/main';
import { DashboardEditor } from './components/editors/dashboardEditor';
import './css/bootstrap-grid.css';
import './css/grid.css';
import './css/others.css';

export const plugin = new PanelPlugin<SimpleOptions>(Main).setPanelOptions((builder) => {
  return builder
    .addCustomEditor({
      path : 'dashboard',
      id: 'dashboards',
      name : 'Dashboards',
      editor : DashboardEditor
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
