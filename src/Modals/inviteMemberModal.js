import { Avatar, Form, Modal, Select, Spin } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { addDocument } from "../firebase/services";
import { AuthContext } from "../context/AuthProvider";
import { debounce } from 'lodash'
import { db } from "../firebase/config";

// tìm kiếm 
function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    // cái cờ để biết có đăng lấu API hay không
    const [fetching, setFetching] = useState(false);
    // 
    const [options, setOptions] = useState([])
    // gọi API 
    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);
            // promise - lấy dữ liệu ( gọi API) 
            fetchOptions(value,props.curMembers ).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions]);
    React.useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>

    )
}
async function fetchUserList(search, curMembers) {
    return db
        .collection('users')
        .where('keywords', 'array-contains', search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then(snapshot => {
            return snapshot.docs
                .map((doc) => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL,
                })).filter(opt => curMembers.includes(opt.value) );

        });
}
// component add member
export default function InviteMemberModal() {
    // set varibel component  add member 
    const {
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        selectedRoomId,
        selectedRoom } = useContext(AppContext);


    const {
        user: { uid },
    } = useContext(AuthContext);
    const [form] = Form.useForm();
    const [value, setValue] = useState([])
    const handleOk = () => {

        // add new room to fireStore
        //  addDocument('rooms', { ...form.getFieldsValue(), members: [uid] })


        // update member in current room
        const roomRef = db.collection('rooms').doc(selectedRoomId);
        roomRef.update({
            members: [...selectedRoom.members, ...value.map(val => val.value)],
        })

        setIsInviteMemberVisible(false);

        // reset form value
        form.resetFields();
    }

    const handleCancel = () => {
        form.resetFields();

        setIsInviteMemberVisible(false);
    }
    console.log({ value });
    return (
        <div>
            <Modal
                title="Mời thêm thành viên"
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        // name='search-user'
                        label='Tên các thành viên'
                        value={value}
                        placeholder='Nhập tên thành viên'
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    )
}


