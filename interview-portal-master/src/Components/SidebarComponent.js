import React from 'react';
import {
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    Navbar,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown, Modal, ModalHeader, ModalBody, ModalFooter, Button
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
            username:'',
            password:''
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

    onChangeUsernameLogin = (event) => {
        this.setState({
            username: event.target.value
        });
        event.preventDefault();
    };

    onChangePasswordLogin = (event) => {
        this.setState({
            password: event.target.value
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
        console.log(this.props);
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
                                        onChangeUsernameLogin={this.onChangeUsernameLogin}
                                        onChangePasswordLogin={this.onChangePasswordLogin}
                                        username={this.state.username}
                                        passsword={this.state.password}
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
                                        onClick={(event) =>
                                            this.props.onClickLogin(event, this.state.username, this.state.password)
                                        }
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
                                    <SignUpForm/>
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