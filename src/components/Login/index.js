import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase , { auth } from '../../firebase/config';
const { Title } = Typography;

export default function Login() {

    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleFbLogin = () => {
        auth.signInWithPopup(fbProvider);
        
    };
    console.log("mounted")
  
    return (
        <div>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>
                        ZaloChat
                    </Title>
                    <Button
                        style={{ width: '100%', marginBottom: 5 }}

                    >
                        Đăng nhập bằng Google
                    </Button>
                    <Button
                        style={{ width: '100%' }}
                        onClick={handleFbLogin} // khi click thì nhận đăng nhập từ facebook
                    >
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
}