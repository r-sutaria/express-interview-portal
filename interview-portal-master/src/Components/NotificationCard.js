import React from "react";
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
export default function NotificationCard() {
    return(
        <div style={{backgroundColor:'#e3e4e6',minHeight:100,width:'98%'}} className={'border-dark rounded p-3 m-3'}>
            <h4>
                Regarding your submission:{' '}
                <Link to={'/experiences/123456'} className={'text-info'}>
                    Amazon Experience for Software Development Engineer
                </Link>
            </h4>
            <div className={'mt-2'}>
                <b>
                    Message from {' '}
                    <Link to={'/usr/moderator1'} className={'text-secondary'}>
                        moderator1
                    </Link>
                </b>
                 <br/>
                 sent 30 minutes ago
                <h6 className={'mt-4'}>
                    <p>
                        Your submission{' '}
                        <Link to={'/experiences/123456'} className={'text-info'}>
                            Amazon Experience for Software Development Engineer
                        </Link>
                        {' '}has been rejected for the use of obscene language in your experiences. Kindly update your submission.
                        It should also be noted that frequent use of obscene language in submissions can
                        lead to temporary or permanent ban from the website.
                        I suggest you to go through the submission guidelines to get an idea about the way the submissions should be posted.
                    </p>
                </h6>
                <div>
                    <Button color={'link'} className={'text-dark'} size={'sm'}>
                        <h6>Delete</h6>
                    </Button>
                    <Button color={'link'} className={'text-dark'} size={'sm'}>
                        <h6>Reply</h6>
                    </Button>
                </div>
            </div>
        </div>
    );
}