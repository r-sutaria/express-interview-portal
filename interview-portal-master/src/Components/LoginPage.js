import React from "react";
import {Form,FormGroup,Input,Label,Row,Col} from 'reactstrap';
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={'text-center m-3'}>
                <h5 className={'mb-3'}>
                    Login to Interview Portal
                </h5>
                <Form>
                    <FormGroup>
                        <div align={'center'}>
                            <Input
                                type={'text'}
                                name={'text'}
                                id={'email'}
                                style={{width:'30%'}}
                            />
                        </div>
                    </FormGroup>
                </Form>
            </div>
        );
    }

}