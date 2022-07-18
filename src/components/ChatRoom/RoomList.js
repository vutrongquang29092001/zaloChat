import React from "react";
import { Button, Collapse, Dropdown, Menu, Typography } from "antd";
import styled from "styled-components";
import { EllipsisOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { AppContext } from "../../context/AppProvider";
import { db } from "../../firebase/config";
import { AuthContext } from "../../context/AuthProvider";
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header,
         p {
            color: white;
        }

        .ant-collapse-content-box {
            padding: 0 40px;
        }
        .add-room {
            color: white;
            padding: 0;
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    width: 100%;
    
`


const RoomNameStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function RoomList() {

    const { rooms, setIsAddRoomVisible, selectedRoomId, setSelectedRoomId } = React.useContext(AppContext);
    const {user} = React.useContext(AuthContext);
    const handleDeleteRoom = (id) => {
        
        db.collection("rooms").doc(id).get().then(doc => {
            if(doc.data().members.length === 1) {
                db.collection("rooms").doc(id).delete().then(() => alert("Leave room successfully!"))
                return;
            }
            const newMembers = doc.data().members.filter(item => item !== user.uid)
            db.collection("rooms").doc(id).update({
                members: newMembers
              }).then(function() {
                alert("Leave room successfully!");
              });
        })
    }
    const handleMenuClick = (e, id) => {
        switch (e.key) {
            case "1": {
                handleDeleteRoom(id)
                break;
            }
            default:
                break;
        }
    };

    /** cấu trúc của một rooms
     * name: 'room name',
     * description: '....',
     * member: [uid1, uid2,]
     */

    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    };
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="Danh sach cac phong" key='1'>
                {/* <input type="file" accept="image/*" /> */}
                {
                    rooms.map((room) => (
                        <RoomNameStyle>
                            <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)} style={{ color: selectedRoomId === room.id ? "#1890FF" : "white" }}>{room.name}</LinkStyled>

                            <Dropdown overlay={<Menu
                                onClick={(e) => handleMenuClick(e, room.id)}
                                items={[
                                    {
                                        label: 'Leave Room',
                                        key: '1',
                                    },
                                ]}
                            />}>
                                <EllipsisOutlined style={{ fontSize: '1.5rem', color: "white" }} />
                            </Dropdown>
                        </RoomNameStyle>
                    ))
                }
                <Button type="text" icon={<PlusSquareOutlined />} className="add-room" onClick={handleAddRoom}>Them phong</Button>
            </PanelStyled>
        </Collapse>
    )
}