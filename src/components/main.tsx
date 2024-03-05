import React, { useEffect, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { Item, Options } from 'utils/types';

interface Props extends PanelProps<Options> {}

export const Main: React.FC<Props> = ({ options, data, width, height }) => {
  
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    if(options && options.items) {
      setItems(options.items)
    }
  }, [options])
  

  const getList = items.map((item: Item, idx: number) => {
      return (
        <div key={idx} style={{ display: 'flex', alignItems: 'center'}}>
          <a href={item.url} style={{width: '100%', height: '100%', padding: '0.2em'}}>
            <img src={item.icon} alt={item.name} style={{ width: '100%', height:'calc(100% - 2em)', objectFit: 'contain', display: 'block', margin: '0 auto' }}/>
            <h5 style={{ overflow: 'hidden', inlineSize: 'min-content', overflowWrap: 'break-word', textAlign: 'center', width: '100%', height: '1.5em', marginTop: '0.5em', lineHeight: '1.5em' }}>
              {item.name}
            </h5>
          </a>
        </div>
      )
    })
      
  return (
    <div id="demo" style={{ width: width, height: height, overflowY: 'auto', justifyContent: 'center', alignContent: 'center' }}>
      <div style={{ width: width-10, height: height-10, display: 'block', margin: '0 auto' }}>
        <div className='main-grid' style={{width: '100%', height: '100%'}}>
        {getList}
        </div>
      </div>
    </div>
  );
};
