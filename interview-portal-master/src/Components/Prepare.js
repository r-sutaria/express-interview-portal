import React from 'react';
import Chart from "chart.js";
import PracticeList from "./PracticeList";

export default class Prepare extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    borderColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    borderWidth: 1
                }]
            },
            // options: {
            //     scales: {
            //         yAxes: [{
            //             ticks: {
            //                 beginAtZero: true
            //             }
            //         }]
            //     }
            // }
        });
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h3 align={'center'} className={'border-bottom p-2'}>
                   Amazon Interview  Preparation
                </h3>
                <div>
                    <div className={'float-left '} style={{width:'50%'}}>
                        <h5 align={'center'} className={'mb-3'}> Topics To prepare based on your coding history </h5>
                        <div className={'p-2 rounded mb-2'} style={{backgroundColor:'#e3e4e6'}}>
                            Dynamic Programming
                        </div>
                        <div className={'p-2 rounded mb-2'} style={{backgroundColor:'#e3e4e6'}}>
                            Binary Search
                        </div>
                        <div className={'p-2 rounded mb-2'} style={{backgroundColor:'#e3e4e6'}}>
                            Union And Find
                        </div>
                        <div className={'p-2 rounded mb-2'} style={{backgroundColor:'#e3e4e6'}}>
                            Binary Tree
                        </div>
                        <div className={'p-2 rounded mb-2'} style={{backgroundColor:'#e3e4e6'}}>
                            Linked List
                        </div>
                        <div className={'p-2 rounded mb-2'} style={{backgroundColor:'#e3e4e6'}}>
                            Queue
                        </div>
                    </div>
                    <div className={'float-left'} style={{width:'50%'}}>
                        <h5 align={'center'}>
                            Major Topics To Prepare For  {this.props.match.params.company}
                        </h5>
                        <canvas id={'myChart'} style={{position: 'relative', height:'50vh', width:'100%'}} />
                    </div>
                </div>
                <div className={'mt-3'}>
                    <h4 align={'center'}>Recommended Problems</h4>

                    <PracticeList/>
                    <PracticeList/>
                </div>
            </div>
        );
    }

}
