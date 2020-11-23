import React, { Component } from 'react'
import { LineChart, Tooltip, CartesianGrid, Line, XAxis, YAxis, Legend } from 'recharts';

export default class Featureswpipred extends Component {
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
                <Line type="monotone" dot={false} dataKey="wpi" stroke="#88dd88" activeDot={{ r: 8 }}/>
                <Line type="monotone" dot={false} dataKey="wpipred" stroke="#dd88dd" />
            </LineChart>
        );
    }
}
;