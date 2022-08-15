import '../css/christmas.css'
import Santa from '../components/christmas/Santa.jsx'
import Tree from '../components/christmas/tree.jsx'
import { useEffect } from 'react';


const Christmas = () => {

  useEffect(() => {
    var canvasNode = document.querySelectorAll("canvas");
    var canvas = Array.prototype.slice.call(canvasNode);
    if (canvas) {
      canvas.forEach(function (element) {
        // element.style.display = 'none'
        if (element.id !== 'santa' && element.id !== 'tree'){ 
          element.remove();
        }
      });
    }
  }, []);

    return(<div className='christmas'>

    <iframe
        title="배경음악"
        src="/assets/audio/christmas/christmas.mp3"
        allow="autoplay;"
        className="audio"
      ></iframe>

      <Santa id={'santa'}></Santa>
      {/* <Tree id={'tree'}></Tree> */}

        {/* 크리스마스 트리 */}
        <img src="/assets/christmas/star.png" alt="" className='tree-star'/>
        <img src="/assets/christmas/ornament.png" alt="" className='ornament'/>
        <img src="/assets/christmas/tree.png" alt="" className='christmastree'/>
        <img src="/assets/christmas/hill.png" alt="" className='christmashill'/>
        <img src="/assets/christmas/rudolph.png" alt="" className='rudolph'/>
        <img src="/assets/christmas/background.png" alt="" className='christmas-background'/>

        {/* 배경 */}
        <div class="snow">
        </div>

        <img src="/assets/map/minimap.png" alt="" className="minimap" 
      onClick={() => (window.location.href = "/")}/>
    </div>)
}

export default Christmas