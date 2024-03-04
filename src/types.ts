type SeriesSize = 'sm' | 'md' | 'lg';

export interface IDashboard {
  icon: string
  name: string
  url: string
}

export interface SimpleOptions {
  dashboard: IDashboard[];
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}
