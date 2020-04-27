import React from "react";
import QueryCard from "./QueryCard";

import {Modal,ModalHeader,ModalFooter,ModalBody,Button,Input} from 'reactstrap';
export default class QueryPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            queries: []
        };
        this.getQueries();
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    getQueries = () => {
        fetch('/queries')
            .then(res => res.json())
            .then(res => {
                let queries = res;
                this.setState({queries});
                console.log(queries);
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const {queries} = this.state;
        return (
            <div>
                <div className={'border-bottom'}>
                    <h5>
                        <Button
                            size={'md'}
                            color={'link'}
                            onMouseDown={event => {
                                event.preventDefault();
                                this.setState({
                                    isModalOpen: true
                                });
                            }}
                        >
                            Ask your Question
                        </Button>
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
                {/*<QueryCard />*/}
                {/*<QueryCard />*/}
                {/*<QueryCard />*/}
                {/*<QueryCard />*/}
                {
                    queries.length !== 0 ? queries.map((query,index) => {
                        return <QueryCard key={index} id={query._id} question={query.question} />
                    }):
                        <img src={'loading.gif'} alt={'Loading...'} style={{position:'absolute',top:'50%',left:'50%'}} />
                }
            </div>
        );
    }
}