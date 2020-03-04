import React from 'react';
import {Button, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {FaCheckCircle, FaRegStar, FaStar, FaThumbsUp, FaTimesCircle} from "react-icons/all";

export default function ExperienceCard(props) {
    const {experience,link} = props;
    console.log(experience);
    return(
        <div style={{backgroundColor:'#e3e4e6'}} className={'border border-dark rounded mr-5 mt-2'}>
            <Row>
                <Col md={11}>
                    <Link to={link !== undefined? link : '/experience1'} className={'text-dark btn-link'}>
                        <h5 className={'m-3'}>
                            {`${experience.companyName} interview experience for ${experience.jobProfile} by ${experience.author}`}
                        </h5>
                    </Link>
                </Col>
                <Col md={1}>
                    {
                        !experience.saved ? <Button color={'white mt-2'} title={'Save'} onMouseDown={props.onSaveClick}><FaRegStar/></Button>
                            : <Button color={'white mt-2'} title={'Unsave'} onMouseDown={props.onSaveClick}><FaStar/></Button>
                    }
                </Col>
            </Row>
            <div className={'ml-3 mb-3'}>
                {`Submission Date: ${experience.date}`}
                <br/>
                {`Rounds: ${experience.n_rounds}`}
                <br/>
                {`Received Offer:  `}{ experience.receivedOffer ? <span className={'text-success ml-1'}><FaCheckCircle /></span> : <span className={'text-danger ml-1'}><FaTimesCircle /></span>}
                <br/>
                {
                    experience.accepted === 'yes' ? <h6>
                        <span className={'text-success'}><FaThumbsUp size={14}/></span>{' '+experience.helpful+' '} people found this helpful
                    </h6>
                        :
                        <div/>
                }
            </div>
        </div>
    )
}
