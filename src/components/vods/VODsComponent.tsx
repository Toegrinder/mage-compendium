import { VODS } from '../../config/Config';

export default function VODsComponent() {
    const config = VODS
    return (
        <div className={'vods-div'}>
            <table>
                <tr>
                    <th></th>
                    <th>Arcane</th>
                    <th>Frost</th>
                    <th>Fire</th>
                </tr>
                    {
                        config.bosses.map(boss =>{
                           
                   return <tr> 
                            <td className={"boss-square"}>
                                <img src={`bosses/${boss.image}`} className={"boss-image"} alt={boss.name}/>
                                <div className={"boss-name"}>{boss.name}</div>
                            </td>
                            <td className={"spec-square"}>
                                {boss.arcane.map(it => { return link(it.link, it.displayName)})}
                            </td>
                            <td className={"spec-square"}>
                                {boss.frost.map(it => { return link(it.link, it.displayName)})}
                            </td>
                            <td className={"spec-square"}>
                                {boss.fire.map(it => { return link(it.link, it.displayName)})}
                            </td>
                        </tr>
                        })
                    }
            </table>
        </div>

        
    )
}


function link(url: string, player: string) {
    return (<div className="rowContent"><a href={url}>{player}</a></div>)
}