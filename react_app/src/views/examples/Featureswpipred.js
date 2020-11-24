import React, { Component } from 'react'
import { LineChart, Tooltip, CartesianGrid, Line, XAxis, YAxis, Legend } from 'recharts';
import moment from 'moment';
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

export default class Featureswpipred extends Component {

    formatXAxis = (tickItem) => { 
        return moment(tickItem).format('MM-YYYY');
    }

    render() {
        return (
            <LineChart
                className='mx-auto'
                width={this.props.width}
                height={this.props.height}
                data={this.props.data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={this.formatXAxis}/>
                <YAxis />
                <Tooltip content={<CustomTooltip />} />             
                <Legend />
                <Line type="monotone" dot={false} dataKey="wpi" stroke="#88dd88" activeDot={{ r: 8 }}/>
                <Line type="monotone" dot={false} dataKey="wpipred" stroke="#dd88dd" />
            </LineChart>
        );
    }
}
;
