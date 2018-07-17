import React, { Component } from "react"

export default class extends Component {
    state = {}
    componentDidMount() {
        console.log(this.props, "lala")
    }
    render() {
        return (
            <div>home search</div>
        )
    }
}