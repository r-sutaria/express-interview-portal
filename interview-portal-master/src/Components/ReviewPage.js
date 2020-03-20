import React from 'react';
import ExperienceCard from "./ExperienceCard";
export default class ReviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            experiences: []
        }
        this.getReviewExperiences();
    }

    getReviewExperiences = () => {
        fetch('/experiences')
            .then(res => res.json())
            .then(res => {
                let experiences = res;
                this.setState({experiences});
                console.log(experiences);
            })
            .catch(err => {
                console.log(err);
            });
    }

    onSaveClick = (e) => {
        e.preventDefault();
        this.setState({
            saved: !this.state.saved
        });
    };

    render() {
        return (
            <div>
                {
                    this.state.experiences.map(experience => {
                            return(experience.accepted === null ? <ExperienceCard experience={experience} onSaveClick={this.onSaveClick}/>
                                    : <div />
                            )
                        }
                    )
                }
            </div>
        );
    }

}