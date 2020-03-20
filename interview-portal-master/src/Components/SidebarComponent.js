import React from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {FiLogOut,AiFillNotification,FaBookmark,AiFillEdit,FaQuestionCircle,MdHistory,AiOutlineCode,IoMdStats,FiLogIn,FaUserCircle,MdRateReview} from 'react-icons/all';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            loginOpen: false,
            signUpOpen: false,
            email:'',
            username:'',
            password:'',
            confirmPassword:'',
            name:'',
            emailUnique:true,
            usernameUnique:true,
            status: 200
        }
    }

    toggleLogin = () => {
        this.setState({
            loginOpen: !this.state.loginOpen,
            signUpOpen: false
        })
    };

    toggleSignUp = () => {
        this.setState({
            loginOpen: false,
            signUpOpen: !this.state.signUpOpen
        })
    };

    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
        fetch('/username',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "username":event.target.value
            })
        }).then( response => {
            // console.log(response);
            return response.json()
        }).then((response) => {
            // console.log(this.state.username);
            this.setState({usernameUnique: response.length === 0});
            console.log(response);
            if(response.status === 500) {
                console.log("Error while connecting to database please check your internet connection");
            }
        }).catch( error => console.log(error.message));
        event.preventDefault();
    };

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
        event.preventDefault();
    };

    onChangeConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value
        });
        event.preventDefault();
    };
    onChangeEmail = (event) => {
        this.setState({
            email:event.target.value
        });
        fetch('/email',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "email":event.target.value
            })
        }).then( response => {
            // console.log(response);
            return response.json()
        }).then((response) => {
            this.setState({emailUnique: response.length === 0});
            console.log(response);
            if(response.status === 500) {
                console.log("Error while connecting to database please check your internet connection");
            }
        }).catch( error => console.log(error.message));
        event.preventDefault();
    };

    onChangeName = (event) => {
        this.setState({
            name:event.target.value
        });
        event.preventDefault();
    };

    updateWindowsDimension = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    componentDidMount() {
        this.updateWindowsDimension();
        window.addEventListener('resize',this.updateWindowsDimension);
    }

    render() {
        // console.log(this.props);
        return(
            <nav className={'sidebar border-dark border-right'} style={{backgroundColor: '#c1c1c1',minHeight:this.state.height-57,width: '13%',minWidth:200,position: 'fixed',float:'left'}}>
                <div>
                    <ul className="nav flex-column">
                        {
                            this.props.user ?
                                <li className="nav-item">
                                    <Link to={'/usr/user1'} className={'nav-link active text-dark'}>
                                        <b>
                                            <span className={'mb-1 col-form-label'}>
                                                <FaUserCircle size={20}/>
                                            </span>
                                            {' '+this.props.user}
                                        </b>
                                    </Link>
                                </li>
                                :
                                <li></li>
                        }
                        {
                            this.props.user ?
                            <li className="nav-item">
                                <Link to={'/notifications'} className={'nav-link active text-dark'}>
                                    <b>
                                        <span className={'mb-1 col-form-label'}>
                                            <AiFillNotification size={20}/>
                                        </span>
                                        {' '}Notifications
                                    </b>
                                </Link>
                            </li>
                                :
                                <li></li>
                        }
                        {
                            this.props.user ?
                            <li className="nav-item">
                                <Link to={'/saved'} className={'nav-link active text-dark'}>
                                    <b>
                                        <span className={'mb-1 col-form-label'}>
                                            <FaBookmark size={20}/>
                                        </span>
                                        {' '}Saved
                                    </b>
                                </Link>
                            </li>
                                :
                                <li></li>
                        }
                        {
                            this.props.user ?
                                <li className="nav-item">
                                    <Link to={'/review'} className={'nav-link active text-dark'}>
                                        <b>
                                        <span className={'mb-1 col-form-label'}>
                                            <MdRateReview size={20}/>
                                        </span>
                                            {' '}Review
                                        </b>
                                    </Link>
                                </li>
                                :
                                <li></li>
                        }
                        <li className="nav-item">
                            <Link to={'/queries'} className={'nav-link active text-dark'}>
                                <b>
                                    <span className={'mb-1 col-form-label'}>
                                        <FaQuestionCircle size={20}/>
                                    </span>
                                    {' '}Queries
                                </b>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/experiences'} className={'nav-link active text-dark'}>
                                <b>
                                    <span className={'mb-1 col-form-label'}>
                                        <AiFillEdit size={20}/>
                                    </span>
                                    {' '}Experiences
                                </b>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/practice'} className={'nav-link active text-dark'}>
                                <b>
                                    <span className={'mb-1 col-form-label'}>
                                        <AiOutlineCode size={20}/>
                                    </span>
                                    {' '} Practice
                                </b>
                            </Link>
                        </li>
                        <li className={'nav-item'}>
                            <Link
                                className={'nav-link active text-dark'}
                                to={'/placement'}
                            >
                                <b>
                                    <span className={'mb-1 col-form-label'}>
                                        <IoMdStats size={20}/>
                                    </span>
                                    {' '}
                                    Placements
                                </b>
                            </Link>
                        </li>
                        {
                            !this.props.user ? <li className={'nav-item'}>
                            <Button
                                color={'white'}
                                onMouseDown={(event) => {
                                    this.toggleLogin();
                                    event.preventDefault();
                                }}
                            >
                                <b>
                                    <span className={'mb-1 col-form-label'}>
                                        <FiLogIn size={20}/>
                                    </span>
                                    {' '}
                                    Login
                                </b>
                            </Button>
                            <Modal
                                isOpen={this.state.loginOpen}
                                toggle={this.toggleLogin}
                            >
                                <ModalHeader toggle={this.toggleLogin}>Login</ModalHeader>
                                <ModalBody>
                                    <LoginForm
                                        onChangeUsernameLogin={this.onChangeUsername}
                                        onChangePasswordLogin={this.onChangePassword}
                                        onChangeEmail={this.onChangeEmail}
                                        username={this.state.username}
                                        passsword={this.state.password}
                                        email={this.state.email}
                                        status={this.state.status}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color={'link text-dark'}
                                        style={{
                                            textDecoration: 'none'
                                        }}
                                        onClick={(event) => {
                                            this.toggleSignUp();
                                            event.preventDefault();
                                        }}
                                    >
                                        <b>Not a member? Sign Up</b>
                                    </Button>
                                    <Button
                                        color={'success'}
                                        onClick={(event) => {
                                            const status = this.props.onClickLogin(event,this.state.email,this.state.username,this.state.password);
                                            this.setState({status});
                                        }}
                                    >
                                        Login
                                    </Button>
                                </ModalFooter>
                            </Modal>
                            <Modal
                                isOpen={this.state.signUpOpen}
                                toggle={this.toggleSignUp}
                            >
                                <ModalHeader toggle={this.toggleSignUp}>Sign Up</ModalHeader>
                                <ModalBody>
                                    <SignUpForm
                                        onChangeEmail={this.onChangeEmail}
                                        onChangeUsername={this.onChangeUsername}
                                        onChangeName={this.onChangeName}
                                        onChangePassword={this.onChangePassword}
                                        onChangeConfirmPassword={this.onChangeConfirmPassword}
                                        email={this.state.email}
                                        username={this.state.username}
                                        name={this.state.name}
                                        password={this.state.password}
                                        confirmPassword={this.state.confirmPassword}
                                        emailUnique={this.state.emailUnique}
                                        usernameUnique={this.state.usernameUnique}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color={'link text-dark'}
                                        style={{
                                            textDecoration: 'none'
                                        }}
                                        onClick={(event) => {
                                            this.toggleLogin();
                                            event.preventDefault();
                                        }}
                                    >
                                        <b>Already a member? Login</b>
                                    </Button>
                                    <Button
                                        color={'success'}
                                        onClick={
                                            (event) => {
                                                event.preventDefault();
                                                if(this.state.emailUnique && this.state.usernameUnique && this.state.password === this.state.confirmPassword && !this.state.username.includes(' ')) {
                                                    fetch('/registerUser', {
                                                        method: 'POST',
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                            _id: this.state.username,
                                                            email: this.state.email,
                                                            name: this.state.name,
                                                            password: this.state.password
                                                        })
                                                    }).then(response => {
                                                        // console.log(response);
                                                        return response.json()
                                                    }).then((response) => {
                                                        const experience = response[0];
                                                        this.setState({
                                                            experience,
                                                            loading: false,
                                                            show: experience.accepted !== false
                                                        });
                                                        console.log(experience);
                                                        if (response.status === 500) {
                                                            console.log("Error while connecting to database please check your internet connection");
                                                        }
                                                    }).catch(error => console.log(error.message));
                                                    this.props.onClickLogin(event,this.state.email,this.state.username,this.state.password);
                                                }
                                            }
                                        }
                                    >
                                        Sign Up
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </li>
                            :
                            <li className={'nav-item'}>
                                <Button
                                    color={'white'}
                                    onMouseDown={(event) => {
                                        this.setState({
                                            loginOpen: false,
                                            signUpOpen: false
                                        });
                                        this.props.onClickLogOut(event);
                                    }}
                                >
                                    <b>
                                    <span className={'mb-1 col-form-label'}>
                                        <FiLogOut size={20}/>
                                    </span>
                                        {' '}
                                        Log Out
                                    </b>
                                </Button>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        )
    }
};