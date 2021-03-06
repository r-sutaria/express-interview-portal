import React from "react";
import {Form,FormGroup,Label,Input,Button,Row,Col,CustomInput} from 'reactstrap';
import RoundCard from "./RoundCard";
export default class ExperienceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: 'Rutvik Sutaria',
            company: 'Amazon',
            branch: 'Computer Engineering',
            rounds:[
                {
                    id: '1',
                    title: '',
                    details: ''
                }
            ],
            internship:true,
            employment: false,
            receivedOffer: true,
            stipend:'',
            ctc:'',
            jobprofile:'',
            jobtype:'',
            accepted: false
        };
        this.addRound = this.addRound.bind(this);
        this.onChangeDetails = this.onChangeDetails.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.renderRound = this.renderRound.bind(this);
        this.removeCard = this.removeCard.bind(this);
    }

    componentDidMount() {
        this.setState({
            author: this.props.user
        });
        console.log(this.props.user);
    }

    getDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return(today);
    };

    saveExperience = () => {
        const uri='/saveExperience';
        const data = this.state;
        fetch(uri,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "company":data.company,
                "branch":data.branch,
                "jobtype":data.jobtype,
                "jobprofile": data.jobprofile,
                "ctc":data.ctc,
                "stipend":data.stipend,
                "rounds":data.rounds,
                "author":data.author,
                "likes":0,
                "accepted":null,
                "receivedOffer":data.receivedOffer,
                "date":this.getDate(),
                "reviewed":false
            })
        }).then( response => {
            console.log(response);
            return response.json()
        }).then((response) => {
                console.log(response);
                if(response.status === 500) {
                    console.log("Error while connecting to database please check your internet connection");
                }
        }).catch( error => console.log(error.message));
    };

    addRound = (event) => {
        const index = this.state.rounds.length;
        const list = this.state.rounds.slice().concat({
            id: (index+1).toString(),
            experience: ''
        });
        this.setState({
            rounds: list
        });
        console.log(this.state);
        event.preventDefault();
    };

    removeCard = (event,round) => {
        event.preventDefault();
        const list = this.state.rounds.filter((item) => item.id !== round.id)
        const modifiedList = list.map((item,index) => {
            return({
                id: (index+1).toString(),
                title: item.title,
                details: item.details
            })
        });
        this.setState({
            rounds: modifiedList
        })
    };

    onChangeTitle = (event,round) => {
        const list = this.state.rounds.slice();
        list[+round.id-1].title = event.target.value;
        this.setState({
            rounds: list
        })
    };

    onChangeDetails = (event,round) => {
        const list = this.state.rounds.slice();
        list[+round.id-1].details = event.target.value;
        this.setState({
            rounds: list
        })
    };

    renderRound = (round,index) => {
        return(
            <RoundCard
                id={index}
                onClick={this.removeCard}
                onChangeTitle={this.onChangeTitle}
                onChangeDetails={this.onChangeDetails}
                round={round}
            />);
    };

    render() {
        return (
            <div>
                <h3 className={'text-center mt-2'}>Interview Experience</h3>
                <Form className={'card-body'}>
                    <Row>
                        <Col md={2} className={'mr-1'}>
                            <Label
                                className="col-form-label"
                                for={'company'}
                            >
                                <h5><b>Company</b></h5>
                            </Label>
                        </Col>
                        <Col md={'auto'}>
                            <Input
                                type='text'
                                list={'companies'}
                                name='select'
                                id='company'
                                onChange={
                                    (event) => {
                                        this.setState({
                                            company: event.target.value
                                        });
                                    }
                                }
                            />
                            <datalist id={'companies'}>
                                <option value={'Amazon'}>Amazon</option>
                                <option value={'Media.net'}>Media.net</option>
                                <option value={'Microsoft'}>Microsoft</option>
                                <option value={'Samsung'}>Samsung</option>
                                <option value={'Google'}>Google</option>
                            </datalist>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} className={'mr-1 my-2'}>
                            <Label
                                className="col-form-label"
                                for={'branch'}
                            >
                                <h5><b>Branch</b></h5>
                            </Label>
                        </Col>
                        <Col md={'auto'}>
                            <Input
                                type='select'
                                list={'companies'}
                                name='select'
                                id='company'
                                value={this.state.branch}
                                onChange={
                                    (event) => {
                                        this.setState({
                                            branch: event.target.value
                                        });
                                    }
                                }
                            >
                                <option value={'Computer Engineering'}>Computer Engineering</option>
                                <option value={'Information Technology'}>Information Technology</option>
                                <option value={'Electronics & Communication'}>Electronics & Communication</option>
                                <option value={'Electrical Engineering'}>Electrical Engineering</option>
                                <option value={'Mechanical Engineering'}>Mechanical Engineering</option>
                                <option value={'Civil Engineering'}>Civil Engineering</option>
                                <option value={'Instrumentation & Control'}>Instrumentation & Control</option>
                            </Input>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Row>
                            <Col md={2} className={'mr-2'}>
                                <Label
                                    className="col-form-label"
                                >
                                    <h5><b>Job Type</b></h5>
                                </Label>
                            </Col>
                            <Col md={'auto'} className={'ml-3'}>
                                <Label check className={'col-form-label'}>
                                    <Input
                                        type = "radio"
                                        name = "job-type"
                                        onChange = {(e) => {
                                            this.setState({
                                                internship: e.target.value,
                                                employment: false,
                                                jobtype: '2-month Internship'
                                            })
                                        }}
                                    />
                                    <b>2-month Internship</b>
                                </Label>
                            </Col>
                            <Col md={'auto'}  className={'ml-3'}>
                                <Label check className={'col-form-label'}>
                                    <Input
                                        type="radio"
                                        name="job-type"
                                        onChange = {(e) => {
                                            this.setState({
                                                internship: e.target.value,
                                                employment: false,
                                                jobtype: '6-month Internship'
                                            })
                                        }}
                                    />
                                    <b> 6-month Internship </b>
                                </Label>
                            </Col>
                            <Col md={'auto'}  className={'ml-3'}>
                                <Label check className={'col-form-label'}>
                                    <Input
                                        type="radio"
                                        name="job-type"
                                        onChange = {(e) => {
                                            this.setState({
                                                internship: false,
                                                employment: e.target.value,
                                                jobtype: 'Full TIme Employment'
                                            })
                                        }}
                                    />
                                    <b> Full Time Employment </b>
                                </Label>
                            </Col>
                            <Col md={'auto'}  className={'ml-3'}>
                                <Label check className={'col-form-label'}>
                                    <Input
                                        type="radio"
                                        name="job-type"
                                        onChange = {(e) => {
                                            this.setState({
                                                internship: e.target.value,
                                                employment: e.target.value,
                                                jobtype: '6-month + Full time Employment'
                                            })
                                        }}
                                    />
                                    <b> 6-month + Full time Employment </b>
                                </Label>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        {
                            this.state.internship
                            ?
                                <FormGroup>
                                    <Row>
                                        <Col md={2}>
                                            <Label
                                                className="col-form-label "
                                                for={'stipend'}
                                            >
                                                <h5><b>Stipend</b></h5>
                                            </Label>
                                        </Col>
                                        <Col md={10}>
                                            <Input
                                                type='number'
                                                name='number'
                                                id='stipend'
                                                min={'0'}
                                                className={'col-3 float-left'}
                                                onChange={(e) => {
                                                        this.setState({
                                                            stipend: e.target.value + ' per month'
                                                        })
                                                    }
                                                }
                                            />
                                            <b className={'float-left ml-2 col-form-label'}>per month</b>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            :
                                <div></div>
                        }
                        {
                            this.state.employment
                                ?
                                <FormGroup className={'mt-1'}>
                                    <Row>
                                        <Col className={2}>
                                            <Label
                                                className="col-form-label"
                                                for={'ctc'}
                                            >
                                                <h5><b>CTC</b></h5>
                                            </Label>
                                        </Col>
                                        <Col md={10}>
                                            <Input
                                                type='number'
                                                name='number'
                                                id='ctc'
                                                className={'col-3 float-left'}
                                                min={'0'}
                                                onChange={(e) => {
                                                    this.setState({
                                                        ctc: e.target.value + ' per annum'
                                                    })
                                                }
                                                }
                                            />
                                            <b className={'ml-2 float-left col-form-label'}>per annum</b>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                :
                                <div></div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={2}>
                                <Label
                                    className="col-form-label"
                                    for={'job-profile'}
                                >
                                    <h5><b>Job Profile</b></h5>
                                </Label>
                            </Col>
                            <Col md={3}>
                                <Input
                                    type='text'
                                    name='text'
                                    id={'job-profile'}
                                    value={this.state.jobProfile}
                                    onChange={(e) => {
                                        this.setState({
                                            jobprofile: e.target.value
                                        })
                                    }}
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={2}>
                                <Label
                                    className={'col-form-label'}
                                    for={'receivedOffer'}
                                >
                                    <h5><b>Received Offer</b></h5>
                                </Label>
                            </Col>
                            <Col md={1}>
                                <CustomInput
                                    className={'col-form-label float-left'}
                                    id={'receivedOfferYes'}
                                    type={'radio'}
                                    name={'offerSwitch'}
                                    onChange={(e) => {
                                        this.setState({
                                            receivedOffer: true
                                        });
                                    }}
                                />
                                <Label for={'receivedOfferYes'} className={'col-form-label float-left'}><b>Yes</b></Label>
                            </Col>
                            <Col md={2}>
                                <CustomInput
                                    className={'col-form-label float-left'}
                                    id={'receivedOfferNo'}
                                    type={'radio'}
                                    name={'offerSwitch'}
                                    onChange={(e) => {
                                        this.setState({
                                            receivedOffer: false
                                        });
                                    }}
                                />
                                <Label for={'receivedOfferNo'} className={'col-form-label float-left'}><b>No</b></Label>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                    {
                        this.state.rounds.map((round,index) =>
                            <RoundCard
                                id={index}
                                onClick={this.removeCard}
                                onChangeTitle={this.onChangeTitle}
                                onChangeDetails={this.onChangeDetails}
                                round={round}
                                key={(index+1).toString()}
                            />
                        )
                    }
                    </FormGroup>
                    <FormGroup className={'p-3'}>
                        <Button
                            color={'dark'}
                            className={'mr-auto'}
                            onMouseDown={
                                (event) => {
                                    this.addRound(event);
                                }
                            }
                        >
                            Add Round
                        </Button>
                        <Button
                            className={'float-right'}
                            color={'dark'}
                            onClick={
                                (event) => {
                                    event.preventDefault();
                                    this.saveExperience();
                                    window.location.href='/experiences';
                                }
                            }
                        >
                            Submit
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}