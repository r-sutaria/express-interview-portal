import React from "react";
import {Switch,Route} from 'react-router';
import ExperienceForm from "./interview-form";
import ExperienceList from "./ExperienceComponent";
import BlogList from "./BlogsList";
import CodeEditor from "./CodeEditor";
import PlacementReport from "./PlacementReport";
import ExperiencePage from "./ExperiencePage";
import QueryPageComponent from "./QueryPageComponent";
import NotificationComponent from "./NotificationComponent";
import SearchPage from "./SearchPage";
import SavedPage from "./SavedPage";
import PracticePage from "./PracticePage";
import LoginPage from "./LoginPage";
import ReviewPage from "./ReviewPage";
import UserPage from "./UserPage";
import Prepare from "./Prepare";
export default function Main(props) {
    // console.log(props.user);
    return(
    <Switch>
        <Route exact path={'/'} component={() => <ExperienceForm user={props.user}/>} />
        <Route exact path={'/practice/:id'} component={CodeEditor} />
        <Route exact path={'/practiceQuestions/:pg'} component={PracticePage} />
        <Route exact path={'/prepare/:company'} component={Prepare} />
        <Route exact path={'/queries'} component={QueryPageComponent}/>
        <Route exact path={'/experiences'} component={ExperienceList} />
        <Route exact path={'/experiences/:id'} component={ExperiencePage} />
        <Route exact path={'/queries/:id'} component={BlogList} />
        <Route exact path={'/notifications'} render={() => <NotificationComponent user={props.user}/>} />
        <Route path={'/search::term'} component={SearchPage} />
        <Route path={'/saved'} component={SavedPage} />
        <Route path={'/login'} component={LoginPage} />
        <Route path={'/review'} component={ReviewPage} />
        <Route exact path={'/interview-experience-form'} component={() => <ExperienceForm user={props.user}/>} />
        <Route exact path={'/usr/user1'} component={UserPage} />
        <Route exact path={'/placement'}
               component={
                   () => <PlacementReport
                       branchChartData={[170,120,30, 60, 40, 50, 10, 20]}
                       classChartData={[20,50,100,200]}
                       yearChartData={[120,160,180,200]}
                       branchLabels = {['Computer Engineering', 'Information Technology', 'Electronics & Communication', 'Electrical Engineering', 'Mechanical Engineering', 'Chemical Engineering', 'Civil Engineering', 'Integration & Circuits']}
                       classLabels = {['Class A', 'Class B', 'Class C', 'Class D']}
                       yearLabels = {['2016','2017','2018','2019']}
                       options= {{
                           responsive: true,
                           legend: {
                               labels: {
                                   display: false,
                                   fontColor: 'black',
                                   fontSize: 13,
                               }
                           }
                       }}
                   />
               }
        />
    </Switch>
    );
}



