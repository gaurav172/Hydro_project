import React, { Component } from 'react'
import { BarChart, Tooltip, CartesianGrid, Bar, XAxis, YAxis, Legend } from 'recharts';

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
                <Tooltip />
                <Legend />
                <Bar dataKey="discharge" fill="#8884d8"/>
                <Bar dataKey="precip" fill="#82ca9d" />
            </BarChart>
        );
    }
}
;
