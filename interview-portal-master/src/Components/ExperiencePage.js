import React from 'react';
import AnswerProfileCard from "./AnswerProfleCard";
import {Button, Input} from "reactstrap";
import {FaRegStar,FaTimesCircle,FaCheckCircle,FaThumbsUp,FaThumbsDown,FaRegThumbsDown,FaRegThumbsUp} from "react-icons/all";

export default class ExperiencePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: {
                companyName: 'Amazon',
                author: 'Rutvik Sutaria',
                jobType: '6 month Internship + FTE',
                jobProfile: 'Software Development Engineer',
                ctc: '28,78,999',
                stipend: '60,000',
                receivedOffer: true,
                date: '04/02/2020',
                saved: false,
                accepted: 'none',
                helpful: 'none',
                rounds:[
                    {
                        id: '1',
                        title: 'Online Coding Round',
                        details: 'There were two questions. All the students that fully solved ' +
                            'both the questions got selected for the next round' +
                            'The first question was related to simple binary search. Linear search was not allowed.' +
                            'The second question could be solved using simple DFS/BFS.'
                    },
                    {
                        id: '2',
                        title: 'Data Structures and Algorithms Round',
                        details: 'There were two questions. All the students that fully solved ' +
                            'both the questions got selected for the next round' +
                            'The first question was related to simple binary search. Linear search was not allowed.' +
                            'The second question could be solved using simple DFS/BFS' +
                            'There were two questions. All the students that fully solved ' +
                            'both the questions got selected for the next round' +
                            'The first question was related to simple binary search. Linear search was not allowed.' +
                            'The second question could be solved using simple DFS/BFS.'
                    },
                    {
                        id: '3',
                        title: 'CS Fundamentals Round',
                        details: 'There were two questions. All the students that fully solved ' +
                            'both the questions got selected for the next round' +
                            'The first question was related to simple binary search. Linear search was not allowed.' +
                            'The second question could be solved using simple DFS/BFS' +
                            'There were two questions. All the students that fully solved ' +
                            'both the questions got selected for the next round' +
                            'The first question was related to simple binary search. Linear search was not allowed.' +
                            'The second question could be solved using simple DFS/BFS.'
                    }
                ]
            }
        }
    }

    componentDidMount() {
        if(this.props.accepted !== undefined){
            let exp = this.state.experience;
            exp.accepted = this.props.accepted;
            this.setState({
                experience: exp
            })
        }
    }

    renderRound = (round) => {
        return(
            <div>
                <h5>
                    Round {round.id} : ({round.title})
                </h5>
                <p style={{fontSize:18}}>
                    {round.details}
                </p>
            </div>
        )
    };

    render() {
        const {experience} = this.state;
        return (
            <div className={'container bg-white'}>
                <div className={'ml-4 row'}>
                    <h3 className={'text-center mb-3 mr-auto mt-3'}>
                        {`${experience.companyName} Interview Experience | ${experience.jobProfile}`}
                    </h3>
                    <Button
                        className={'text-dark mb-2'}
                        color={'link'}
                    >
                        <FaRegStar size={20}/>
                    </Button>
                </div>
                {
                    experience.accepted === 'yes' ?
                        <h6 className={'ml-4'}>
                            <span className={'text-success'}> <FaThumbsUp/></span> 56 people found this helpful
                        </h6>
                        :
                        <div/>
                }
                <div className={'ml-2 mb-3 border-top'}>
                    <AnswerProfileCard
                        src={'/pikachu.jpg'}
                        name={'Rutvik Sutaria'}
                        description={'8th semester CSE student'}
                    />
                </div>
                <div className={'border-top'}>
                    <div className={'my-3 ml-4'}>

                        <h5>{`Job Type: ${experience.jobType}`}</h5>
                        {experience.stipend !== '' ?  <h5>{`Stipend: \u20b9 ${experience.stipend} per month`}</h5>:``}
                        {experience.ctc !== '' ?  <h5>{`CTC: \u20b9 ${experience.ctc}`}</h5>:``}
                        <h5>
                            Received Offer: {experience.receivedOffer ? <span className={'col-form-label text-success'}><FaCheckCircle/></span> : <span className={'col-form-label text-danger'}><FaTimesCircle/></span>}
                        </h5>
                    </div>
                    <div className={'ml-4 border-top'}>
                        <div className={'mt-3'}>
                            {experience.rounds.map((round) => {
                                return this.renderRound(round);
                            })}
                        </div>
                    </div>
                    {
                        experience.accepted === 'yes' ?
                            <h6 className={'border-top pt-2 pl-4'}>
                                Was this experience helpful?{' '}
                                <Button size={'sm'} color={'white'} className={'mb-1 text-success'}
                                        onMouseDown={(e) => {
                                            const exp = experience;
                                            if(exp.helpful === 'yes') {
                                                exp.helpful = 'none';
                                            }
                                            else{
                                                exp.helpful = 'yes'
                                            }
                                            this.setState({
                                                experience: exp
                                            });
                                            e.preventDefault();
                                        }}
                                >
                                    {experience.helpful === 'yes' ? <FaThumbsUp/> : <FaRegThumbsUp/>}
                                </Button>
                                <Button size={'sm'} color={'white'} className={'mb-1 text-danger'}
                                        onMouseDown={(e) => {
                                            const exp = experience;
                                            if(exp.helpful === 'no') {
                                                exp.helpful = 'none';
                                            }
                                            else{
                                                exp.helpful = 'no'
                                            }
                                            this.setState({
                                                experience: exp
                                            });
                                            e.preventDefault();
                                        }}
                                >
                                    {experience.helpful === 'no' ? <FaThumbsDown/> : <FaRegThumbsDown/>}
                                </Button>
                            </h6>
                            :
                            <div className={'border-top pt-2 pl-4'}>
                                <Button
                                    className={'mr-2 mb-2'}
                                    color={'success'}
                                    size={'sm'}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        const exp = experience;
                                        exp.accepted = 'yes';
                                        this.setState({
                                            experience: exp
                                        })
                                    }
                                    }
                                >
                                    Accept
                                </Button>
                                <Button
                                    className={'mb-2'}
                                    color={'danger'}
                                    size={'sm'}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        const exp = experience;
                                        exp.accepted = 'no';
                                        this.setState({
                                            experience: exp
                                        })
                                    }
                                    }
                                >
                                    Reject
                                </Button>
                            </div>
                    }
                    {
                        experience.accepted === 'no' ? <div>
                            <div className={'pt-2 pl-4'}>
                                <Input
                                    type={'textarea'}
                                    name={'text'}
                                    rows={5}
                                    placeholder={'Reason for rejection...'}
                                />
                            </div>
                            <div className={'pt-2 pl-4 float-right'}>
                                <Button color={'dark'} size={'sm'}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                            :
                            <div/>
                    }
                </div>
            </div>
        );
    }

}