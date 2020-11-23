import React, { Component } from 'react'
import { LineChart, Tooltip, CartesianGrid, Line, XAxis, YAxis, Legend, ReferenceLine } from 'recharts';

export default class Indices extends Component {
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
                    <ReferenceLine y={this.props.threshold} label={`Drought Threshold : ${this.props.threshold}`} stroke="red" />
                    <Line type="monotone" dataKey="spi" stroke="#dd88dd" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="sdi" stroke="#88dd88" />
                </LineChart>
            );
        }
    }

