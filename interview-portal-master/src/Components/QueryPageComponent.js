import React from "react";
import QueryCard from "./QueryCard";
import {Link} from "react-router-dom";
import {Modal,ModalHeader,ModalFooter,ModalBody,Button,Input} from 'reactstrap';
export default class QueryPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render() {
        return (
            <div>
                <div className={'border-bottom'}>
                    <h5>
                        <a
                            href={'#'}
                            onMouseDown={event => {
                                event.preventDefault();
                                this.setState({
                                    isModalOpen: true
                                });
                            }}
                        >
                            Ask your Question
                        </a>
                    </h5>
                </div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleModal}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Ask your question
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            type={'textarea'}
                            type={'textarea'}
                            name={'text'}
                            rows={5}
                            placeholder={'Start your question with \'How\', \'What\', \'Why\'... '}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color={'dark'}
                        >
                            Submit
                        </Button>
                    </ModalFooter>
                </Modal>
                <QueryCard />
                <QueryCard />
                <QueryCard />
                <QueryCard />
            </div>
        );
    }
}