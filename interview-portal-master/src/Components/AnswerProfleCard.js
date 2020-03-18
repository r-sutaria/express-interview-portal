import React from "react";
import {Media} from 'reactstrap';

export default function AnswerProfileCard(props) {
    return(
        <Media>
            <Media left top href={'#'}>
                <div className={'m-1 ml-2 border border-dark'} style={{padding:0.1}}>
                    <Media
                        object
                        src={props.src}
                        alt={'profile-picture'}
                        style={{width:'64px',height:'64px'}}
                    />
                </div>
            </Media>
            <Media body className={'m-2'}>
                <Media heading>
                    {props.name}
                </Media>
                {props.description}
            </Media>
        </Media>
    )
}