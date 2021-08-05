import Question from './Question';
import React from "react";
import { setQueryParam } from '../../util/Util';

type Props = {
}

interface State {
    selected: string
}


export default class FAQComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            selected: ""
        }
    }

    buttonNames = ["All", "Arcane", "Fire", "Frost", "General", "Simc"]

    render() {
        let buttons = []
        console.log(this.buttonNames)
        for (const key in this.buttonNames) {
            const value = this.buttonNames[key]
            let selectedClass: string = this.state.selected === value ? "nav-button mage-selected" : "nav-button mage"
            buttons.push(<button key={value} className={selectedClass} onClick={() => this.changeSelection(value)}> {value} </button>)
        }


        const FAQ_GENERAL = <div>
             <Question
                question={"Should I use Arcane Momentum?"}
                answer={"Person preference. Generally I would advise against it as it's more error prone and currently has multiple different bugs."}
            />
            <Question
                question={"What Soulbind do I use?"}
                answer={"Answer this with Raidbots top gear. Due to how Renown works the best Soulbind may change week to week, it's important to learn how to fish."}
            />
             <Question
                question={"Why do your guides not have BIS lists?"}
                answer={"A few reasons. First off BIS setups are only BIS once the entire set has been complete, which is likely long after your gear is actually relevant. Changing one item could mean that another item is no longer BIS. Second, with the current gearing system in World of Warcraft gear acquisition is incredibly random; it is far more productive to figure out how to sim and seek short term upgrades than it is to spend months chasing an ideal setup."}
            />
            <Question
                question={"What stat percentages should I aim for?"}
                answer={"Nothing, you don't aim for specific percentages of stats. The thought process behind this question is simply a misunderstanding of how stats work. There are very few stat breakpoints in the game that are of utmost importance, and stats generally complement each other. You equip the gear that gives you the most DPS with almost no thought on what stat percentages that leaves you at (hint: it doesn't matter)."}
            />
            <Question
                question={"Should I use pawn?"}
                answer={"No, it's an outdated addon, based on an outdated way of thinking about the game. It relies too heavily on stat weights being an accurate method of comparing gear, which they aren't."}
            />
             <Question
                question={"What professions should I use?"}
                answer={"In Shadowlands professions don't really matter. Almost nothing requires you to actually have the profession to use except for a few niche items in Engineering."}
            />
        </div>

        const FAQ_ARCANE = <div>
            <Question
                question={"Covenant / Soulbind / Legendary?"}
                answer={"Kyrian / Pelagos / Arcane Harmony"}
            />
             <Question
                question={"Why do other sim sites show Venthyr as the highest DPS?"}
                answer={"They use the default simc profile which is optimised for Venthyr. The results are not accurate for any other covenant"}
            />
             <Question
                question={"How do I sim syncing cooldowns as Kyrian?"}
                answer={"apl_variable.always_sync_cooldowns=1"}
            />
        </div>

        const FAQ_FROST = <div>
            <Question
                question={"Covenant / Soulbind / Legendary?"}
                answer={"Venthyr / Theotar / Freezing Winds"}
            />
            <Question
                question={"How Do I spend my procs?"}
                answer={"Because a target is either frozen or not frozen, there is no additional benefit to casting a Fingers of Frost Ice Lance into a Winter's Chill. This situation should be avoided if possible. This means that should you find yourself with both Fingers of Frost and Brain Freeze, you want to get rid of your Fingers of Frost procs before casting Frostbolt -> Flurry. However sometimes you will find a Frostbolt gives you both procs, or a Frozen Orb gives you Fingers of Frost while you already have Brain Freeze. In the event that you are casting a Frostbolt with both Fingers of Frost and Brain Freeze, you should cast Flurry at the end and simply waste the Fingers of Frost proc. This is because Brain Freeze provides significantly more damage than Fingers of Frost, and you don’t want to risk gaining another Brain Freeze and wasting one of them."}
            />
            <Question
                question={"Should I use Ice Lance at 5 icicles even without a proc?"}
                answer={"No, in fact whenever you are playing without Glacial Spike talented, Mastery: Icicles should not factor into a single one of your decisions. At 5 Icicles gaining a new Icicle with simply launch the oldest one. Meaning that they should be functionally ignored."}
            />
            <Question
                question={"Should I use Freezing Winds or Glacial Fragments in Dungeons?"}
                answer={"I recommend Freezing Winds. Glacial Fragments is terrible for priority damage and is capped at 5 targets, which is a really narrow space to exist in. On any pack where there are 1 or 2 mobs that are the limiting factor you'll want the priority damage from Freezing Winds. And on the bigger pulls where you really need AOE, Glacial Fragments will be capped and most of your damage will be Orb/Blizzard cycles. That said Glacial Fragments absolutely excels at 4-5 targets. If you find that your group doesn’t need boss damage and your tank is pulling mostly 1-2 packs at a time, Glacial Fragments will provide by far the most damage. Another thing to remember is that while spamming Ice Lance with Glacial Fragments is a huge loss in priority damage, Glacial Fragments is still the best legendary at 3-5 targets even when playing normally; which does not concede anywhere near as much priority damage."}
            />
        </div>

        const FAQ_FIRE = <div>
            <Question
                question={"Covenant / Soulbind / Legendary?"}
                answer={"Night Fae / Dreamweaver / Disciplinary Command"}
            />
            <Question
                question={"What does the acronym IB stand for?"}
                answer={"Fire Blast. The spell used to be called Inferno Blast and IB is used to prevent confusion with Fireball."}
            />
            <Question
                question={"Does Fire scale more with stats or crit than other specs?"}
                answer={"No it doesn't. This is incredibly outdated information and hasn't been true for 10 years at this point. Fire does not start expansions relatively weaker and become relatively stronger later, specs do not work like that anymore."}
            />
            <Question
                question={"How does Podtender interact with Cauterize?"}
                answer={"They will not both activate on the same \"death\". If both are available, priority will be given to Cauterize."}
            />
        </div>

        const FAQ_SIMC = <div>
            <Question
                question={"How do I sim syncing cooldowns as Kyrian?"}
                answer={"apl_variable.always_sync_cooldowns=1"}
            />
            <Question
                question={"How do I sim Focus Magic trade?"}
                answer={"mage.focus_magic_trade=1"}
            />
            <Question
                question={"How do I sim Shifting Power without the damage?"}
                answer={"override.spell_data=effect.815217.sp_coefficient=0"}
            />
        </div>


        const FAQ_ALL = <div>
            <h2>Arcane:</h2>
            {FAQ_ARCANE}
            <h2>Fire:</h2>
            {FAQ_FIRE}
            <h2>Frost:</h2>
            {FAQ_FROST}
            <h2>General:</h2>
            {FAQ_GENERAL}
            <h2>Simc:</h2>
            {FAQ_SIMC}
        </div>

        let QUESTIONS_TO_RENDER

        switch (this.state.selected) {
            case "All":
                QUESTIONS_TO_RENDER = FAQ_ALL
                break;
            case "General":
                QUESTIONS_TO_RENDER = FAQ_GENERAL
                break;
            case "Arcane":
                QUESTIONS_TO_RENDER = FAQ_ARCANE
                break;
            case "Frost":
                QUESTIONS_TO_RENDER = FAQ_FROST
                break;
            case "Fire":
                QUESTIONS_TO_RENDER = FAQ_FIRE
                break;
            case "Simc":
                QUESTIONS_TO_RENDER = FAQ_SIMC
                break;
            default:
                QUESTIONS_TO_RENDER = FAQ_ALL
                break;

        }

        return (


            <div>
                {buttons}
                <div className={"faq-div"}>
                {QUESTIONS_TO_RENDER}
                </div>
            </div>

        )
    }

    changeSelection(value: string) {
        setQueryParam("type", value)
        this.setState({
            selected: value
        })
    }

}