import React, { useState } from 'react'
import { Form, Modal, Button, Input, InputNumber, message } from 'antd'
import axios from 'axios'
import servicePath from '../../../config/apiAdminUrl'

export default (props) => {
    const [form] = Form.useForm();
    const { values, visible, onCancel, onSuccess } = props;
    console.log(values)
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (formValues) => {
        setSubmitting(true)
        formValues._id = values._id;
        try {
            console.log(formValues)
            const response = await axios({
                url: servicePath.updateType,
                method: "POST",
                data: formValues
            })
            if (response) {
                message.success('保存成功')
                setSubmitting(false)
                onSuccess();
            } else {
                message.error('保存失败')
            }
        } catch (error) {

            message.error(error)
        }
        setSubmitting(false)
    }

    return (
        <Modal
            title="修改信息"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                name="modalUpdate"
                layout="horizontal"
                onFinish={onSubmit}
                initialValues={{ ...values }}
            >
                <Form.Item
                    label="名称"
                    name="typeName"
                    rules={[{ message: '请输入名称', required: true }]}
                >
                    <Input placeholder="请输入名称" />
                </Form.Item>
                <Form.Item
                    label="排序"
                    name="sort"
                    rules={[{ required: true, message: '请输入排序' }]}
                >
                    <InputNumber style={{ width: '100%' }} placeholder="请输入排序" />
                </Form.Item>
                <Form.Item label="icon" name="icon" rules={[{ required: true, message: '请输入icon' }]}>
                    <Input placeholder="请输入Icon" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={submitting}>提交</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}