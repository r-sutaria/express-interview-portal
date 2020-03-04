import React from 'react';
import {Editor} from "draft-js";
import {FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown} from "react-icons/all";
import AnswerProfileCard from "./AnswerProfleCard";
import {Button} from "reactstrap";

export default function AnswerCard(props){
    const ans = props.answer;
    // console.log(ans);
    return(
        <div className={'m-2 mr-5 border-bottom'}>
            <AnswerProfileCard
                src={'/pikachu.jpg'}
                name={'Rutvik Sutaria'}
                description={'8th semester CSE student'}
            />
            <div className={'m-3'}>
                {/*<Editor editorState={ans.answer} readOnly={true}/>*/}
                <div>
                    {ans.answer}
                </div>
                <div className={'mt-2 pt-2 border-top'}>
                    {
                        ans.helpful !== 'none' ? <span>
                            <span className={'text-success'}>
                                <FaThumbsUp/>
                            </span>
                                56 people found this helpful
                        </span> : <div/>
                    }
                    <h6>
                        Was this answer helpful?{' '}
                        <Button size={'sm'} color={'white'} className={'mb-1 text-success'}
                                onMouseDown={(e) => {
                                    props.onClickHelpful(e,ans);
                                }}
                        >
                            {ans.helpful === 'yes' ? <FaThumbsUp/> : <FaRegThumbsUp/>}
                        </Button>
                        <Button size={'sm'} color={'white'} className={'mb-1 text-danger'}
                                onMouseDown={(e) => {
                                    props.onClickNotHelpful(e,ans);
                                }}
                        >
                            {ans.helpful === 'no' ? <FaThumbsDown/> : <FaRegThumbsDown/>}
                        </Button>
                    </h6>
                </div>
            </div>
        </div>
    )
}