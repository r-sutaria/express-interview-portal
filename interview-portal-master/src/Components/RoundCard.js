import React from 'react';
import {Button, FormGroup, Input, Label,Row,Col} from 'reactstrap';
import {FaTrashAlt} from "react-icons/fa";
import './RoundCard.css';
export default function RoundCard(props) {
    const {id,onClick,onChangeTitle,onChangeDetails,round} = props;
    return(
        <FormGroup className={'border border-dark p-2 rounded'}>
            <Row>
                <Col md={11}>
                    <h3 className={'text-center'}>Round {id+1}</h3>
                </Col>
                <Col >
                    <Button
                        className={'btn-sm float-right m-1'}
                        color={'danger'}
                        onClick={(event) => {
                            onClick(event,round);
                        }}
                    >
                        <FaTrashAlt/>
                    </Button>
                </Col>
            </Row>
            <Row form={true} className={'my-3 mr-2'}>
                <Col lg={'auto'} className={'col-form-label text-center'}>
                    <Label
                        for={'title'+id}
                        className={'mx-3'}
                    >
                        <h5><b>Round Title</b></h5>
                    </Label>
                </Col>
                <Col>
                    <Input
                        id={'title'+id}
                        type={'text'}
                        name={'test'}
                        value={round.title}
                        onChange={(event) => {
                            onChangeTitle(event,round)
                        }}
                    />
                </Col>
            </Row>
            <Row form={true} className={'my-2 mr-2'}>
                <Col xs={'auto'}>
                    <Label
                        for={'details'+id}
                        lg={'auto'} className={'col-form-label text-center'}
                    >
                        <h5><b>Round Details</b></h5>
                    </Label>
                </Col>
                <Col md={12}>
                    <Input
                        id={'details'+id}
                        type={'textarea'}
                        name={'text'}
                        rows={5}
                        value={round.details}
                        onChange={(event) => {
                            onChangeDetails(event,round)
                        }}
                    />
                </Col>
            </Row>
        </FormGroup>
    );
};