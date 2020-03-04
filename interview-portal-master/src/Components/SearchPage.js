import React from "react";

export default class SearchPage extends React.Component {
    render() {
        console.log(this.props);
        const {term} = this.props.match.params;
        return <div>{term}</div>;
    }
}