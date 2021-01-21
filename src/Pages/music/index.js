import React, { useEffect, useState } from 'react'
import { Button, Card, message, Popconfirm, Space, Table, Avatar } from 'antd'
import axios from 'axios'
import servicePath from '../../config/apiAdminUrl'
import AddMusic from './components/AddMusic'
import UpdateMusic from './components/UpdateMusic'

export default (props) => {

    const [dataSource, setDataSource] = useState([])
    const [musicVisible, setMusicVisible] = useState(false);
    const [updateMusicVisible, setUpdateMusicVisible] = useState(false);
    const [values, setValues] = useState()

    useEffect(() => {
        getMusic();
    }, [])

    const getMusic = () => {
        axios({
            url: servicePath.getMusic,
            method: 'GET',

        }).then((res) => {
            setDataSource(res?.data?.data)
        })
    }

    const onDelete = async (id) => {
        message.loading({ content: '提交中' })
        try {
            const response = await axios(servicePath.deleteMusic + id)
            if (response) {
                message.success('提交成功')
            } else {
                message.error('提交失败')
            }
        } catch (error) {
            message.error('提交失败')
        }
        getMusic();
    }

    const columns = [
        {
            title: '歌名',
            dataIndex: 'name',
        },
        {
            title: '封面',
            dataIndex: 'cover',
            render: cover => {
                return <Avatar src={cover} />
            }
        },
        {
            title: '操作',
            dataIndex: 'options',
            render: (_, record) => {
                return (
                    <Space>
                        <a onClick={() => {
                            setUpdateMusicVisible(true);
                            setValues(record)
                        }}>修改</a>
                        <Popconfirm
                            title="确定要删除这个歌曲吗？"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => onDelete(record._id)}
                        >
                            <a href="#">删除</a>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ];

    const onAddCancel = () => {
        setMusicVisible(false)
    }
    const onAddSuccess = () => {
        setMusicVisible(false)
        getMusic()
    }

    const onUpdateCancel = () => {
        setUpdateMusicVisible(false)
    }
    const onUpdateSuccess = () => {
        setUpdateMusicVisible(false);
        getMusic()
    }
    return (
        <div>
            <Card title='音乐列表'
                extra={<Button type="primary" onClick={() => {
                    setMusicVisible(true)
                }}>新建音乐</Button>}
            >
                <Table key="id" dataSource={dataSource} columns={columns} />
            </Card>
            {musicVisible ?
                <AddMusic
                    visible={musicVisible}
                    onCancel={onAddCancel}
                    onSuccess={onAddSuccess}
                /> : null
            }
            {updateMusicVisible ?
                <UpdateMusic
                    visible={updateMusicVisible}
                    values={values}
                    onSuccess={onUpdateSuccess}
                    onCancel={onUpdateCancel}
                /> : null


            }
        </div>
    )
}