import React from "react";
import { Player } from "../../App";
import CanvasJSReact from '../../canvasjs.react';
import { formatText } from "../../util/Util";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

type Props = {
    graph: Graph
}

interface State {
}

export interface Graph {
    players: Array<Player>,
    spec: string,
    title: string,
    targets: string
}

export default class GraphComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    render() {
        //let title = `${this.props.graph.spec} - ${this.props.graph.title} - ${this.props.graph.targets}`
        
        let sortedData = this.props.graph.players.sort( (a, b) => {
            return a.dps.mean - b.dps.mean
        }).reverse().slice(0, 30).reverse()

        let max : number = sortedData[sortedData.length-1].dps.mean
        let min : number = sortedData[0].dps.mean
        let dataPoints = sortedData.map ( (player: Player) => {
            return {
                y: player.dps.mean,
                label: formatText(player.name),
                color: this.colorCode(player.name, this.getDefaultColor(this.props.graph.spec)),
                indexLabel: `${this.getPercentageChange(min, player.dps.mean).toFixed(2)}%`,
                indexLabelPlacement: "outside",
                indexLabelFontSize: 16,
                indexLabelFontWeight: "bold"
            }
        })

        let dataPointWidth = 510 / dataPoints.length
        let maxWidth = 50
        let lineColor = "#545454"
        const options = {
			animationEnabled: true,
            theme: "dark2",
            dataPointWidth: dataPointWidth > maxWidth ? maxWidth : dataPointWidth,
            height: 760,
            dataPointMaxHeight: 20,
            axisX: {
                labelPlacement: false,
                interval: 1,
                labelFontSize: 18,
                lineColor: lineColor,
                tickColor: lineColor
            },
			axisY: {
				title: "DPS",
                includeZero: true,
                maximum: max * 1.05,
                minimum: min * 0.5,
                interval: Math.round((max / 20) /100)*100,
                gridColor: lineColor,
                tickColor: lineColor
			},
			data: [{
				type: "bar",
                dataPoints: dataPoints
			}]
        }

        return (
            <div> 
                <CanvasJSChart options = {options}/>
            </div>
        )
    }


    getPercentageChange(oldNumber: number, newNumber: number){
        return (newNumber / oldNumber) * 100 - 100;
    }

    colorCode(name: string, defaultColor: string) : string {
        let n = name.toLowerCase()
        //covenants
        if (n.includes("venthyr")) return "#a33421"
        else if (n.includes("kyrian")) return "#ccc450"
        else if (n.includes("necrolord")) return "#5acc50"
        else if (n.includes("nightfae") || n.includes("night_fae") || n.includes("nf_")) return "#0e74e8"
        //trinkets
        else if (n.includes("259")) return "#a33421"
        else if (n.includes("252")) return "#a33421"
        else if (n.includes("246")) return "#0e74e8"
        else if (n.includes("239")) return "#40C7EB"
        else if (n.includes("233")) return "#5acc50"
        else if (n.includes("226")) return "#ccc450"
        
        else return defaultColor
    }

    getDefaultColor(baseProfile: string) : string {
        let n = baseProfile.toLowerCase()
        if (n.includes("frost") || n.includes("fire") || n.includes("arcane")) return "#40C7EB"
        else if (n.includes("affliction") || n.includes("destruction") || n.includes("demonology")) return "#8787ED"
        else if (n.includes("shadow")) return "#FFFFFF"
        else return "#000000"
    }

    addSymbols(e: { value: number; }){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
}