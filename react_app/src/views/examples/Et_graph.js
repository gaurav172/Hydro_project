import React, { Component } from 'react'
import { LineChart, Tooltip, CartesianGrid, Line, XAxis, YAxis, Legend,Label } from 'recharts';

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
                <Tooltip />
                <Legend />
                <Line type="monotone" yAxisId="right" dot={false} dataKey="volume" stroke="#dd88dd" activeDot={{ r: 8 }} />
                <Line type="monotone" yAxisId="left" dot={false} dataKey="et_act" stroke="#88dd88" activeDot={{ r: 8 }} />
            </LineChart>
        );
    }
}
;
