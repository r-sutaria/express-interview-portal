import React from 'react';
import PracticeCard from "./PracticeCard";
import {Row,Col} from 'reactstrap'
export default class PracticePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problems: [
                {
                    id:'1',
                    title:'Breaking the record',
                    difficulty:'medium',
                    successRate:100,
                    saved:false
                },
                {
                    id:'2',
                    title:'Breaking the record',
                    difficulty:'medium',
                    successRate:100,
                    saved:true
                }
            ]
        }
    }

    render() {
        return (
            <div>
                {this.state.problems.map(problem => {
                    const onSaveClick = (e) => {
                        const problems = this.state.problems.map((p) => {
                            let p1 = p;
                            p1.saved = p1.id === problem.id ? !p1.saved : p1.saved;
                            return p1;
                        });
                        this.setState({ problems });
                        e.preventDefault();
                    };
                    return <PracticeCard
                        title={problem.title}
                        difficulty={problem.difficulty}
                        successRate={problem.successRate}
                        saved={problem.saved}
                        onSaveClick={onSaveClick}
                    />
                })}
            </div>
        );
    }

}