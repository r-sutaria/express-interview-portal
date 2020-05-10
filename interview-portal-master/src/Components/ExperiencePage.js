import React from 'react';
import AnswerProfileCard from "./AnswerProfleCard";
import {Button, Input} from "reactstrap";
import {FaRegStar,FaTimesCircle,FaCheckCircle,FaThumbsUp,FaThumbsDown,FaRegThumbsDown,FaRegThumbsUp} from "react-icons/all";

export default class ExperiencePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: {},
            id:this.props.match.params.id,
            loading: true,
            show: true,
            title:""
        };
        this.getExperiences();
    }

    TokenNumber= async ()=>{
        const url = `https://powerful-depths-16046.herokuapp.com/token/`+this.state.author; // receiver id
        await fetch(url).then(res=>res.json()).then(res=>{this.setState({receiverToken:res.token});}).catch(err=>alert("error connecting to database "+err));
    };

    sendPushNotificationAccept = async () => {
        await this.TokenNumber();
        if(this.state.receiverToken!==""){
            const message = {
                to: this.state.receiverToken,
                sound: 'default',

                body: this.state.title+" has been accepted",
                data: { data: 'goes here' },
                _displayInForeground: true,
            };
            const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            }).catch(err=>console.log(err));
        }
    };

    sendPushNotificationReject = async () => {
        await this.TokenNumber();
        if(this.state.receiverToken!==""){
            const message = {
                to: this.state.receiverToken,
                sound: 'default',
                title: 'Regarding shared Interview Experience',
                body: this.state.title+" has been rejected",
                data: { data: 'goes here' },
                _displayInForeground: true,
            };
            const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            }).catch(err=>console.log(err));
        }
    };



    getExperiences = () => {
        const uri='/getExperience';
        fetch(uri,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "id":this.state.id
            })
        }).then( response => {
            // console.log(response);
            return response.json()
        }).then((response) => {
            const experience = response[0];
            this.setState({experience, loading: false, show: experience.accepted !== false,title:`${experience.company} Interview Experience | ${experience.jobprofile}`});
            console.log(experience);
            if(response.status === 500) {
                console.log("Error while connecting to database please check your internet connection");
            }
        }).catch( error => console.log(error.message));
    };

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
        if(!this.state.show){
            return(
              <h3>This experience has been rejected by the admin.</h3>
            );
        }
        return (
            this.state.loading ? <img src={'/loading.gif'} alt={'Loading..'} style={{position:'absolute',top:'50%',left:'50%'}}/>:
            <div className={'container bg-white'}>
                <div className={'ml-4 row'}>
                    <h3 className={'text-center mb-3 mr-auto mt-3'}>
                        {`${experience.company} Interview Experience | ${experience.jobprofile}`}
                    </h3>
                    <Button
                        className={'text-dark mb-2'}
                        color={'link'}
                    >
                        <FaRegStar size={20}/>
                    </Button>
                </div>
                {
                    experience.accepted ?
                        <h6 className={'ml-4'}>
                            <span className={'text-success'}> <FaThumbsUp/></span> {experience.likes} people found this helpful
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

                        <h5>{`Job Type: ${experience.jobtype}`}</h5>
                        {experience.stipend !== '' ?  <h5>{`Stipend: \u20b9 ${experience.stipend} per month`}</h5>:``}
                        {experience.ctc !== '' ?  <h5>{`CTC: \u20b9 ${experience.ctc}`}</h5>:``}
                        <h5>
                            Received Offer: {experience.receivedOffer ? <span className={'col-form-label text-success'}><FaCheckCircle/></span> : <span className={'col-form-label text-danger'}><FaTimesCircle/></span>}
                        </h5>
                    </div>
                    <div className={'ml-4 border-top'}>
                        <div className={'mt-3'}>
                            {experience.rounds !== undefined ? experience.rounds.map((round) => {
                                return this.renderRound(round);
                            }): <div />}
                        </div>
                    </div>
                    {
                        experience.accepted ?
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
                                    type={'Submit'}
                                    onClick={(e) => {
                                        this.sendPushNotificationAccept();
                                        fetch('/updateExperience', {
                                            method: 'POST',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                id:this.props.match.params.id,
                                                accepted: true
                                            })
                                        })
                                            .then(resp => resp.json())
                                            .then(resp => console.log(resp))
                                            .then(err => console.log(err));
                                            window.location.reload();
                                    }}
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
                                        exp.accepted = false;
                                        this.setState({
                                            experience: exp
                                        });
                                        this.sendPushNotificationReject();
                                    }
                                    }
                                >
                                    Reject
                                </Button>
                            </div>
                    }
                    {
                        experience.accepted === false ? <div>
                            <div className={'pt-2 pl-4'}>
                                <Input
                                    type={'textarea'}
                                    name={'text'}
                                    rows={5}
                                    placeholder={'Reason for rejection...'}
                                />
                            </div>
                            <div className={'pt-2 pl-4 float-right'}>
                                <Button color={'dark'} size={'sm'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        fetch('/updateExperience', {
                                            method: 'POST',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                id:this.props.match.params.id,
                                                accepted: experience.accepted
                                            })
                                        })
                                            .then(resp => resp.json())
                                            .then(resp => console.log(resp))
                                            .then(err => console.log(err));
                                        window.location.reload();
                                    }}
                                >
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

};