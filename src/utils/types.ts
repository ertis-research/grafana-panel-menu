export enum LayoutMode {
  auto = 'auto',
  fixed = 'fixed'
}

export enum ImageMode {
  fill = 'fill',
  contain = 'contain',
  cover = 'cover',
  none = 'none'
}

export enum GridMode {
  fill = 'fill',
  contain = 'contain'
}

export interface Item {
  icon: string
  name: string
  url: string
  active: boolean
}

export interface Options {
  items: Item[];
  text: string;
  cellHeightMode: LayoutMode;
  cellHeightValue: number;
  cellWidthMode: LayoutMode;
  cellWidthValue: number;
  columns: LayoutMode;
  columnsNumber: number;
  rows: LayoutMode;
  rowsNumber: number;
  imageMode: ImageMode;
  gridMode: GridMode;
  gap: number;
}

export const LayoutModeSetting = [
  {
    value: LayoutMode.auto,
    label: 'Auto',
  },
  {
    value: LayoutMode.fixed,
    label: 'Fixed',
  }
]

export const ImageModeSetting = Object.values(ImageMode).map((img: ImageMode) => { return {value: img, label: img} })
export const GridModeSetting = Object.values(GridMode).map((mode: GridMode) => { return {value: mode, label: mode} })

