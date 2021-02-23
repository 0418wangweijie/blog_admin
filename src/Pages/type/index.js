import React, { useEffect, useState } from 'react'
import { Button, Card, message, Popconfirm, Space, Table } from 'antd'
import axios from 'axios'
import servicePath from '../../config/apiAdminUrl'
import AddType from './components/AddType'
import UpdateType from './components/UpdateType'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

export default () => {

    const [dataSource, setDataSource] = useState([])
    const [typeVisible, setTypeVisible] = useState(false)
    const [typeValues, setTypeValues] = useState()
    const [updatetypeVisible, setupdateTypeVisible] = useState(false)

    console.log(dataSource)
    useEffect(() => {
        getType();
    }, [])

    const getType = () => {
        axios({
            url: servicePath.getType,
            method: 'GET',
        }).then((res) => {
            setDataSource(res?.data?.data)
        })
    }

    const onDelete = async (id) => {
        message.loading({ content: '提交中' })
        try {
            const response = await axios(servicePath.deleteType + id)
            if (response?.data?.data?._id) {
                message.success('提交成功')
            } else {
                message.error('提交失败')
            }
        } catch (error) {
            message.error('提交失败')
        }
        getType();
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'typeName',
        },
        {
            title: '排序',
            dataIndex: 'sort'
        },
        {
            title: 'icon',
            dataIndex: 'icon'
        },
        {
            title: '操作',
            dataIndex: 'options',
            render: (_, record) => {
                return (
                    <Space>
                        <Button type="primary" size="small" onClick={() => {
                            setupdateTypeVisible(true)
                            setTypeValues(record)
                        }}><EditOutlined />修改</Button>
                        <Popconfirm
                            title="确定要删除这个类型吗？"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => onDelete(record._id)}
                        >
                            <Button type="primary" size="small" danger><DeleteOutlined />删除</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ];
    const onSuccess = () => {
        setTypeVisible(false)
        getType()
    }
    const onCancel = () => {
        setTypeVisible(false)
    }

    const onSuccessUpdate = () => {
        setupdateTypeVisible(false)
        getType()
    }
    const onCancelUpdate = () => {
        setupdateTypeVisible(false)
    }
    return (
        <>
            <Card
                title="类型列表"
                extra={<Button type="primary" onClick={() => {
                    setTypeVisible(true)
                }}><PlusOutlined />新建类型</Button>}
            >
                <Table bordered rowKey="_id" dataSource={dataSource} columns={columns} />

            </Card>
            {typeVisible ?
                <AddType
                    visible={typeVisible}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                /> : null
            }
            {updatetypeVisible ?
                <UpdateType
                    visible={updatetypeVisible}
                    onSuccess={onSuccessUpdate}
                    onCancel={onCancelUpdate}
                    values={typeValues}
                /> : null
            }
        </>
    )
}