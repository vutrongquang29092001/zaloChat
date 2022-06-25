import React from "react";
import { Button, Collapse, Typography } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from '@ant-design/icons'
import { AppContext } from "../../context/AppProvider";

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
    color: white;
    

`

export default function RoomList() {

    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = React.useContext(AppContext);

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
                {
                    rooms.map((room) => (
                    <LinkStyled key={room.id} onClick = {() => setSelectedRoomId(room.id) }>{room.name}</LinkStyled>
                    ))
                }
                <Button type="text" icon={<PlusSquareOutlined />} className="add-room" onClick={handleAddRoom}>Them phong</Button>
            </PanelStyled>
        </Collapse>
    )
}