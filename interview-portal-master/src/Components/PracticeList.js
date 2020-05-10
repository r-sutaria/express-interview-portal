import React from 'react';
import PracticeCard from "./PracticeCard";
export default class PracticeList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'mr-3'}>
                {this.props.problems.map(problem => {
                    const onSaveClick = (e) => {
                        // const problems = this.state.problems.map((p) => {
                        //     let p1 = p;
                        //     p1.saved = p1.id === problem.id ? !p1.saved : p1.saved;
                        //     return p1;
                        // });
                        // this.setState({ problems });
                        e.preventDefault();
                    };
                    return <PracticeCard
                        key={problem._id}
                        title={problem.name}
                        id={problem._id}
                        difficulty={problem.difficulty}
                        successRate={problem.accuracy}
                        saved={problem.saved}
                        link={problem.link}
                        onSaveClick={onSaveClick}
                    />
                })}
            </div>
        );
    }

}