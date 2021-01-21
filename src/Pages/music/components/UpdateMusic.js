import React, { useState } from 'react'
import { Modal, Form, Input, message, Button } from 'antd'
import axios from 'axios'
import servicePath from '../../../config/apiAdminUrl';


export default (props) => {
    console.log(props)
    const [form] = Form.useForm();

    const { onCancel, onSuccess, visible, values } = props;
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (formValues) => {
        setSubmitting(true)
        formValues._id = values._id;
        try {
            console.log(formValues)
            const response = await axios({
                url: servicePath.updateMusic,
                method: "POST",
                data: formValues
            })
            if (response) {
                message.success('修改成功')
                setSubmitting(false)
                onSuccess();
            } else {
                message.error('修改失败')
            }
        } catch (error) {

            message.error(error)
        }
        setSubmitting(false)
    }
    return (
        <Modal
            visible={visible}
            footer={null}
            onCancel={onCancel}
            title="修改歌曲"

        >
            <Form
                form={form}
                name="modalUpdate"
                layout="horizontal"
                onFinish={onSubmit}
                initialValues={{ ...values }}
            // form={form}
            >
                <Form.Item
                    label="歌曲"
                    name="name"
                    rules={[{ message: '请输入歌曲', required: true }]}
                >
                    <Input placeholder="请输入歌曲" />
                </Form.Item>
                <Form.Item
                    label="作者"
                    name="artist"
                    rules={[{ required: true, message: '请输入作者' }]}
                >
                    <Input placeholder="请输入作者" />
                </Form.Item>
                <Form.Item label="歌曲网址" name="url" rules={[{ required: true, message: '请输入歌曲网址' }]}>
                    <Input placeholder="请输入歌曲网址" />
                </Form.Item>
                <Form.Item label="歌曲图片" name="cover" rules={[{ required: true, message: '请输入歌曲图片网址' }]}>
                    <Input placeholder="请输入歌曲图片网址" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={submitting}>提交</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}