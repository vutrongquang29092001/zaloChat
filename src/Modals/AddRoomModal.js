import { Form, Modal, Input } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { addDocument } from "../firebase/services";
import { AuthContext } from "../context/AuthProvider";
export default function AddRoomModal() {
    // set biến hiện thị component thêm phòng
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const {
        user: { uid },
    } = useContext(AuthContext);
    const [form] = Form.useForm();
    const handleOk = () => {
        // add new room to fireStore

        
        addDocument('rooms',{...form.getFieldsValue(), members: [uid]})
        setIsAddRoomVisible(false);

        // reset form value
        form.resetFields();
    }

    const handleCancel = () => {
        setIsAddRoomVisible(false);
    }

    return (
        <div>
            <Modal
                title="Tọa phòng"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label='Tên phòng' name='name'>
                        <Input placeholder='Nhập tên phòng' />
                    </Form.Item>
                    <Form.Item label='Mô tả' name='description'>
                        <Input.TextArea placeholder='Nhập mô tả' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}


