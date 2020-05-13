import React from 'react';
import Chart from "chart.js";
import PracticeList from "./PracticeList";
import PracticeCard from "./PracticeCard";

export default class Prepare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problems:{},
            practiceList:[],
            loaded:false,
            topics:[],
            practiceIds:[],
        };
        const user = localStorage.getItem('user');
        this.getSuggestions(user);
        // console.log(user);
    }

     randomIntFromInterval = (min, max) =>  { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    getSuggestions(user) {
        fetch('/getSuggestions/'+user)
            .then(res=>res.json())
            .then(res=>{
                let topics = [],practiceList = [];
                for(let key in res) {
                    topics.push(key);
                    practiceList.push(res[key][this.randomIntFromInterval(0,res[key].length-1)]);
                }

                this.getProblemId(practiceList,res,true,topics);
            })
            .catch(err=>console.log(err));
    }

    getProblemId = (practiceList,problems,loaded,topics) => {
        let practiceIds = [];
        for (let item in practiceList) {
            fetch('/getProblemId',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    "link":practiceList[item]
                })
            })
                .then( response => response.json())
                .then((response) => {
                practiceIds.push(response.problem);
            })
                .catch( error => console.log(error));
        }
        this.setState({
            practiceIds,
            problems,
            loaded,
            topics
        });
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.loaded){
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
        console.log("Test: "+this.state.practiceIds);
    }

    render() {
        // console.log(this.props);
        return (
            <div>
                {this.state.loaded?
                    <div>
                        <h3 align={'center'} className={'border-bottom p-2'}>
                            Amazon Interview  Preparation
                        </h3>
                        <div>
                            <div className={'float-left '} style={{width:'50%'}}>
                                <h5 align={'center'} className={'mb-3'}> Topics To prepare based on your coding history </h5>
                                {
                                    this.state.topics.slice(0,7).map(key => {
                                        return(
                                            <div className={'p-2 rounded mb-2'} style={{backgroundColor:'#e3e4e6'}}>
                                                {key}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={'float-left'} style={{width:'50%'}}>
                                <h5 align={'center'}>
                                    Major Topics To Prepare For  {this.props.match.params.company}
                                </h5>
                                <canvas id={'myChart'} style={{position: 'relative', height:'55vh', width:'100%'}} />
                            </div>
                        </div>
                        <div className={'float-left'}>
                            <h4 align={'center'}>Recommended Problems</h4>
                            <PracticeList problems={this.state.practiceIds}/>
                        </div>
                    </div>
                    :
                    <img src={'/loading.gif'} alt={'Loading..'} style={{position:'absolute',top:'50%',left:'50%'}}/>
                    }
            </div>
        );
    }

}
