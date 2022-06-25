import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Tooltip, Input } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../context/AppProvider";
import Message from "./Message";

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
                
        &__info{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__title{
            margin: 0;
            font-weight: bold;

        }

        &__description {
            font-size: 12px;
        }
    }

`

const WrapperStyled = styled.div`
    height: 100vh;
`

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230 230 230);
    border-redius: 2px;

    .ant-form-item{
        flex: 1;
        margin-bottom: 0;
    }
`

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y:  auto;
`

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;

`;

export default function ChatWindow() {

    const { rooms, selectedRoomId } = useContext(AppContext);

    const selectedRoom = React.useMemo(() => rooms.find((room) => room.id === selectedRoomId), [rooms, selectedRoomId]);
    // console.log({rooms, selectedRoomId});
    return (
        <WrapperStyled>
            <HeaderStyled>
                <div className="header__info">
                    <p className="header__title">{selectedRoom?.name}</p>
                    <span className="header__description">{selectedRoom?.description}</span>
                </div>

                <ButtonGroupStyled>
                    <Button icon={<UserAddOutlined />} type="text" >Moi</Button>
                    <Avatar.Group size='small' maxCount={2}>
                        <Tooltip title="A">
                            <Avatar>A</Avatar>
                        </Tooltip>
                        <Tooltip title="A">
                            <Avatar>B</Avatar>
                        </Tooltip>
                        <Tooltip title="A">
                            <Avatar>C</Avatar>
                        </Tooltip>
                        <Tooltip title="A">
                            <Avatar>D</Avatar>
                        </Tooltip>
                        <Avatar>A</Avatar>
                    </Avatar.Group>
                </ButtonGroupStyled>

            </HeaderStyled>
            <ContentStyled>
                <MessageListStyled>
                    <Message text="Test" photoURL={null} displayName="Tung" createAt={2121212212} />
                    <Message text="Test" photoURL={null} displayName="Tung" createAt={2121212212} />
                    <Message text="Test" photoURL={null} displayName="Tung" createAt={2121212212} />
                </MessageListStyled>
                <FormStyled >
                    <Form.Item>
                        <Input bordered={false} autoComplete="off" />
                    </Form.Item>
                    <Button type="primary">Gửi</Button>
                </FormStyled>
            </ContentStyled>
        </WrapperStyled>
    )
}