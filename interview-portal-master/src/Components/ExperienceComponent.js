import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Input,Label} from "reactstrap";
import ExperienceCard from "./ExperienceCard";
export default class ExperienceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            experiences: [],
            loading: true
        };
        this.getExperiences();
    }

    getExperiences = () => {
        fetch('/experiences')
            .then(res => res.json())
            .then(res => {
                let experiences = res;
                this.setState({experiences,loading:false});
                // console.log(experiences);
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
        if(this.state.loading){
            return <img src={'/loading.gif'} alt={'Loading..'} style={{position:'absolute',top:'50%',left:'50%'}}/>
        }
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
                        // console.log(experience);
                        return(experience.accepted  ? <ExperienceCard key={experience._id} experience={experience} link={'/experience2'} onSaveClick={this.onSaveClick}/>
                            : <div />
                        )
                    })
                }
            </div>
        );
    }

}