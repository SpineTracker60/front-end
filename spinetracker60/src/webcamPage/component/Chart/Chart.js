import { motion } from "framer-motion";
import style from "./Chart.module.css"

function Chart(){

    return(
        <div className={style.frameDiv}>
            <p className={style.dashboard2}>대시보드</p>
            <img src="/img/dashboard.png" className={style.dashboard}></img>
        </div>
        
    )
}

export default Chart;