import React, { Component } from 'react'
import { LineChart, Tooltip, CartesianGrid, Line, XAxis, YAxis, Legend } from 'recharts';

export default class Features extends Component {
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
                <Tooltip />
                <Legend />
                <Line type="monotone" dot={false} dataKey="discharge" stroke="#dd88dd" activeDot={{ r: 8 }}/>
                <Line type="monotone" dot={false} dataKey="precip" stroke="#88dd88" />
            </LineChart>
        );
    }
}
;
