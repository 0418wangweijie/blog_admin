import React, { useState, useEffect } from 'react'
import { Table, Space, Popconfirm, message, Button } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiAdminUrl'
import '../static/css/ArticleList.css'
import moment from 'moment'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function ArticleList(props) {

    const [list, setList] = useState([])

    const [type, setType] = useState([])
    useEffect(() => {
        getArticleList();
    }, [])

    const getArticleList = () => {
        axios({
            url: servicePath.getArticle,
            method: "GET",
            // withCredentials: true
        }).then(
            res => {
                setList(res.data.data)
            }
        )

        axios({
            url: servicePath.getType,
            method: "GET",
            // withCredentials: true
        }).then(
            res => {
                setType(res.data.data)
            }
        )
    }
    const onDeleteConfirm = async (id) => {
        console.log(id)
        // , { withCredentials: true }
        try {
            const response = await axios(servicePath.deleteArticle + id)
            console.log(response)
            if (response.data?.success) {
                message.success('删除成功')
                getArticleList();
            } else {
                message.error('删除失败')
            }
        } catch (error) {
            message.error('删除失败');
            console.log(error)
        }

    }
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '发布时间',
            dataIndex: 'createTime',
            render: (createTime) => {
                return createTime ? moment(createTime).format('YYYY-MM-DD') : null;
            }
        },
        {
            title: '访问次数',
            dataIndex: 'visitCount'
        },
        {
            title: '文章分类',
            dataIndex: 'typeId',
            render: (_, record) => {
                for (let i = 0; i < type.length; i++) {
                    if (type[i]._id === record.typeId) {
                        return type[i].typeName
                    }
                }
            }
        },
        {
            title: '操作',
            dataIndex: 'options',
            render: (_, record) => (
                <Space>
                    <Button type="primary" size="small" onClick={() => {
                        props.history.push({
                            pathname: '/index/add',
                            query: {
                                record
                            }
                        })
                    }}><EditOutlined />修改</Button>
                    <Popconfirm
                        title="要将文章删除吗？"
                        onConfirm={() => onDeleteConfirm(record._id)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button size="small" type="primary" danger><DeleteOutlined />删除</Button>
                    </Popconfirm>

                </Space>
            )
        }
    ]
    return (<Table bordered justify="center" rowKey="_id" dataSource={list} columns={columns} />)
}
export default ArticleList