import React from 'react';
import ExperienceCard from "./ExperienceCard";
import QueryCard from "./QueryCard";
export default class SavedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: {
                companyName: 'Amazon',
                author: 'Rutvik Sutaria',
                jobType: '6 month Internship + FTE',
                jobProfile: 'Software Development Engineer',
                n_rounds: 3,
                ctc: '28 Lakhs',
                stipend: '60k',
                receivedOffer: true,
                date: '04/02/2020',
                saved: false,
                helpful: 56,
                accepted: 'yes'
            }
        }
    }

    onSaveClick = (e) => {
        e.preventDefault();
        this.setState({
            saved: !this.state.saved
        });
    };

    render() {
        return(
            <div>
                <ExperienceCard experience={this.state.experience} link={'/experience2'} accepted={false} onSaveClick={this.onSaveClick} />
                <QueryCard />
            </div>
        );
    }

}