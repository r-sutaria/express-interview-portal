import React from 'react';
import {Link} from 'react-router-dom';
import {FaCheckCircle,FaTimesCircle,FaRegStar,FaStar,FaThumbsUp} from "react-icons/all";
import {Button,Row,Col,Input,Label} from "reactstrap";
import ExperienceCard from "./ExperienceCard";
export default class ExperienceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            experiences: []
        };
        this.getExperiences();
    }

    getExperiences = () => {
        fetch('/experiences')
            .then(res => res.json())
            .then(res => {
                let experiences = res.map((item) => {
                    return({
                        id: res.id,
                        company: res.company,
                        jobprofile: res.jobprofile,
                        author: res.author,
                        accepted: res.accepted,
                        receivedOffer: res.receivedOffer,
                        saved: false,
                        date: res.date,
                        likes: res.likes
                    });
                });
                this.setState({experiences});
            })
            .catch(err => {
                console.log(err);
            });
    };

    onSaveClick = (e) => {
      e.preventDefault();
      // this.setState({
      //     saved: !this.state.saved
      // });
    };

    render() {
        const {experiences} = this.state;
        return(
            <div>
                <div className={'border-bottom'}>
                    <h5>
                        Want to share your experience? Fill this <Link to={'/interview-experience-form'}>interview experience form</Link>.
                    </h5>
                </div>
                <div className={'border-bottom pb-2 mt-2'}>
                    <Row>
                        <Col
                            md={'auto'}
                        >
                            <Label
                                for={'sort-by'}
                                className={'col-form-label'}
                            >
                                Sort By:
                            </Label>
                        </Col>
                        <Col
                            md={6}
                        >
                            <Input
                                type={'select'}
                                name={'select'}
                                id={'sort-by'}
                                style={{width:'30%'}}
                            >
                                <option>
                                    Submission Date
                                </option>
                                <option>
                                    Company
                                </option>
                                <option>
                                    Author
                                </option>
                                <option>
                                    Helpfulness
                                </option>
                            </Input>
                        </Col>
                    </Row>
                </div>
                {/*{this.renderExperienceCard(experiences[0])}*/}
                {/*<ExperienceCard experience={experiences[0]} onSaveClick={this.onSaveClick}/>*/}
                {
                    experiences.map(experience => {
                        return(experience.accepted === 'yes' ? <ExperienceCard experience={experience} link={'/experience2'} onSaveClick={this.onSaveClick}/>
                            : <div />
                        )
                    })
                }
            </div>
        );
    }

}