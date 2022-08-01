import * as THREE from '../three'
import Ocean from '../Ocean';

const Test = () => {
    var camera, scene, renderer;
    var geometry1, material1, mesh1;
    var geometry2, material2, mesh2;
    
    init();
    animate();
    
    function init() {
    
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        camera.position.z = 1;
    
        scene = new THREE.Scene();
    
        geometry1 = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        material1 = new THREE.MeshNormalMaterial();
        mesh1 = new THREE.Mesh( geometry1, material1 );

        geometry2 = new THREE.BoxGeometry( 0.5, 0.1, 0.1 );
        material2 = new THREE.MeshNormalMaterial();
        mesh2 = new THREE.Mesh( geometry2, material2 );

        scene.add( mesh1 );
        scene.add( mesh2 );
    
        renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
    
    }
    
    function animate() {
    
        requestAnimationFrame( animate );
    
        mesh1.rotation.x += 0.01;
        mesh1.rotation.y += 0.02;

        mesh2.rotation.x += 0.07;
        mesh2.rotation.y += 0.06;
    
        renderer.render( scene, camera );
    
    }
    return(
        <>
        
    <img src="/assets/ocean/cliff1.png" className="cliff1" />
    <img src="/assets/ocean/cliff2.png" className="cliff2" /> 

    <img src="/assets/ocean/fish.png" className="fish" /> 
    <img src="/assets/ocean/whale.png" className="whale" /> 
    <img src="/assets/ocean/trashfish.png" className="trashfish" /> 

    <img src="/assets/ocean/sun1.png" className="sun1" />
    <img src="/assets/ocean/sun2.png" className="sun2" />
    <img src="/assets/ocean/sun3.png" className="sun3" />
    <img src="/assets/ocean/sun4.png" className="sun4" />
    <img src="/assets/ocean/sun5.png" className="sun5" />

    <img src="/assets/ocean/yellow.png" className="yellow" />
    <img src="/assets/ocean/red.png" className="red" />
    <img src="/assets/ocean/rainbow.png" className="rainbow" />
    <img src="/assets/ocean/blueleaf3.png" className="blueleaf3" />
    <img src="/assets/ocean/blueleaf2.png" className="blueleaf2" />
    <img src="/assets/ocean/blueleaf1.png" className="blueleaf1" />
    <img src="/assets/ocean/cucumber.png" className="cucumber" />
    <img src="/assets/ocean/pink.png" className="pink" />
    <img src="/assets/ocean/cactus.png" className="cactus" /> 

    <img src="/assets/ocean/bubble1.png" className="bubble1" />
    <img src="/assets/ocean/bubble2.png" className="bubble2" />
    <img src="/assets/ocean/bubble3.png" className="bubble3" />

    <img src="/assets/ocean/background.png" className="background" />
        </>
    )
}

export default Test;