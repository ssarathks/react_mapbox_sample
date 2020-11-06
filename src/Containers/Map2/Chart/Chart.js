import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import classes from './Chart.module.css'

export default class Chart extends PureComponent {
  render() {
    //DATA TO THE CHART IS SAME OF THE MARKERS AT NEXT ZOOM
    const chartData = this.props.data

    return (
      <div className={classes.ChartDiv}>
        <p style={{color:"white"}}>Population chart</p>
        <ResponsiveContainer>
          <BarChart width={730} height={250} data={chartData}>
            <XAxis dataKey="city" tick={{fill : 'white'}} />
            <YAxis tick={{fill : 'white'}}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="population" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
