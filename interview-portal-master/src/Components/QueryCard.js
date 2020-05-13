import React from "react";
import {Col, Row,Button} from "reactstrap";
import {Link} from "react-router-dom";
import {FaStar,FaRegStar} from "react-icons/all";
import AnswerProfileCard from "./AnswerProfleCard";

export default class QueryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saved: false
        }
    }

    onSaveClick = (e) => {
        e.preventDefault();
        this.setState({
            saved: !this.state.saved
        });
    };

    render() {
        const {id,question} = this.props;
        return (
            <div style={{backgroundColor:'#e3e4e6'}} className={'border border-dark rounded mr-5 mt-2'}>
                <Row>
                    <Col md={11}>
                        <Link to={'/queries/'+id} className={'text-dark btn-link'}>
                            <div className={'ml-3'}>
                                <h5 className={'m-3'}>
                                    {question}
                                </h5>
                            </div>
                        </Link>
                    </Col>
                    <Col md={1}>
                        {
                            !this.state.saved ? <Button color={'white mt-2'} title={'Save'} onMouseDown={this.onSaveClick}><FaRegStar/></Button>
                                : <Button color={'white mt-2'} title={'Unsave'} onMouseDown={this.onSaveClick}><FaStar/></Button>
                        }
                    </Col>
                </Row>

            </div>
        );
    }
}