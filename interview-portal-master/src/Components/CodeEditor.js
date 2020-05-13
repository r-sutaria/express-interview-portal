import React from "react";
import AceEditor from "react-ace";
import {Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,Button} from 'reactstrap';
import {MdRestore} from "react-icons/all";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-xcode";
// let he = new HackerEarth('a249b98ec56b0a7e52d802c5e4fe57dffa7b3d0f',1);
export default class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            mode: 'c_cpp',
            theme: 'twilight',
            fontSize: 16,
            height: '400px',
            width: '900px',
            language: 'C',
            loaded: false,
            description: <div/>,
            title: <div/>,
            outputElement: <div/>,
            outputLoaded: false,
            input:""
        };
        // console.log(this.props);
        this.outputRef = React.createRef();
    }
    mode_map = {
        'C' : 'c_cpp',
        'CPP': 'c_cpp',
        'JAVA': 'java',
        'PYTHON': 'python',
        'PYTHON3':'python',
        'KOTLIN': 'kotlin'
    };

    onChange = (value) => {
        this.setState({value})
    };

    componentDidMount() {
        if(!this.state.loaded) {
            const id = this.props.match.params.id;
            fetch('/practice/'+id)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    const desc = res.description.substring(0,res.description.length-168);
                    const divElement = <div dangerouslySetInnerHTML={{__html:
                        desc}}/>;
                    const titleElement = <div dangerouslySetInnerHTML={{__html:
                        res.title}}/>;
                       this.setState({
                           description: divElement,
                           title: titleElement,
                           loaded: true
                       })
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.outputLoaded) {
            // this.outputRef.current.focus();
        }
    }

    render() {
        return(
            <div className={'container'}>
                <div className={'ml-3 mt-2'}>
                    <div className={'mb-5'}>
                        <h3>
                            {this.state.title}
                        </h3>
                        {this.state.description}
                    </div>
                    <div className={'border mb-5'}> </div>
                    <div className={'rounded-top border-bottom-0'} style={{width:this.state.width,minHeight: '30px',backgroundColor: '#c1c1c1'}}>
                        <div className={'ml-2 col-form-label row'}>
                            <Button
                                color={'white'}
                                className={'ml-auto mr-2'}
                                onMouseDown = {(e) => {
                                    e.preventDefault();
                                    this.setState({
                                        value: ''
                                    })
                                }}
                                title={'Reset Code'}
                            >
                                <MdRestore size = '23px'/>
                            </Button>
                            <UncontrolledDropdown className={'mr-2'}>
                                <DropdownToggle
                                    caret={true}
                                    className={'bg-white text-dark'}
                                    onMouseDown={(e)=>e.preventDefault()}
                                >
                                    Theme
                                </DropdownToggle>
                                <DropdownMenu style={{fontStyle:'normal'}}>
                                    <DropdownItem
                                        active={'github' === this.state.theme}
                                        onMouseDown={(event) => {
                                            event.preventDefault();
                                            this.setState({
                                                theme: 'github'
                                            })
                                        }}
                                    >
                                        Github
                                    </DropdownItem>
                                    <DropdownItem
                                        active={'twilight' === this.state.theme}
                                        onMouseDown={(event) => {
                                            event.preventDefault();
                                            this.setState({
                                                theme: 'twilight'
                                            })
                                        }}
                                    >
                                        Twilight
                                    </DropdownItem>
                                    <DropdownItem
                                        active={'terminal' === this.state.theme}
                                        onMouseDown={(event) => {
                                            event.preventDefault();
                                            this.setState({
                                                theme: 'terminal'
                                            })
                                        }}
                                    >
                                        Terminal
                                    </DropdownItem>
                                    <DropdownItem
                                        active={'xcode' === this.state.theme}
                                        onMouseDown={(event) => {
                                            event.preventDefault();
                                            this.setState({
                                                theme: 'xcode'
                                            })
                                        }}
                                    >
                                        Xcode
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <Input
                                type={'select'}
                                name={'select'}
                                id={'language'}
                                className={'border-dark mr-4'}
                                style={{width: '20%'}}
                                title={'Select Language'}
                                onChange = {(event) => {
                                    const val = event.target.value;
                                    this.setState({
                                        language: val,
                                        mode: this.mode_map[val]
                                    })
                                }}
                            >
                                <option value={'C'}>C</option>
                                <option value={'CPP'}>C++</option>
                                <option value={'JAVA'}>Java</option>
                                <option value={'PYTHON'}>Python 2.7</option>
                                <option value={'PYTHON3'}>Python 3.0</option>
                            </Input>
                        </div>
                    </div>
                    <AceEditor
                        mode={this.state.mode}
                        theme={this.state.theme}
                        onChange={this.onChange}
                        name="code_editor"
                        value={this.state.value}
                        editorProps={{ $blockScrolling: true }}
                        height={this.state.height}
                        width={this.state.width}
                        showPrintMargin={false}
                        fontSize={this.state.fontSize}
                        focus={true}
                    />
                    <br/>
                    <h5>
                        Input
                    </h5>
                    <Input
                        type={'textarea'}
                        rows={5}
                        style={{width:this.state.width}}
                        value={this.state.input}
                        onChange={(e) => {
                            this.setState({
                                input:e.target.value
                            })
                        }}
                    />
                </div>
                <div>
                    <Button
                        className={'my-3 float-right'}
                        style={{marginRight: '17.5%'}}
                        color={'dark'}
                        onMouseDown={(e) => {
                            // alert("Thai gyu bc!");
                            fetch('/api/run',{
                                method:'POST',
                                headers:{
                                    'Accept':'application/json',
                                    'Content-Type':'application/json'
                                },
                                body: JSON.stringify({
                                    "code":this.state.value,
                                    "language":this.state.language,
                                    "input":this.state.input
                                })
                            }).then( response => {
                                return response.json()
                            }).then((response) => {
                                console.log(response);
                                const outputElement = <div ref={this.outputRef} dangerouslySetInnerHTML={{__html:response.run_status.output_html}}/>;
                                this.setState({outputLoaded:true,outputElement});
                            }).catch( error => console.log(error.message));
                            e.preventDefault();
                            e.preventDefault();
                        }}
                    >
                        Run
                    </Button>
                    <Button
                        className={'my-3 mr-1 float-right'}
                        color={'dark'}
                        onMouseDown={(e) => {
                            this.setState({
                                outputLoaded: true,
                                outputText: "Compiling.."
                            });
                            fetch('/api/compile',{
                                method:'POST',
                                headers:{
                                    'Accept':'application/json',
                                    'Content-Type':'application/json'
                                },
                                body: JSON.stringify({
                                    "code":this.state.value,
                                    "language":this.state.language,
                                    "input":this.state.input
                                })
                            }).then( response => {
                                return response.json()
                            }).then((response) => {
                                console.log(response);
                                const text = response.compile_status === "OK" ? "Compiled Successfully" : response.compile_status;
                                const outputElement = <div ref={this.outputRef} dangerouslySetInnerHTML={{__html:text}}/>;
                                this.setState({outputLoaded:true,outputElement});
                            }).catch( error => console.log(error.message));
                            e.preventDefault();
                        }}
                    >
                        Compile
                    </Button>
                </div>
                {
                    this.state.outputLoaded?

                        <div className={'ml-3 mt-5'}>
                            <h5>Output</h5>
                            {this.state.outputElement}
                        </div>
                    : <div/>
                }
            </div>
        );
    }
}
