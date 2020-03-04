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
        return (
            <div style={{backgroundColor:'#e3e4e6'}} className={'border border-dark rounded mr-5 mt-2'}>
                <Row>
                    <Col md={11}>
                        <Link to={'/query1'} className={'text-dark btn-link'}>
                            <div className={'ml-3'}>
                                <h5 className={'m-3'}>
                                    What are some tips to crack Amazon interview?
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
                <div className={'ml-3 mb-3'}>
                    <AnswerProfileCard
                        src={'/pikachu.jpg'}
                        name={'Rutvik Sutaria'}
                        description={'8th semester CSE student'}
                    />
                    <div className={'ml-3 mt-1'}>
                        <div style={{height:75,overflow:'hidden'}}>
                            I attended Amazon interview recently. You need to be good at basics of data structures,
                            algorithms and object oriented design.
                            One cannot read object oriented concepts and become a master in it.
                            Try implementing it in whatever the project you're doing.
                            That way it's easy to gain the intuition about the object oriented programming and design.
                            I prepared for data structure questions from cracking the coding interview.
                            You need to understand the basics of the important data structures and
                            how they work and try implementing the basic version of those.
                            This will help in understanding its applications...
                        </div>
                        {'...'}
                        <Link to={'/query1/answer1'}>
                            (more)
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}