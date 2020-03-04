import React from "react";
import SidebarComponent from "./SidebarComponent";
import './NavbarComponent.css';
import {Link} from 'react-router-dom';
import {AiOutlineMenu} from "react-icons/all";
import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from "reactstrap";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import {FaSearch} from "react-icons/all";

export default class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isOpen: true,
            loginOpen: false,
            signUpOpen: false,
            username: '',
            password: '',
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

    render(){
        return(
            <div>
                <Navbar
                    color={"dark"}
                    expand={'md'}
                    dark
                    className={'border-dark border-bottom'}
                    fixed={'top'}
                    id={'top-navbar'}
                    // style={{width:762,display:'inline-block'}}
                >
                    <div className={'container-fluid'}>
                        <div className={'mr-4'}>
                            <NavbarBrand
                                className={'text-left'}
                                style={{minWidth:'20%'}}
                            >
                                <span className={'text-white mr-3'} onMouseDown={this.props.onSidebarToggleClick} style={{marginLeft:'-10px'}}>
                                    <AiOutlineMenu size={20}/>
                                </span>
                                <Link
                                    to={'/'}
                                    className={'text-white'}
                                    style={{textDecoration: 'none'}}
                                    onMouseDown = {(e) => e.preventDefault()}
                                >
                                    InterviewPortal
                                </Link>
                            </NavbarBrand>
                        </div>
                        {/*<div className="d-flex flex-grow-1 float-right">*/}
                        {/*</div>*/}
                        {/*<NavbarToggler onClick={(event)=>{*/}
                        {/*    this.setState({*/}
                        {/*        isOpen: !this.state.isOpen*/}
                        {/*    });*/}
                        {/*    event.preventDefault();*/}
                        {/*    }}*/}
                        {/*/>*/}
                        {/*<Collapse isOpen={this.state.isOpen} navbar>*/}
                            <Nav className={'mr-auto'} navbar={true}>
                            </Nav>
                            <Nav>
                                <NavItem>
                                    <Form className="mr-2 my-auto w-20 d-inline-block order-1">
                                        <InputGroup>
                                            <Input type="text"
                                                   placeholder="Search"
                                                   className={'float-right'}
                                            />
                                            <InputGroupAddon addonType={'append'}>
                                                <Button
                                                    className="btn-outline-dark border border-left-0"
                                                    type="button"
                                                    color={'light'}
                                                    onMouseDown={(e)=>{
                                                        e.preventDefault();
                                                    }}
                                                >
                                                    <FaSearch/>
                                                </Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Form>
                                </NavItem>
                            </Nav>
                            {/*<Nav>*/}
                                {/*{*/}
                                {/*    !this.props.user ?*/}
                                {/*        <NavItem className={'mr-2 my-auto w-20 d-inline-block order-1'}>*/}
                                {/*            <Button*/}
                                {/*                color={'link text-white'}*/}
                                {/*                style={{*/}
                                {/*                    textDecoration: 'none'*/}
                                {/*                }}*/}
                                {/*                onClick={(event) => {*/}
                                {/*                    this.toggleLogin();*/}
                                {/*                    event.preventDefault();*/}
                                {/*                }}*/}
                                {/*            >*/}
                                {/*                Login / SignUp*/}
                                {/*            </Button>*/}
                                {/*            <Modal*/}
                                {/*                isOpen={this.state.loginOpen}*/}
                                {/*                toggle={this.toggleLogin}*/}
                                {/*            >*/}
                                {/*                <ModalHeader toggle={this.toggleLogin}>Login</ModalHeader>*/}
                                {/*                <ModalBody>*/}
                                {/*                    <LoginForm*/}
                                {/*                        onChangeUsernameLogin={this.onChangeUsernameLogin}*/}
                                {/*                        onChangePasswordLogin={this.onChangePasswordLogin}*/}
                                {/*                        username={this.state.username}*/}
                                {/*                        passsword={this.state.password}*/}
                                {/*                    />*/}
                                {/*                </ModalBody>*/}
                                {/*                <ModalFooter>*/}
                                {/*                    <Button*/}
                                {/*                        color={'link text-dark'}*/}
                                {/*                        style={{*/}
                                {/*                            textDecoration: 'none'*/}
                                {/*                        }}*/}
                                {/*                        onClick={(event) => {*/}
                                {/*                            this.toggleSignUp();*/}
                                {/*                            event.preventDefault();*/}
                                {/*                        }}*/}
                                {/*                    >*/}
                                {/*                        <b>Not a member? Sign Up</b>*/}
                                {/*                    </Button>*/}
                                {/*                    <Button*/}
                                {/*                        color={'success'}*/}
                                {/*                        onClick={(event) =>*/}
                                {/*                            this.props.onClickLogin(event, this.state.username, this.state.password)*/}
                                {/*                        }*/}
                                {/*                    >*/}
                                {/*                        Login*/}
                                {/*                    </Button>*/}
                                {/*                </ModalFooter>*/}
                                {/*            </Modal>*/}
                                {/*            <Modal*/}
                                {/*                isOpen={this.state.signUpOpen}*/}
                                {/*                toggle={this.toggleSignUp}*/}
                                {/*            >*/}
                                {/*                <ModalHeader toggle={this.toggleSignUp}>Sign Up</ModalHeader>*/}
                                {/*                <ModalBody>*/}
                                {/*                    <SignUpForm/>*/}
                                {/*                </ModalBody>*/}
                                {/*                <ModalFooter>*/}
                                {/*                    <Button*/}
                                {/*                        color={'link text-dark'}*/}
                                {/*                        style={{*/}
                                {/*                            textDecoration: 'none'*/}
                                {/*                        }}*/}
                                {/*                        onClick={(event) => {*/}
                                {/*                            this.toggleLogin();*/}
                                {/*                            event.preventDefault();*/}
                                {/*                        }}*/}
                                {/*                    >*/}
                                {/*                        <b>Already a member? Login</b>*/}
                                {/*                    </Button>*/}
                                {/*                    <Button*/}
                                {/*                        color={'success'}*/}
                                {/*                        onClick={*/}
                                {/*                            (event) => {*/}
                                {/*                                event.preventDefault();*/}
                                {/*                            }*/}
                                {/*                        }*/}
                                {/*                    >*/}
                                {/*                        Sign Up*/}
                                {/*                    </Button>*/}
                                {/*                </ModalFooter>*/}
                                {/*            </Modal>*/}
                                {/*        </NavItem>*/}
                                {/*        :*/}
                                {/*        <UncontrolledDropdown nav inNavbar className={'float-right'}>*/}
                                {/*            <DropdownToggle nav caret className={'text-white'}>*/}
                                {/*                {this.props.user}*/}
                                {/*            </DropdownToggle>*/}
                                {/*            <DropdownMenu right>*/}
                                {/*                <DropdownItem>*/}
                                {/*                    Profile*/}
                                {/*                </DropdownItem>*/}
                                {/*                <DropdownItem>*/}
                                {/*                    Messages*/}
                                {/*                </DropdownItem>*/}
                                {/*                <DropdownItem>*/}
                                {/*                    <Link*/}
                                {/*                        to={'/review-posts'}*/}
                                {/*                        className={'text-dark'}*/}
                                {/*                        style={{textDecoration:'none'}}*/}
                                {/*                    >*/}
                                {/*                        Review Posts*/}
                                {/*                    </Link>*/}
                                {/*                </DropdownItem>*/}
                                {/*                <DropdownItem divider />*/}
                                {/*                <DropdownItem*/}
                                {/*                    onClick={(event) => {*/}
                                {/*                        this.props.onClickSignOut(event);*/}
                                {/*                        this.setState({*/}
                                {/*                            loginOpen: false,*/}
                                {/*                            signUpOpen: false*/}
                                {/*                        })*/}
                                {/*                    }}*/}
                                {/*                >*/}
                                {/*                    SignOut*/}
                                {/*                </DropdownItem>*/}
                                {/*            </DropdownMenu>*/}
                                {/*        </UncontrolledDropdown>*/}
                                {/*}*/}
                            {/*</Nav>*/}
                        {/*</Collapse>*/}
                    </div>
                </Navbar>
            </div>
        )
    }
}