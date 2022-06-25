import React from "react";
import { Row, Col } from 'antd';
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from 'styled-components';

const SideBarStype = styled.div`
background: #3f0e40;
colorL: white;
height: 100vh;
`
export default function SideBar() {
    return (
        <SideBarStype>
            <Row>
                <Col span={24}><UserInfo /></Col>
                <Col span={24}><RoomList /></Col>
            </Row>
        </SideBarStype>
    );
}