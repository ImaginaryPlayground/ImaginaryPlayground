import ".././css/jungle.css"

const Jungle = () => {
    return(
        <>
            <div className="jungle">
                {/* 가장 앞 첫번째 구간 */}
                <img src="/assets/jungle/firstHill.png" className="firstHill" />
                <img src="/assets/jungle/firstCeil.png" className="firstCeil" />

                {/* 햇빛 */}
                <img src="/assets/jungle/sun1.png" className="sun1"/>
                <img src="/assets/jungle/sun2.png" className="sun2"/>
                <img src="/assets/jungle/sun3.png" className="sun3"/>

                {/* 두 번째 구간 */}
                <img src="/assets/jungle/secondCeil.png" className="secondCeil" />
                <img src="/assets/jungle/secondHill.png" className="secondHill" />

                {/* 세 번째 구간 */}
                <img src="/assets/jungle/onlyTree.png" className="onlyTree" />
                <img src="/assets/jungle/bird.png" className="bird" />
                <img src="/assets/jungle/palmTree.png" className="palmTree" />

                {/* 배경 */}
                <img src="/assets/jungle/background.png" className="background" />

            </div>
        </>
    )
}

export default Jungle;