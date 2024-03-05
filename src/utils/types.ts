type SeriesSize = 'sm' | 'md' | 'lg';

export interface Item {
  icon: string
  name: string
  url: string
}

export interface Options {
  items: Item[];
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}
