import React from 'react';
import Chart from 'chart.js';
import PracticeList from "./PracticeList";
import {Link} from 'react-router-dom';
import PracticeCard from "./PracticeCard";
export default class PracticePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myChart: null,
            problems:[],
            loaded:false
        };
        this.getQuestion();
    }

    getQuestion = () => {
        const page = this.props.match.params.pg;
        console.log(page);
        fetch('/getQuestions/'+page)
            .then(res => res.json())
            .then(res => {
                let problems = res;
                this.setState({problems,loaded:true});
                console.log(problems);
            })
            .catch(err => {
                console.log(err);
            });
    };

    componentDidMount() {
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: 'red',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    render() {
        return (
            <div>
                <div className={'float-left border-right border-dark'} style={{width:'50%',minHeight:'100%',marginTop:'-7px'}}>
                    <PracticeList problems={this.state.problems}/>
                </div>
                <div className={'float-left'} style={{width:'50%'}}>
                    <div className="chart-container" style={{position: 'relative', height:'25vh', width:'100%'}}>
                        <canvas id="myChart" className={'border-bottom border-dark'}/>
                        <div>
                            <div align={'center'}>
                                <h5 style={{justifyContent:'center'}}>Coding Preparation for Companies</h5>
                            </div>
                            <div className={'ml-2'}>
                                <div style={{width:'97%',backgroundColor:'#e3e4e6'}} className={'m-1 mb-2 p-2 border rounded border-dark'}>
                                    <Link to={'/prepare/amazon'}>Amazon</Link>
                                    <div>
                                        Topics to prepare for Amazon: DP, Binary Search, Linked List
                                    </div>
                                </div>
                                <div style={{width:'97%',backgroundColor:'#e3e4e6'}} className={'m-1 mb-2 p-2 border rounded border-dark'}>
                                    <Link to={'/prepare/amazon'}>Microsoft</Link>
                                    <div>
                                        Topics to prepare for Microsoft: DP, Binary Search, Linked List
                                    </div>
                                </div>
                                <div style={{width:'97%',backgroundColor:'#e3e4e6'}} className={'m-1 mb-2 p-2 border rounded border-dark'}>
                                    <Link to={'/prepare/amazon'}>Samsung</Link>
                                    <div>
                                        Topics to prepare for Samsung: DP, Binary Search, Linked List
                                    </div>
                                </div>
                                <div style={{width:'97%',backgroundColor:'#e3e4e6'}} className={'m-1 mb-2 p-2 border rounded border-dark'}>
                                    <Link to={'/prepare/amazon'}>Google</Link>
                                    <div>
                                        Topics to prepare for Google: DP, Binary Search, Linked List
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}