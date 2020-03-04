import React from "react";
import AnswerBox from "./AnswerBox";
import {Card,Button,ButtonDropdown,DropdownToggle,DropdownItem,DropdownMenu,Row,Col} from "reactstrap";
import {FaComment,FaEllipsisH,FaFacebookF,FaTwitter,AiFillEdit,FaStar,MdReport,AiOutlineStop} from "react-icons/all";
import {Editor,EditorState,convertToRaw,convertFromRaw,CompositeDecorator} from 'draft-js';
import CodeEditor from "./CodeEditor";
import '../Images/pikachu.jpg';
import AnswerCard from "./AnswerCard";
import {Link} from "react-router-dom";
import {edit} from "ace-builds";


export default class BlogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOptionsOpen: false,
            answer: false,
            answers: [
                {
                    id: 0,
                    answer:
                        <div>
                            I attended Amazon interview recently. You need to be good at basics of data structures,
                            algorithms and object oriented design.
                            One cannot read object oriented concepts and become a master in it.
                            Try implementing it in whatever the project you're doing.
                            That way it's easy to gain the intuition about the object oriented programming and design.
                            I prepared for data structure questions from cracking the coding interview.
                            You need to understand the basics of the important data structures and
                            how they work and try implementing the basic version of those.
                            This will help in understanding its applications and apply those data structures to solve the questions
                            asked by the interviewer in the minimum complexity. I have noticed that they are not satisfied with our solutions
                            if it is not with minimum space and time complexity.
                        </div>,
                    helpful: 'none'
                }
            ],
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    onClickHelpful = (e,currentAnswer) => {
        e.preventDefault();
        const {answers} = this.state;
        console.log(currentAnswer);
        const newAnswers = answers.map(answer => {
           return answer.id ===  currentAnswer.id ? {
               id:answer.id,
               answer: currentAnswer.answer,
               helpful: 'yes'
           }
           :
               answer
        });
        console.log(newAnswers);
        this.setState({answers: newAnswers});
    };

    onClickNotHelpful = (e,currentAnswer) => {
        e.preventDefault();
        const {answers} = this.state;
        console.log(currentAnswer);
        const newAnswers = answers.map(answer => {
            return answer.id ===  currentAnswer.id ? {
                    id:answer.id,
                    answer: currentAnswer.answer,
                    helpful: 'no'
                }
                :
                answer
        });
        console.log(newAnswers);
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
                {id: this.state.answers.length,answer: divElement, helpful: 'none'}
            ],
            answer: !this.state.answer
        });
    };

    render() {
        return (
            <div className={'mt-2'} style={{minHeight: this.state.height-57,width:'1000'}}>
                <Card>
                    <div className={'mx-4 mt-2 border-bottom'}>
                        <div className={'row'}>
                            <b className={'col-11'}>
                                <h4>
                                    What are some tips to crack the Amazon interview?
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
                            answer={answer}
                            onClickHelpful={this.onClickHelpful}
                            onClickNotHelpful={this.onClickNotHelpful}
                        />)
                    }
                </Card>
            </div>
        )
    }
}