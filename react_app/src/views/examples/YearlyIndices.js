import React, { Component } from 'react'
import { BarChart, Tooltip, CartesianGrid, Bar, ReferenceLine, XAxis, YAxis, Legend } from 'recharts';

export default class YearlyIndices extends Component {
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
                <Tooltip />
                <Legend />
                <ReferenceLine y={this.props.threshold/10} label={`Drought Threshold : ${this.props.threshold/10}`} stroke="red" />
                <Bar dataKey="sdi" fill="#dd88dd"/>
                <Bar dataKey="spi" fill="#88dd88" />
            </BarChart>
        );
    }
}
;