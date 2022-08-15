import '../css/christmas.css'
import Santa from '../components/christmas/Santa.jsx'
import Tree from '../components/christmas/tree.jsx'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Christmas = () => {
  const navigate = useNavigate();
  useEffect(() => {

    if(sessionStorage.getItem("isLogin") !== 'true'){
      //만약 로그인 되어있지 않으면 three.js 캐릭터들 모두 삭제 후 로그인 페이지로 이동
      alert('크리스마스 맵은 로그인이 필요합니다!')
      navigate('/login')
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