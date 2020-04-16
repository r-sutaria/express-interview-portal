import React from "react";
import AnswerBox from "./AnswerBox";
import {Card,Button} from "reactstrap";
import {FaComment,FaEllipsisH,FaFacebookF,FaTwitter,AiFillEdit,FaStar,MdReport,AiOutlineStop} from "react-icons/all";
import '../Images/pikachu.jpg';
import AnswerCard from "./AnswerCard";


export default class BlogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOptionsOpen: false,
            answer: false,
            query: {},
            answers: [],
            width: window.innerWidth,
            height: window.innerHeight,
            loading: true
        };
        this.getQuery();
    }

    fetchReq = async(uri,id) => {
        const response = await fetch(uri,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "id":id
            })
        });
        return await response.json();
    };

    getQuery() {
        this.fetchReq('/getQuery',this.props.match.params.id).then(query => {
            this.fetchReq('/getAnswers',query[0].answers).then(answers => {
                this.setState({
                    query: query[0],answers,loading: false
                })
            });
        });
        // const answers = query.answers.map((answer_id) => {
        //     return this.fetchReq('/getAnswer')[0];
        // });
        // this.setState({query,answers,loading:false});
        // console.log(query);
    };

    onClickHelpful = (e,currentAnswer) => {
        e.preventDefault();
        const {answers} = this.state;
        const newAnswers = answers.map(answer => {
           return answer.id ===  currentAnswer.id ? {
               id:answer.id,
               answer: currentAnswer.answer,
               helpful: 'yes'
           }
           :
               answer
        });
        this.setState({answers: newAnswers});
    };

    onClickNotHelpful = (e,currentAnswer) => {
        e.preventDefault();
        const {answers} = this.state;
        const newAnswers = answers.map(answer => {
            return answer.id ===  currentAnswer.id ? {
                    id:answer.id,
                    answer: currentAnswer.answer,
                    helpful: 'no'
                }
                :
                answer
        });
        this.setState({answers: newAnswers});
    };

    updateWindowsDimension = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    componentDidMount() {
        this.updateWindowsDimension();
        window.addEventListener('resize',this.updateWindowsDimension);
    }

    onSubmit = (editorContent) => {
        const divElement = <div dangerouslySetInnerHTML={{__html:
            editorContent}}>
        </div>;
        this.setState({
            answers: [...this.state.answers,
                {id: this.state.answers.length,answer: divElement, helpful: 'none',author:localStorage.getItem('user')}
            ],
            answer: !this.state.answer
        });
    };

    render() {
        return (
            <div className={'mt-2'} style={{minHeight: this.state.height-57,width:'1000'}}>
                {
                    !this.state.loading ?
                    <Card>
                        <div className={'mx-4 mt-2 border-bottom'}>
                            <div className={'row'}>
                                <b className={'col-11'}>
                                    <h4>
                                        {this.state.query.question}
                                    </h4>
                                </b>
                            </div>
                            <div className={'row mb-1'}>
                                <div className={'col-6'}>
                                    <Button
                                        className={'border-0 mb-2'}
                                        color={'dark'}
                                        size={'sm'}
                                        onMouseDown={(e) => {
                                            this.setState({
                                                answer: !this.state.answer
                                            });
                                            e.preventDefault();
                                        }}
                                    >
                                        <AiFillEdit size={'20px'}/>
                                        {' Answer'}
                                    </Button>
                                    <Button
                                        className={'border-0 ml-2 mb-2'}
                                        color={'dark'}
                                        size={'sm'}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        <FaStar size={'20px'}/>
                                        {' Save'}
                                    </Button>
                                </div>
                                <div className={'col-6'}>
                                    <div className={'text-right'}>
                                        <Button
                                            className={'border-0 mb-1'}
                                            color={'white'}
                                            title={'Comment'}
                                            onMouseDown={(e) => {
                                                console.log('mouse down!');
                                                e.preventDefault();
                                            }}
                                        >
                                            <FaComment/>
                                        </Button>
                                        <Button
                                            className={'border-0 mb-1'}
                                            color={'white'}
                                            title={'Report this question'}
                                            onMouseDown={(e) => {
                                                console.log('mouse down!');
                                                e.preventDefault();
                                            }}
                                        >
                                            <AiOutlineStop/>
                                        </Button>
                                        <Button
                                            className={'border-0 mb-1'}
                                            color={'white'}
                                            onMouseDown={(e) => {
                                                console.log('mouse down!');
                                                e.preventDefault();
                                            }}
                                            title={'Share on Facebook'}
                                        >
                                            <FaFacebookF/>
                                        </Button>
                                        <Button
                                            className={'border-0 mb-1'}
                                            color={'white'}
                                            title={'Share on Twitter'}
                                            onMouseDown={(e) => {
                                                console.log('mouse down!');
                                                e.preventDefault();
                                            }}
                                        >
                                            <FaTwitter/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.answer
                                ? <AnswerBox
                                        onSubmit={this.onSubmit}
                                />
                                : <div>
                                    <br/>
                                </div>
                        }
                        {
                            this.state.answers.map(answer =>
                            <AnswerCard
                                key={answer._id}
                                answer={answer}
                                onClickHelpful={this.onClickHelpful}
                                onClickNotHelpful={this.onClickNotHelpful}
                            />)
                        }
                    </Card>
                    :
                    <img src={'/loading.gif'} alt={'Loading..'} style={{position:'absolute',top:'50%',left:'50%'}}/>
                }
            </div>
        )
    }
}