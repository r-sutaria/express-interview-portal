import React from "react";
import {CompositeDecorator, Editor as DraftEditor, EditorState, RichUtils} from 'draft-js';
import {Button,Input,Col,Row} from 'reactstrap';
import styleMap from "../Constants/StyleMap";
import {FaAlignLeft,FaAlignRight,MdLink,GoListUnordered,GoListOrdered} from "react-icons/all";
import AnswerProfileCard from "./AnswerProfleCard";
import 'draft-js/dist/Draft.css';

export default class AnswerBox extends React.Component {
    constructor(props) {
        super(props);
        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link,
            },
        ]);
        this.state = {
            innerWidth: 0,
            innerHeight: 0,
            url:'',
            showURLInput: false,
            editorState: EditorState.createEmpty(decorator),
            editorContent: <div />
        };
        // this.editorRef = React.createRef();
        this.onChange = (editorState) => {
            this.setState({editorState,
                editorContent: this.editor.editor.innerHTML
            });
            // console.log(this.editor);
            // document.getElementById('editorContent').innerHTML = this.state.editorContent;
            // console.log(ReactDOM.findDOMNode(this).innerHTML)
        };
        this.promptForLink = this._promptForLink.bind(this);
        this.onURLChange = (e) => this.setState({urlValue: e.target.value});
        this.confirmLink = this._confirmLink.bind(this);
        this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
        this.removeLink = this._removeLink.bind(this);
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    updateWindowsDimension = () => {
        this.setState({
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight
        });
    };

    isActive(style) {
        const styles = this.state.editorState.getCurrentInlineStyle();
        return styles.has(style);
    }

    isBlockActive(type) {
        const blockType = RichUtils.getCurrentBlockType(this.state.editorState);
        return blockType === type;
    }

    buttons = ['BOLD','ITALIC','UNDERLINE','H1','H2','H3','H4','H5'];
    labels = [
        <b>B</b>,
        <i>I</i>,
        <u>U</u>,
        <span>H1</span>,
        <span>H2</span>,
        <span>H3</span>,
        <span>H4</span>,
        <span>H5</span>,
    ];

    renderButton(style,label,onChange) {
        return(
            <Button
                className={'btn-light border-dark border-0 m-1'}
                style={{textDecoration:'none'}}
                key={style}
                size={'md'}
                onMouseDown={(event)=>{
                    event.preventDefault();
                    onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
                }}
                active={this.isActive(style)}
            >
                {label}
            </Button>
        )
    }

    componentDidMount() {
        this.editor.focus();
        this.updateWindowsDimension();
        window.addEventListener('resize',this.updateWindowsDimension);
    }

    isLinkActive() {
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
            let url='';
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey);
                url = linkInstance.getData().url;
                return true;
            }
            return false;

        }
    }

    _promptForLink(e) {
        e.preventDefault();
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

            let url = '';
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey);
                url = linkInstance.getData().url;
                console.log(url);
            }

            this.setState({
                showURLInput: true,
                urlValue: url,
            });
        }
    };

    _confirmLink(e) {
        e.preventDefault();
        const {editorState, urlValue} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            {url: urlValue}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
            showURLInput: false,
            urlValue: '',
        });
    };

    _onLinkInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmLink(e);
        }
    }

    _removeLink(e) {
        e.preventDefault();
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                editorState: RichUtils.toggleLink(editorState, selection, null),
            });
        }
    };

    renderLinkButton = () => {
        let urlInput;
        if (this.state.showURLInput) {
            urlInput =
                <Row>
                    <Col md={'auto'} className={'ml-2'}>
                        <Input
                            onChange={this.onURLChange}
                            style={styles.urlInput}
                            type="text"
                            value={this.state.urlValue}
                            onKeyDown={this.onLinkInputKeyDown}
                        />
                    </Col>
                    <Col>
                        <Button
                            className={'btn-light border-dark border-0 mb-2'}
                            style={{textDecoration:'none'}}
                            size={'md'}
                            onMouseDown={this.confirmLink}
                        >
                            Confirm
                        </Button>
                    </Col>
                </Row>;
        }
        return (
            <span>
                <Button
                    className={'btn-light border-dark border-0 m-1'}
                    style={{textDecoration:'none'}}
                    size={'md'}
                    onMouseDown={this.promptForLink}
                    active={this.isLinkActive()}
                >
                    <MdLink size={20}/>
                </Button>
                <Button
                    className={'btn-light border-dark border-0 m-1'}
                    style={{textDecoration:'none'}}
                    size={'md'}
                    onMouseDown={this.removeLink}
                    active={this.isActive('LINK')}
                >
                    Remove Link
                </Button>
                {urlInput}
            </span>
        )
    }
    ;

    render() {
        const onChange = this.onChange;
        return(
            <div className={'mx-3 mb-3'}>
                <AnswerProfileCard
                    src={'/pikachu.jpg'}
                    name={'Rutvik Sutaria'}
                    description={'8th semester CSE student'}
                />
                <div className={'mx-3 border-dark rounded-top border bg-light border-bottom-0'} style={{width:'97%'}}>
                    <div>
                        {
                            this.buttons.map(
                                (button,index) => this.renderButton(button,this.labels[index],onChange)
                            )
                        }
                        <Button
                            className={'btn-light border-dark border-0 m-1'}
                            style={{textDecoration:'none'}}
                            size={'md'}
                            onMouseDown={(event)=>{
                                event.preventDefault();
                                onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
                            }}
                            active={this.isBlockActive('unordered-list-item')}
                        >
                            <GoListUnordered size={20}/>
                        </Button>
                        <Button
                            className={'btn-light border-dark border-0 m-1'}
                            style={{textDecoration:'none'}}
                            size={'md'}
                            onMouseDown={(event)=>{
                                event.preventDefault();
                                onChange(RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item'));
                            }}
                            active={this.isBlockActive('ordered-list-item')}
                        >
                            <GoListOrdered size={20}/>
                        </Button>
                        {this.renderLinkButton()}
                    </div>
                </div>
                <div className={'border rounded-bottom border-dark mx-3'} style={{width:'97%',minHeight:this.state.innerHeight/3,marginLeft:10,backgroundColor:'#FFFFFF'}}>
                    <div className={'mx-2 p-1'}>
                        <DraftEditor
                            editorState={this.state.editorState}
                            customStyleMap={styleMap}
                            onChange={onChange}
                            handleKeyCommand={this.handleKeyCommand}
                            placeholder={'Type your answer..'}
                            ref={(editor) => {
                                this.editor = editor;
                            }}
                        />
                    </div>
                </div>
                {/*<div id={'editorContent'}>*/}

                {/*</div>*/}
                <Button
                    type={'submit'}
                    color={'dark'}
                    className={'mt-1 ml-3 mb-2'}
                    onClick={(e) => {
                        e.preventDefault();
                        // document.getElementById('editorContent').innerHTML = this.state.editorContent;
                        this.props.onSubmit(this.state.editorContent);
                    }}
                    size={'sm'}
                >
                    Submit
                </Button>
            </div>
        );
    }
}

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey && contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} style={styles.link}>
            {props.children}
        </a>
    );
};

const styles = {
    root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    link: {
        color: '#3b5998',
        textDecoration: 'underline',
    },
};