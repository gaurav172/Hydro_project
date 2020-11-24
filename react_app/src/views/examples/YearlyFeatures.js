import React, { Component } from 'react'
import { BarChart, Tooltip, CartesianGrid, Bar, XAxis, YAxis, Legend } from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

const CustomTooltip = props => {
    // payload[0] doesn't exist when tooltip isn't visible
    if (props.payload[0] != null) {
      // mutating props directly is against react's conventions
      // so we create a new payload with the name and value fields set to what we want
      const newPayload = [
        {
          name: 'date',
          color: 'grey',
          // all your data which created the tooltip is located in the .payload property
          value: props.payload[0].payload.date,
          // you can also add "unit" here if you need it
        },
        ...props.payload,
      ];
  
      // we render the default, but with our overridden payload
      return <DefaultTooltipContent {...props} payload={newPayload} />;
    }
  
    // we just render the default
    return <DefaultTooltipContent {...props} />;
  };


export default class YearlyFeatures extends Component {
    render() {
        return (
            <BarChart
                className='mx-auto'
                width={this.props.width}
                height={this.props.height}
                data={this.props.data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />             
                <Legend />
                <Bar dataKey="discharge" fill="#dd88dd"/>
                <Bar dataKey="precip" fill="#88dd88" />
            </BarChart>
        );
    }
}
;
