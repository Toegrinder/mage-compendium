import React from "react";
import { Player } from "../../App";
import { graphs, targets } from "../../config/Config";
import { formatText } from "../../util/Util";
import { Spec } from "./SimsComponent";

type Props = {
    changeSpecSelection: (selection: string) => void,
    changeGraphSelection: (selection: string) => void,
    changeTargetSelection: (selection: string) => void,
    selectedSpec: string,
    selectedGraph: string,
    selectedTarget: string,
    specs: Array<Spec>
}

interface State {
}


export interface Graph {
    players: Array<Player>
}

export default class ButtonBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            val: "hello"
        }
    }

    render() {
        var specButtons = this.props.specs.map((it) => {
            let classColor: string = "mage"
            let selectedClass : string = this.props.selectedSpec === it.ref ? `${classColor}-selected` : ""
           return <button key={it.ref} className={`nav-button btn ${classColor} ${selectedClass}`} onClick={() => this.props.changeSpecSelection(it.ref)}>{ it.displayName }</button>
        })

        var targetButtons = [];
        for (const [key, value] of Object.entries(targets)) {
            let selectedClass : string = this.props.selectedTarget === value ? "nav-button btn success success-selected" : "nav-button btn success"
            targetButtons.push( <button key={key} className={selectedClass} onClick={() => this.props.changeTargetSelection(value)}>{ formatText(key) }</button> )
        }

        var graphButtons = []
        for (const [key, value] of Object.entries(graphs)) {
            let selectedClass : string = this.props.selectedGraph === value ? "nav-button btn warning warning-selected" : "nav-button btn warning"
            graphButtons.push( <button key={key} className={selectedClass} onClick={() => this.props.changeGraphSelection(value)}>{ formatText(key) }</button> )
        }

               return ( 
               <div>
                    <div className="button-row">
                        { specButtons }
                    </div>

                    <div className="button-row">
                        { targetButtons }
                    </div>

                    <div className="button-row">
                        { graphButtons }
                    </div>
                </div>
             )
    }
}