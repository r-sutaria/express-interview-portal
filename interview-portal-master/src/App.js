import React from 'react';
import './App.css';
import ExperienceForm from "./Components/interview-form";
import NavbarComponent from "./Components/NavbarComponent";
import ExperienceList from "./Components/ExperienceComponent";
import BlogList from "./Components/BlogsList";
import Sidebar from "./Components/SidebarComponent";
import CodeEditor from "./Components/CodeEditor";
import PlacementReport from "./Components/PlacementReport";
import Main from './Components/Main';
import MyEditor from "./Components/MyEditor";
import {NavbarToggler,Collapse,Navbar,Row,Col} from 'reactstrap';
export default class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: <CodeEditor />,
            user: null,
            users: {
                'user1' : 'password',
                'user2' : 'password1'
            },
            isSidebarOpen: true,
            navbarHeight: 0
        }
    }

    onClickExperience = (event) => {
        this.setState({
            currentPage: <ExperienceList />
        });
        event.preventDefault();
    };

    onClickBlogs = (event) => {
        this.setState({
            currentPage: <BlogList/>
        });
        event.preventDefault();
    };

    onClickLogo = (event) => {
        this.setState({
            currentPage: <ExperienceForm />
        });
        event.preventDefault();
    };

    onClickLogin = (event,username,password) => {
        const users = this.state.users;
        if(users[username] !== undefined) {
            if(password === users[username]) {
                this.setState({
                    user: username
                })
            }
        }
    };

    onClickLogOut = (event) => {
        this.setState({
            user: null
        });
        event.preventDefault();
    };


    onCLickPractice = (event) => {
        this.setState({
            currentPage: <CodeEditor />
        });
        event.preventDefault();
    };

    onSidebarToggleClick = (e) => {
        this.setState({
              isSidebarOpen: !this.state.isSidebarOpen
        });
        e.preventDefault();
    };

    updateNavbarHeight = () => {
        const height = document.getElementById('top-navbar').offsetHeight;
        this.setState({
            navbarHeight: height
        })
    };

    componentDidMount() {
        this.updateNavbarHeight();
        window.addEventListener('resize',this.updateNavbarHeight);
    }

    render() {
        return(
            // <div className={'bg-light'}>
            //     <NavbarComponent
            //         onClickExperience={this.onClickExperience}
            //         onClickBlogs = {this.onClickBlogs}
            //         onClickLogo = {this.onClickLogo}
            //
            //         onCLickPractice = {this.onCLickPractice}
            //         user = {this.state.user}
            //     />
            //     <div style={{marginTop:57,minWidth:100}}>
            //             <Sidebar/>
            //         <div className={'container'} style={{float:'left',marginLeft:200}}>
            //             <Main/>
            //         </div>
            //     </div>
            // </div>
            <div>
                <NavbarComponent onSidebarToggleClick = {this.onSidebarToggleClick}/>
                {
                    this.state.isSidebarOpen
                    ? <div style={{marginTop:this.state.navbarHeight}}>
                            <div>
                                <Collapse isOpen={this.state.isSidebarOpen} navbar>
                                    <Sidebar user={this.state.user} onClickLogin = {this.onClickLogin} onClickLogOut = {this.onClickLogOut}/>
                                </Collapse>
                            </div>
                            <div style={ {marginLeft:200}} className={'pt-2 pl-3'}>
                                <Main />
                            </div>
                        </div>
                    :
                        <div className={'container pt-2'} style={{marginTop:this.state.navbarHeight}}>
                            <Main />
                        </div>
                }
            </div>

        );
    }
}