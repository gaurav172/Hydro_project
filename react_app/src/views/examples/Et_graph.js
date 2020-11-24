import React, { Component } from 'react'
import { LineChart, Tooltip, CartesianGrid, Line, XAxis, YAxis, Legend,Label } from 'recharts';
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


export default class Et_graph extends Component {
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
                <XAxis dataKey="date" />
                <YAxis />
                <YAxis width={40} yAxisId="left" orientation="left" tick={{ fontSize: 10 }} domain={['dataMin-0.5', 'dataMax+0.5']} >
                    <Label
                        value='ET'
                        angle={-90}
                        position='outside'
                        fill='#676767'
                        fontSize={14}
                    />
                </YAxis>
                <YAxis width={40} yAxisId="right" orientation="right" tick={{ fontSize: 10, }} domain={['dataMin-40', 'dataMax+40']}>
                    <Label
                        value='Volume in mm'
                        angle={-90}
                        position='outside'
                        fill='#676767'
                        fontSize={14}
                    />
                </YAxis>
                <Tooltip content={<CustomTooltip />} />             
                <Legend />
                <Line type="monotone" yAxisId="right" dot={false} dataKey="volume" stroke="#dd88dd" activeDot={{ r: 8 }} />
                <Line type="monotone" yAxisId="left" dot={false} dataKey="et_act" stroke="#88dd88" activeDot={{ r: 8 }} />
            </LineChart>
        );
    }
}
;
