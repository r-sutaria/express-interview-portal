import React from 'react';
import {FaUserEdit} from "react-icons/all";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader,Form,Label,Input} from 'reactstrap';
import {Link} from 'react-router-dom';
export default class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            experiences: [
                'Amazon Interview Experience For SDE-I By Rutvik Sutaria',
                'Amazon Interview Experience For SDE-I By Rutvik Sutaria',
                'Amazon Interview Experience For SDE-I By Rutvik Sutaria'
            ],
            queries: [
                'What are some tips to crack the Amazon interview?',
                'What are some tips to crack the Amazon interview?',
                'What are some tips to crack the Amazon interview?'
            ],
            problems: [
                'Printing the side view of the binary tree in O(1)',
                'Printing the side view of the binary tree in O(1)',
                'Printing the side view of the binary tree in O(1)'
            ],
            open: false,
            username: 'Rutvik Sutaria',
            description: '8th semester CSE student',
            inputUsername: '',
            inputDescription: ''
        }
    }


    renderItems = (item,index) => {
        const ret = index%2 === 0 ?
            <div className={'bg-light col-form-label'} style={{height:50}}>
                <a href={'#'} className={'text-dark'}><h6>{item}</h6></a>
            </div>
            :
                <div className={'col-form-label'} style={{height:50}}>
                    <a href={'#'} className={'text-dark'}><h6>{item}</h6></a>
                </div>;
        return(ret);
    };

    toggleModal = () => {
        this.setState({
            open: !this.state.open
        })
    };

    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'col-auto'}>
                        <img src={'/pikachu.jpg'} alt={'Profile Picture'} className={'border border-dark mr-2'} style={{width:128,height:128}}/>
                    </div>
                    <div className={'col-10'}>
                        <h4>
                            {this.state.username}
                            <Button color={'white'} className={'float-right'} title={'Edit your profile'}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    this.toggleModal();
                                }}
                            >
                                <FaUserEdit size={20}/>
                            </Button>
                        </h4>
                        <h6>
                            {this.state.description}
                        </h6>
                    </div>
                </div>
                <div className={'mt-3'}>
                    <h3>
                        Interview Experiences
                    </h3>
                    {
                        this.state.experiences.map((item,index) => {
                            return this.renderItems(item,index);
                        })

                    }
                    <Link to={'/usr/user1/experiences'}>See All</Link>
                </div>

                <div className={'mt-3'}>
                    <h3>
                        Queries Asked
                    </h3>
                    {
                        this.state.queries.map((item,index) => {
                            return this.renderItems(item,index);
                        })
                    }
                    <Link to={'/usr/user1/queries'}>See All</Link>
                </div>

                <div className={'mt-3'}>
                    <h3>
                        Problems Solved
                    </h3>
                    {
                        this.state.problems.map((item,index) => {
                            return this.renderItems(item,index);
                        })
                    }
                </div>
                <Link to={'/usr/user1/problems-solved'}>See All</Link>
                <Modal
                    isOpen={this.state.open}
                    toggle={this.toggleModal}
                >
                    <ModalHeader toggle={this.toggleModal}>Edit Profile</ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className={'row'}>
                                <div className={'col-md-2'}>
                                    <Label className={'col-form-label'} for={'name'}>
                                        <h6>Name</h6>
                                    </Label>
                                </div>
                                <div className={'col ml-1'}>
                                    <Input id={'name'} type={'text'} value={this.state.inputUsername} onChange={(e) => {
                                        this.setState({
                                            inputUsername: e.target.value
                                        });
                                    }}/>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-md-2'}>
                                    <Label className={'col-form-label'} for={'description'}>
                                        <h6>Description</h6>
                                    </Label>
                                </div>
                                <div className={'col ml-1'}>
                                    <Input id={'description'} value={this.state.inputDescription} type={'text'} onChange={(e) => {
                                        this.setState({
                                            inputDescription: e.target.value
                                        });
                                    }}/>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-md-2'}>
                                    <Label className={'col-form-label'} for={'profile-pic'}>
                                        <h6>Profile Picture</h6>
                                    </Label>
                                </div>
                                <div className={'col ml-1'}>
                                    <Input id={'profile-pic'} type={'file'}/>
                                </div>
                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color={'success'} onMouseDown={(e) => {
                            const usr = this.state.inputUsername,des = this.state.inputDescription;
                            this.setState({
                                username: usr,
                                description:des,
                                inputUsername:'',
                                inputDescription:''
                            });
                            this.toggleModal();
                            e.preventDefault();
                        }}>
                            Submit
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}