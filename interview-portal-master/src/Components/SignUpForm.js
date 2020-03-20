import React from "react";
import {Col, Form, Input, Label, Row,FormFeedback} from "reactstrap";
export default function SignUpForm(props) {
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
                        id={'email'}
                        type={'email'}
                        name={'email'}
                        value={props.email}
                        onChange={props.onChangeEmail}
                        valid={props.email!==''&&props.emailUnique}
                        invalid={!props.emailUnique}
                    />
                    {
                        props.emailUnique?<div/>:<FormFeedback>This email has already been registered.</FormFeedback>
                    }
                </Col>
            </Row>
            <Row form={true} className={'my-2 mr-2'}>
                <Col md={2}>
                    <Label
                        for={'username'}
                    >
                        <b>Username</b>
                    </Label>
                </Col>
                <Col md={10}>
                    <Input
                        id={'username'}
                        type={'text'}
                        name={'username'}
                        value={props.username}
                        onChange={props.onChangeUsername}
                        valid={props.username!==''&&props.usernameUnique}
                        invalid={!props.usernameUnique || props.username.includes(' ')}
                    />
                    {
                        props.usernameUnique?<div/>:<FormFeedback>This username is taken.</FormFeedback>
                    }
                    {
                        !props.username.includes(' ')?<div/>:<FormFeedback>Username cannot contain spaces.</FormFeedback>
                    }
                </Col>
            </Row>
            <Row form={true} className={'my-2 mr-2'}>
                <Col md={2}>
                    <Label
                        for={'name'}
                    >
                        <b>Name</b>
                    </Label>
                </Col>
                <Col md={10}>
                    <Input
                        id={'name'}
                        type={'text'}
                        name={'name'}
                        value={props.name}
                        onChange={props.onChangeName}
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
                        value={props.password}
                        onChange={props.onChangePassword}
                    />
                </Col>
            </Row>
            <Row form={true} className={'my-2 mr-2'}>
                <Col md={2}>
                    <Label
                        for={'confirm-password'}
                    >
                        <b>Confirm Password</b>
                    </Label>
                </Col>
                <Col md={10}>
                    <Input
                        id={'confirm-password'}
                        type={'password'}
                        name={'confirm-password'}
                        value={props.confirmPassword}
                        onChange={props.onChangeConfirmPassword}
                        valid={props.password !== '' && props.password === props.confirmPassword}
                        invalid={props.password !== props.confirmPassword}
                    />
                    {
                        props.password !== props.confirmPassword ? <FormFeedback>ConfirmPassword and Password are not matching.</FormFeedback>:<div/>
                    }
                </Col>
            </Row>
        </Form>
    );
}