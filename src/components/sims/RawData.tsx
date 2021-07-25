
import React from "react";
import { mageSpecs, graphs, targets } from "../../config/Config";
import {Card, Row} from 'reactstrap';
import styled from "styled-components";
import { formatText } from "../../util/Util";
import { override, RawLinkStyle } from "./SimsComponent";
import axios from "axios";
import { ClipLoader } from "react-spinners";

type Props = {
}

interface State {
    simIds: any,
    loading: boolean,
    error: boolean
}

export default class RawData extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            simIds: null
        }
    }

    componentDidMount() {
        const requestUrl = "https://l2cpa6kegi.execute-api.eu-west-1.amazonaws.com/prod/html"
        const resp = axios.get(requestUrl)
        resp.then(res => this.setState({
            simIds: res.data,
            loading: false
        })).catch(error => {
            console.error(error)
            this.setState({
                loading: false,
                error: true
            })
        })
    }

    loadingScreen = () => { return <ClipLoader css={override} color={"#40C7EB"} loading={this.state.loading} size={300} /> }

    error = () => { return <div>bad juju has occured <br /> refresh the page or go ping Toe on discord </div> }

    content = () => { var specRows = []
        for (const [, specValue] of Object.entries(mageSpecs)) {
            specRows.push( <SpecRow spec={specValue.ref} simIds={this.state.simIds}/>)
            
        }
        //@ts-ignore
        return <MainDivStyle> 
            <RawLinkStyle to={`/sims`}>Back to Charts</RawLinkStyle>
            {specRows} 
            </MainDivStyle>

    }
        

    render() {
        return (
            !!this.state.loading ? this.loadingScreen() :
                !this.state.error ? this.content() : this.error()
        )
    }

    
    

}

export function SpecRow({ 
    spec,
    simIds
} : SpecRowProps): React.ReactElement {
    var targetBlocks = []
        for (const [, targetValue] of Object.entries(targets)) {
            targetBlocks.push( <SimsList spec={spec} target={targetValue} simIds={simIds}/>)
        }
    
        
    return(
        <RowStyle> {targetBlocks} </RowStyle>
    )
}

export function SimsList({ 
    spec, 
    target,
    simIds
} : SimsListProps): React.ReactElement {
    var links = []
        for (const [graphKey, graphValue] of Object.entries(graphs)) {
            const simId = simIds[spec][target][graphValue]
            links.push( <div> <a href={`https://www.raidbots.com/simbot/report/${simId}/simc`}>{formatText(graphKey)}</a> <br/></div>)
        }
    
        
    return(
        <SimListStyle> <h1> {formatText(spec)} {target} </h1>
         <CardStyle className="spec-links"> 
             {links} 
        </CardStyle>
        </SimListStyle>
    )
}

interface SpecRowProps {
    spec: string,
    simIds: any
}


interface SimsListProps {
    spec: string,
    target: string,
    simIds: any
}




const CardStyle = styled(Card)`
margin: 1rem 2rem 0 2rem;
`

const RowStyle = styled(Row)`
width: 100%;
display: flex;
`

const SimListStyle = styled.div`
width: 30%
`

const MainDivStyle = styled.div`
width: 80%;
margin: auto
`