
import React from "react";


type Props = {
    question: string,
    answer: string
}

interface State {
}


export default class Question extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            simIds: null
        }
    }

    render() {

        return (
             <div className={"qa-div"}>
                <div className={"qa-q"}>
                   Q: {this.props.question}
                </div>
                <div className={"qa-a"}>
                  A: {this.props.answer}
                </div>
            </div>
        )
    }

}