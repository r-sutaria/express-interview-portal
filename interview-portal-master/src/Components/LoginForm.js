import React from "react";
import {Col, Input, Label, Row,Form,Button} from "reactstrap";
export default function LoginForm(props) {
    const {onChangeUsernameLogin, onChangePasswordLogin, username, password} = props;
    return(
        <Form>
            <Row form={true} className={'my-2 mr-2'}>
                <Col md={2}>
                    <Label
                        for={'email'}
                    >
                        <b>Email</b>
                    </Label>
                </Col>
                <Col md={10}>
                    <Input
                        id = {'email'}
                        type = {'email'}
                        name = {'email'}
                        value = {username}
                        onChange = {onChangeUsernameLogin}
                    />
                </Col>
            </Row>
            <Row form={true} className={'my-2 mr-2'}>
                <Col md={2}>
                    <Label
                        for={'password'}
                    >
                        <b>Password</b>
                    </Label>
                </Col>
                <Col md={10}>
                    <Input
                        id={'password'}
                        type={'password'}
                        name={'password'}
                        value = {password}
                        onChange = {onChangePasswordLogin}
                    />
                </Col>
            </Row>
        </Form>
    )
}