import React, { useEffect, useState } from 'react';
import { Line, Pie } from '@ant-design/charts';
import Axios from 'axios';
import servicePath from '../config/apiAdminUrl';
import moment from 'moment';
import { Card } from 'antd';

export default (props) => {
    const [data, setData] = useState([]);
    const [pieData, setPieData] = useState([]);


    useEffect(() => {
        getStatistics();
    }, [])
    useEffect(() => {
        getPie();
    }, [])
    const getStatistics = () => {
        Axios({
            url: servicePath.statistics,
            method: 'GET'
        })
            .then((res) => {
                setData(res.data.data)
            })

    }

    const getPie = () => {
        Axios({
            url: servicePath.pie,
            method: 'GET'
        })
            .then((res) => {
                setPieData(res.data.data)
            })
    }
    const config = {
        data: data,
        xField: 'year',
        yField: 'value',
        seriesField: 'name',
        xAxis: {
            label: {
                formatter: function formatter(x) {
                    return x ? moment(x).format('YYYY-MM-DD') : null;
                },
            },
            tickCount: 30,
            // tickInterval: 20,
            type: 'time'
        },
        yAxis: {
            label: {
                formatter: function formatter(v) {
                    return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                        return ''.concat(s, ',');
                    });
                },
            },
            autoHide: true,
            tickCount: 20,
            // tickInterval: 30,
        },
        legend: { position: 'top' },
        // smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
        color: ['#1979C9', '#D62A0D', '#FAA219', '#ffccc7', '#ffbb96', '#ffd591', '#ffd666', '#fff566', '#d3f261',
            '#95de64', '#5cdbd3', '#69c0ff', '#85a5ff', '#b37feb', '#ff85c0'
        ],

    };

    const PieConfig = {
        appendPadding: 10,
        data: pieData,
        angleField: 'value',
        colorField: 'name',
        radius: '0.9',
        label: {
            type: 'inner',
            offset: '-30%',
            content: '{value}',
        },

        // content: function content(_ref) {
        //     var percent = _ref.percent;
        //     return ''.concat(percent * 100, '%');
        // },
        style: {
            fontSize: 14,
            textAlign: 'center'
        },
        interactions: [{ type: 'element-active' }],
    }

    console.log(PieConfig)
    return (
        <div>
            <Card title="文章访问数量">
                <Line {...config} />
            </Card>

            <Card title="类型访问量" style={{ marginTop: 10 }}>
                <Pie {...PieConfig} />
            </Card>
        </div>
    )
}

