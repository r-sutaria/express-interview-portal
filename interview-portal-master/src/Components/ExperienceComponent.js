import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Input,Label} from "reactstrap";
import ExperienceCard from "./ExperienceCard";
export default class ExperienceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            experiences: [],
            loading: true,
            sort: "date"
        };
        this.getExperiences();
    }

    getExperiences = () => {
        fetch('/experiences')
            .then(res => res.json())
            .then(res => {
                let experiences = res.sort(function(a,b) {
                    return a.date.localeCompare(b.date);
                });
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
        // console.log(experiences);
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
                                value={this.state.sort}
                                onChange={(e) => {
                                    let experiences = this.state.experiences.sort(function (a,b) {
                                        if (e.target.value === "date") {
                                            return a.date.localeCompare(b.date);
                                        }
                                        if (e.target.value === "author") {
                                            return a.author.localeCompare(b.author);
                                        }
                                        if (e.target.value === "company") {
                                            return a.company.localeCompare(b.company);
                                        }
                                        if (e.target.value === "helpfulness") {
                                            return a.likes - b.likes;
                                        }
                                    });
                                    this.setState({
                                        sort:e.target.value,
                                        experiences
                                    });
                                }}
                            >
                                <option value={'date'}>
                                    Submission Date
                                </option>
                                <option value={'company'}>
                                    Company
                                </option>
                                <option value={'author'}>
                                    Author
                                </option>
                                <option value={'helpfulness'}>
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