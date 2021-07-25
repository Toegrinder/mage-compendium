import styled from 'styled-components';
import { getQueryParam } from '../../util/Util';


export default function GuidesComponent() {
    let embeddedDoc = ""
    const spec = getQueryParam("spec")
    switch(spec){
        case "arcane":
            embeddedDoc = "https://docs.google.com/document/d/e/2PACX-1vR51NocXITmiiQSKvuTlAEuRCsI69cAJeo0DOnUVTtHvCQU2F0IbkGxOwhMWzqfkkSeRv37nn6wL5mU/pub?embedded=true"
            break;
        case "frost":
            embeddedDoc ="https://docs.google.com/document/d/e/2PACX-1vSlLWddAlojK9Naybo3qqUebGIM1mqbRrThf8qX2oLw7ALMsoL-g2F5Z80FzUMfek8EFoCOMo_-BC_C/pub?embedded=true"
            break;
        case "fire":
            embeddedDoc = "https://docs.google.com/document/d/e/2PACX-1vSfZkYq70FXL2sPFAgpF7RI2vz3EvrBlehe9eK3Y6bCTwzh2rWvsE1evRqWhnsqfSApoMGdk2HMIhHu/pub?embedded=true"

    }
    return (
        <div className={'guides-div'}>
        <div className="guides-header-div">
        <RawLinkStyle href={`https://tinyurl.com/${spec}-mage-compendium`}>For working navigation please visit the google doc</RawLinkStyle>
        </div>
            <StyledIFrame 
            src={embeddedDoc}
            ></StyledIFrame>
        </div>

        
    )
}


export const StyledIFrame = styled.iframe`
height: 2600vh;
width: 70%;
border: none;
overflow-x: hidden;
`

export const RawLinkStyle = styled.a`
position: absolute;
right: 0px;
margin: 5px;
margin-right: 10px;
`

/*export default function GuidesComponent() {
    return (
        <div className={'guides-div'}>
            <StyledIFrame 
            src="https://docs.google.com/document/d/e/2PACX-1vSfZkYq70FXL2sPFAgpF7RI2vz3EvrBlehe9eK3Y6bCTwzh2rWvsE1evRqWhnsqfSApoMGdk2HMIhHu/pub?embedded=true"
            seamless={false}
            marginWidth={230}
            width='100%'
            ></StyledIFrame>
        </div>
    )
}


export const StyledIFrame = styled.iframe`
height: 90vh;
border: none;
overflow-x: hidden;
margin: 2em
`*/