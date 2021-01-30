import React, { useEffect, useState } from 'react'
import { Line, Pie } from '@ant-design/charts'
import Axios from 'axios'
import servicePath from '../config/apiAdminUrl'
import moment from 'moment'
import { Card } from 'antd'

export default (props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        getStatistics()
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

    var newdata = [
        {
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其他',
            value: 5,
        },
    ];

    const config = {
        data: data,
        xField: 'year',
        yField: 'value',
        seriesField: 'name',
        xAxis: {
            label: {
                formatter: function formatter(x) {
                    return x ? moment(x).format('YYYY-MM-DD') : null;
                }
            },
            type: 'time'
        },
        color: ['#1979C9', '#D62A0D', '#FAA219'],

    };

    const PieConfig = {
        appendPadding: 10,
        data: newdata,
        angleField: 'value',
        colorField: 'type',
        radius: '0.9',
        label: {
            type: 'inner',
            offset: '-30%'
        },
        content: function content(_ref) {
            var percent = _ref.percent;
            return ''.concat(percent * 100, '%');
        },
        style: {
            fontSize: 14,
            textAlign: 'center'
        },
        interactions: [{ type: 'element-active' }],
    }
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

