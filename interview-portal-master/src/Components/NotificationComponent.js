import React from "react";
import NotificationCard from "./NotificationCard";
export default class NotificationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages:[],
            loading: true
        };
        this.getNotifications();
    }

    getNotifications = () => {
        fetch('/getNotifications',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "user":this.props.user
            })
        }).then( res => res.json() )
            .then((response) => {
            const messages = response;
            console.log(messages);
            if(this.state.loading) this.setState({messages,loading:false});
        }).catch( error => console.log(error.message));
    };

    render() {
        return(
            <div>
                {/*<NotificationCard />*/}
                {/*<NotificationCard />*/}
                {/*<NotificationCard />*/}
                {/*<NotificationCard />*/}
                {/*<NotificationCard />*/}
                {this.state.loading? <img src={'/loading.gif'} alt={'Loading..'} style={{position:'absolute',top:'50%',left:'50%'}}/>:
                    this.state.messages.map(message => <NotificationCard key={message.E_id} message={message.message} date={message.date} e_id={message.E_id} sender={message.sender}/>)}
            </div>
        );
    }

}