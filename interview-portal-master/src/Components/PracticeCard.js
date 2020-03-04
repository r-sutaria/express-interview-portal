import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Row, Button} from "reactstrap";
import {FaStar,FaRegStar} from "react-icons/all";
export default function PracticeCard(props) {
    return(
        <div style={{backgroundColor:'#e3e4e6',width:'98%'}} className={'p-3 border rounded border-dark m-2'}>
            <Row>
                <Col md={6}>
                        <h4>
                            <Link to={'/practice/problem1'} className={'text-dark'}>
                                {props.title}
                            </Link>
                        </h4>

                    <b>
                        <span className={'text-warning'}>{props.difficulty}</span>, Success Rate: {props.successRate}%
                    </b>
                </Col>
                <Col md={6} className={'col-form-label mt-1'}>
                    <div className={'float-right mr-3'}>
                        <Button
                            color={'white'}
                            onMouseDown={props.onSaveClick}
                        >
                            {
                                !props.saved ? <FaRegStar/> : <FaStar/>
                            }

                        </Button>
                        <Link to={'/practice/problem1'} className={'btn border-dark rounded'} style={{textDecoration:'none'}}>
                            Solve
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
}