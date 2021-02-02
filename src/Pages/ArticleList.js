import React, { useState, useEffect } from 'react'
import { Table, Space, Popconfirm, message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiAdminUrl'
import moment from 'moment'

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
                    <Popconfirm
                        title="要将文章删除吗？"
                        onConfirm={() => onDeleteConfirm(record._id)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <a href="#">删除</a>
                    </Popconfirm>
                    <a onClick={() => {
                        props.history.push({
                            pathname: '/index/add',
                            query: {
                                record
                            }
                        })
                    }}>修改</a>
                </Space>
            )
        }
    ]
    return (<Table key="_id" dataSource={list} columns={columns} />)
}
export default ArticleList