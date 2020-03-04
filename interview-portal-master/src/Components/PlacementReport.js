import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {Input} from 'reactstrap';
export default class PlacementReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {
                responsive: true,
                legend: {
                    labels: {
                        fontStyle: 'none',
                        fontColor: 'black',
                        maintainAspectRatio: true
                    }
                }
            },
            chartType: 'branch',
        }
    }

    componentDidMount() {
        console.log(this.branchChartData);
    }

    renderPieChart = (data,label) => {
        return(
            <Pie
                type={'pie'}
                data={this.renderChart(data, label)}
                options={this.props.options}
                width={200}
                height={50}
            />
        )
    };

    renderLineChart = (data,label) =>
        <Line
            type={'line'}
            data={this.renderChart(data, label)}
            options={this.props.options}
            width={200}
            height={50}
        />
    ;

    renderChart = (data,labels) => {
        return {
            labels: labels,
            datasets: [{
                label: '# of Students Placed',
                data: data,
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(180, 159, 64, 1)',
                    'rgba(230, 102, 255, 1)',
                    'rgba(20, 102, 255, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        };
    };

    render() {
        const { branchChartData,classChartData,yearChartData,branchLabels,classLabels,yearLabels } = this.props;
        return (
            <div
                className="container"
            >
                <h3 className={'text-center'}>
                    College Placement Cell
                </h3>
                <br/>
                <p>
                    Nirma University provides full placement support to its students in the fields of Technology,
                    Management, Law, Pharmacy and Life Sciences.
                </p>
                <p>
                    Over the last decades, the University has emerged as one of the most favoured destinations for hiring fresh talent from the campuses.
                    Its endeavours to provide industry compliant talent and emphasises on quality, discipline, self-learning, and ethics.
                </p>
                <p>
                    The placement model at Nirma is a four-stage process,
                    involving the Pre Placement activities, Career Guidance, Executing Placement and Post Placement reviews.
                </p>
                <p>
                    In addition to providing placement support to the students,
                    the University also facilitates training of students in the organisations during summer and winter vacations,
                    project work for the students in the final year, continuous institute-industry interactions,
                    alumni activities, participation in exhibitions, fairs, seminars and conferences,
                    counselling of the students on job opportunities, facilitating industry visits and inviting distinguished speakers.
                </p>
                <div>
                    <h3 className={'text-center'}>
                        Placement Statistics
                    </h3>
                    <h6>
                        Yearly Placement Graph
                    </h6>
                    {this.renderLineChart(yearChartData,yearLabels)}
                    <h6>
                        Placement Pie-chart
                    </h6>
                    <Input
                        name={'select'}
                        type={'select'}
                        id={'statistics-type'}
                        onChange = {(e) => {
                            this.setState({
                                chartType: e.target.value
                            });
                            console.log(this.branchChartData);
                            e.preventDefault();
                        }}
                    >
                        <option value={'branch'}>Branch Wise</option>
                        <option value={'class'}>Class Wise</option>
                    </Input>
                    {this.state.chartType === 'branch' ? this.renderPieChart(branchChartData,branchLabels):<div></div>}
                    {this.state.chartType === 'class' ? this.renderPieChart(classChartData,classLabels):<div></div>}
                </div>
            </div>
        );
    }
}
