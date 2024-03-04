import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
// import { css, cx } from '@emotion/css';
// import { useStyles2, useTheme2, CustomScrollbar } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

// const getStyles = () => {
//   return {
//     wrapper: css`
//       font-family: Open Sans;
//       position: relative;
//     `,
//     svg: css`
//       position: absolute;
//       top: 0;
//       left: 0;
//     `,
//     textBox: css`
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       padding: 10px;
//     `,
//   };
// };

export const Main: React.FC<Props> = ({ options, data, width, height }) => {
  const dashboards = options.dashboard;
  
  const dashBoardsJSON: { [s: string]: any; } = [];
  
  dashboards.forEach( function(dashboardCurr) {
      dashBoardsJSON.push(JSON.stringify(dashboardCurr));
  });

  // const theme = useTheme2();
  // const styles = useStyles2(getStyles);


  // let divGrande = document.createElement("div");
  //   for(let i = 0; i < dashboards.length; i++){
  //     let div = document.createElement("div");
  //     let texto = document.createTextNode("NOMBRE: " + dashboards[i].name + " DIRECCION: " + dashboards[i].url + " ICONO: " + dashboards[i].icon);
  //     div.appendChild(texto);
  //     divGrande.appendChild(div);
  //   }

  // let cosas = [];
  // const getListTags = dashboards.forEach(function(dashboard, key) {
  //   cosas.push(
  //     <div className="row">
  //       <div className="col-md-4">
  //         <div className="card">
  //           <div className="card-body">
  //             <h5 className="card-title">{dashboard.name}</h5>
  //             <p className="card-text">{dashboard.url}</p>
  //             <a href="#" className="btn btn-primary">{dashboard.icon}</a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });
/*
  const getListTags = () => {
    let cosas: JSX.Element[] = [];
    dashboards.forEach(function(dashboard, key) {
      cosas.push(
        <div className="col">
          <a href={dashboard.url}>
            <img src={dashboard.icon} width="50"></img>
            <p>{dashboard.name}</p>
          </a>
        </div>
      );
    });

    return cosas;
      
  }*/

  const getListTags2 = 
    dashboards.map(function(dashboard) {
      return (
        <a href={dashboard.url}>
          <div className="col">
            <img src={dashboard.icon} width="100%" ></img>
            <p>{dashboard.name}</p>
          </div>
        </a>
        
      )
    })
      


  return (
    <div id="demo" className='row container verticalDiv' style={{ width: width, height: height }}>
      <center>{getListTags2}</center>
      
    </div>
  );
};
