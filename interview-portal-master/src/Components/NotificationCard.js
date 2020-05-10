import React from "react";
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
export default class NotificationCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            experience: null,
            loaded:false
        };
        this.getExperiences();
    }
    getExperiences = () => {
        const uri='/getExperience';
        fetch(uri,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "id":this.props.e_id
            })
        }).then( response => {
            // console.log(response);
            return response.json()
        }).then((response) => {
            const experience = response[0];
            this.setState({experience,loaded:true});
            if(response.status === 500) {
                console.log("Error while connecting to database please check your internet connection");
            }
        }).catch( error => console.log(error.message));
    };


    render() {
        const {experience} = this.state;
        return(
            <div style={{backgroundColor:'#e3e4e6',minHeight:100,width:'98%'}} className={'border-dark rounded p-3 m-3'}>
                {!this.state.loaded ? <div/> :
                    <div>
                        <h4>
                            Regarding your submission:{' '}
                            <Link to={'/experiences/'+this.props.e_id} className={'text-info'}>
                                {experience.company} Experience for {experience.jobprofile}
                            </Link>
                        </h4>
                        <div className={'mt-2'}>
                            <b>
                                Message from {' '}
                                <Link to={'/usr/'+this.props.sender} className={'text-secondary'}>
                                    {this.props.sender}
                                </Link>
                            </b>
                            <br/>
                            sent at {this.props.date}
                            <h6 className={'mt-4'}>
                                <p>
                                    {this.props.message}
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
                }
            </div>
        );
    }

}