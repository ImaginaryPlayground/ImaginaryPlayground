import '../css/christmas.css'

const Christmas = () => {
    return(<div className='christmas'>

    <iframe
        title="배경음악"
        src="/assets/audio/christmas/christmas.mp3"
        allow="autoplay;"
        className="audio"
      ></iframe>

        {/* 크리스마스 트리 */}
        <img src="/assets/christmas/star.png" alt="" className='tree-star'/>
        {/* <img src="/assets/christmas/ornament.png" alt="" className='ornament'/> */}
        <img src="/assets/christmas/tree.png" alt="" className='christmastree'/>
        <img src="/assets/christmas/hill.png" alt="" className='christmashill'/>
        <img src="/assets/christmas/rudolph.png" alt="" className='rudolph'/>


        {/* 배경 */}
        <div class="snow">
        </div>
        <div className='christmas-background'></div>
    </div>)
}

export default Christmas