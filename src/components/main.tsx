import React, { useEffect, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { DarkIconMode, GridMode, Item, LayoutMode, Options } from 'utils/types';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { config } from '@grafana/runtime';

interface Props extends PanelProps<Options> { }

export const Main: React.FC<Props> = ({ options, data, width, height }) => {

  const isDarkMode = config.theme2.isDark
  const [items, setItems] = useState<Item[]>([])

  const cellHeight = (options.cellHeightMode === LayoutMode.auto) ? '100px' : ('calc(' + options.cellHeightValue + 'px + 2em)')
  const celWidth = (options.cellWidthMode === LayoutMode.auto) ? '90px' : (options.cellWidthValue + 'px')

  const columnSize = (options.gridMode === GridMode.fill) ? 'minmax(' + celWidth + ', 1fr)' : celWidth
  const rowSize = (options.gridMode === GridMode.fill) ? 'minmax(' + cellHeight + ', 1fr)' : cellHeight

  const gridColumns = (options.columns === LayoutMode.auto) ?
    'grid-template-columns: repeat(auto-fit, ' + columnSize + ')' :
    'grid-template-columns: repeat(' + options.columnsNumber + ', ' + columnSize + ')'

  const gridRows = (options.rows === LayoutMode.auto) ?
    'grid-auto-rows: minmax(' + cellHeight + ', auto)' :
    'grid-template-rows: repeat(' + options.rowsNumber + ', ' + rowSize + ')'

  const getStyles = () => {
    return {
      container: css`
        width: ${width}px; 
        height: ${height}px; 
        overflow-y: auto; 
        justify-content: center;
        align-content: center;
      `,
      containerNoScroll: css`
        width: ${width - 10}px; 
        height: ${height - 10}px; 
        display: block;
        margin: 0 auto; 
      `,
      mainGrid: css`
        display: grid;
        ${gridColumns};
        ${gridRows};
        grid-gap: ${options.gap}px;
        width: 100%;
        height: 100%;
      `,
      mainCell: css`
        display: flex;
        align-items: center;
        opacity: 0.6;
        &:hover {
          opacity: 1;
        }
      `,
      mainCellActive: css`
        display: flex;
        align-items: center;
        opacity: 0.9;
        &:hover {
          opacity: 1;
        }
      `,
      cellContent: css`
        padding: 0.8em;
        align-content: center;
        width: ${(options.cellWidthMode === LayoutMode.auto) ? '100%' : (options.cellWidthValue + 'px')};
        height: ${(options.cellHeightMode === LayoutMode.auto) ? '100%' : (options.cellHeightValue + 'px')};
      `,
      image: css`
        width: 100%;
        height: calc(100% - 2em);
        object-fit: ${options.imageMode};
        display: block;
        margin: 0 auto;
      `,
      text: css`
        overflow: hidden;
        inline-size: min-content;
        overflow-wrap: break-word; 
        text-align: center;
        width: 100%;
        height: 1.5em;
        margin-top: 0.5em;
        line-height: 1.5em;
        font-size: ${options.fontSize}px;
      `,
      textNoImage: css`
        overflow: hidden;
        inline-size: min-content;
        overflow-wrap: break-word; 
        text-align: center;
        width: 100%;
        height: 100%;
      `
    }
  }

  let styles = useStyles2(getStyles)


  useEffect(() => {
    if (options && options.items) {
      setItems(options.items)
    }
  }, [options])

  const getList = items.map((item: Item, idx: number) => {
    const hasIcon = item.icon !== undefined && item.icon.trim() !== ''
    const hasText = item.name !== undefined && item.name.trim() !== ''
    return (
      <div key={idx} className={(item.active) ? styles.mainCellActive : styles.mainCell}>
        <a href={item.url} className={styles.cellContent}>
          {(hasIcon) ?
            <img src={(isDarkMode && item.darkMode === DarkIconMode.custom) ? item.darkIcon : item.icon } alt={item.url} className={styles.image} style={{filter: (isDarkMode && item.darkMode === DarkIconMode.auto) ? 'invert(100%)' : 'invert(0%)'}} /> : <span></span>}
          {(hasText) ?
            <h5 className={(hasIcon) ? styles.text : styles.textNoImage}>{item.name}</h5> : <span></span>}
        </a>
      </div>
    )
  })

  return (
    <div className={styles.container}>
      <div className={styles.containerNoScroll}>
        <div className={styles.mainGrid}>
          {getList}
        </div>
      </div>
    </div>
  );
};
