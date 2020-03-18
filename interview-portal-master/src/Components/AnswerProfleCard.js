import React from "react";
import {Media} from 'reactstrap';

export default function AnswerProfileCard(props) {
    return(
        <Media>
            <Media left top href={'#'}>
                <div className={'px-4 py-2 m-1'}>
                    <Media
                        object
                        src={props.src}
                        alt={'profile-picture'}
                        style={{width:'64px',height:'64px'}}
                        className={'border border-dark'}
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