
import React from "react";
import GraphComponent, { Graph } from "./GraphComponent";
import ButtonBar from "./ButtonBar";
import { graphs, mageSpecs, targets } from "../../config/Config";
import { Player } from "../../App";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import { getQueryParam, setQueryParam } from "../../util/Util";

type Props = {
    specs: any
}

interface State {
    selectedSpec: string,
    selectedGraph: string,
    selectedTarget: string,
    selectedChart: any,
    loading: boolean,
    error: boolean
}

export interface Spec {
    displayName: string,
    ref: string
}

export default class SimsComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.changeSpecSelection = this.changeSpecSelection.bind(this)
        this.changeGraphSelection = this.changeGraphSelection.bind(this)
        this.changeTargetSelection = this.changeTargetSelection.bind(this)
        this.state = {
            selectedSpec: getQueryParam("spec") ?? mageSpecs[0].ref,
            selectedGraph: getQueryParam("graphs") ?? graphs.COVENANTS,
            selectedTarget: getQueryParam("targets") ?? targets.ONE_TARGET,
            selectedChart: null,
            loading: true,
            error: false
        }
    }

   

    componentDidMount() {
        const requestUrl = "https://l2cpa6kegi.execute-api.eu-west-1.amazonaws.com/prod/"
        const resp = axios.get(requestUrl)
        resp.then(res => this.setState({
            selectedChart: res.data,
            loading: false
        })).catch(error => {
            console.error(error)
            this.setState({
                loading: false,
                error: true
            })
        })
    }

    render() {
        return (
            !!this.state.loading ? this.loadingScreen() :
                !this.state.error ? this.content() : this.error()
        )
    }

    loadingScreen = () => { return <ClipLoader css={override} color={"#40C7EB"} loading={this.state.loading} size={300} /> }

    error = () => { return <div>bad juju has occured <br /> refresh the page or go ping Toe on discord </div> }

    content = () => {

        const {selectedSpec, selectedTarget, selectedGraph, loading, selectedChart } = this.state
        
        let x: Array<Player> = loading ? [] : selectedChart[selectedSpec][selectedTarget][selectedGraph]
        //let x = y.filter((it: Player) => {
        //    return it.name.match(/\d+$/) === null
        //})
        let graph: Graph = {
            players: x,
            spec: selectedSpec,
            title: selectedGraph,
            targets: selectedTarget
        }
        return <div>
            <RawLinkStyle to={`/sims/html`}>View HTML Results</RawLinkStyle>
            <div className="header">
                <ButtonBar
                    changeSpecSelection={this.changeSpecSelection}
                    changeGraphSelection={this.changeGraphSelection}
                    changeTargetSelection={this.changeTargetSelection}
                    selectedGraph={selectedGraph}
                    selectedSpec={selectedSpec}
                    selectedTarget={selectedTarget}
                    specs={this.props.specs}
                />
            </div>
            <div className="graph-body">
                <GraphComponent graph={graph} />

            </div>
        </div>
    }

    changeSpecSelection(selection: string) {
        setQueryParam("spec", selection)
        this.setState({
            selectedSpec: selection
        })
    }

    changeGraphSelection(selection: string) {
        setQueryParam("graphs", selection)
        this.setState({
            selectedGraph: selection
        })
    }

    changeTargetSelection(selection: string) {
        this.setState({
            selectedTarget: selection
        })
        setQueryParam("targets", selection)
    }
}


export const RawLinkStyle = styled(Link)`
position: absolute;
right: 0px;
margin: 5px;
margin-right: 10px;
`

export const override = css`
  margin-top: 6em;
`;
