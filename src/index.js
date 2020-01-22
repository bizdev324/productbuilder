//--------------
// UTILITIES
//--------------

        import $ from "jquery";
        import * as dat from "dat.gui";
        import { ResizeObserver } from 'resize-observer';
        import { WEBGL } from 'three/examples/jsm/WebGL';

//--------------
// THREEJS
//--------------

    // MATH
        import {Vector2, Vector3} from "three";

    // 3D and OBJECTS
        import {Scene, Object3D, Box3, Mesh, Plane, BoxGeometry, SphereGeometry, BoxHelper, Texture} from "three";
        import {HemisphereLight, AmbientLight, PointLight} from "three";
        import {MeshStandardMaterial, MeshBasicMaterial, MeshNormalMaterial, Color, RepeatWrapping} from "three";

    // RENDERERS
        import {PerspectiveCamera, OrthographicCamera} from "three";
        import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
        import {WebGLRenderer} from "three/src/renderers/WebGLRenderer"
        import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
        import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
        import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";

    // FILE HANDLERS
        import {LoadingManager} from "three/src/loaders/LoadingManager";
        import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
        import {TextureLoader} from "three/src/loaders/TextureLoader";
        import {ColladaExporter} from "three/examples/jsm/exporters/ColladaExporter";
        import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
        // import {ColladaExporter, GLTFExporter} from "three";
        import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";

        import {ZipLoader} from 'three-ziploader/src/ZipLoader';

        // import {createBackground} from "three-vignette-background"
// ----------------------------------------------------------------------------------------------------

// var background = new VignetteBackground({
//     colors:['#f2f2f2','#ccc'],
//     scale: new Vector2(1.5, 1.5),
//     offset:new Vector2(-0.25,0.25),
//     grainScale: 0.001 
// });

var int = setInterval(check, 500);

const createVignetteBackground = require('three-vignette-background');

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function check(){

        if (checkElement('scene3d')==true) {

            if ( WEBGL.isWebGLAvailable() ) {

                int = window.clearInterval(int);
                console.log("scene ready, browser supports webGL");
                main();

            } else {

                var warning = WEBGL.getWebGLErrorMessage();
                console.log("browser does not support webGL. ERROR message : " + warning);
                var element = document.getElementById('scene3d');
                element.parentNode.removeChild(element);

            }

        } else {

            console.log("waiting...");

        }

}

function checkElement(id) {
   return (document.getElementById(id))? true : false;
}





function main() {

const VERTEX = require("./vertex.glsl");
const FRAGMENT = require("./fragment.glsl");

var scene3d = document.getElementById("scene3d");
var viewWidth = document.getElementById("scene3d").offsetWidth;
var viewHeight = document.getElementById("scene3d").offsetHeight;
var measurementContainer = document.getElementById("measurement-container");
var guiContainer = document.getElementById("gui-container");
measurementContainer.style.position = "absolute";
measurementContainer.style.width = "inherit";
measurementContainer.style.height = "inherit";
measurementContainer.style.overflow = "hidden"
measurementContainer.style.zIndex = 1000;
guiContainer.style.position = "absolute";
guiContainer.style.width = "inherit";
guiContainer.style.height = "inherit";
guiContainer.style.zIndex = 3;

const resolution = new Vector2(viewWidth, viewHeight);

const ro = new ResizeObserver(entries => {
    // for (let entry of entries) {
        var el = document; // This can be your element on which to trigger the event
        var event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        el.dispatchEvent(event);
        if (camera)
            camera.updateProjectionMatrix();

    // }
});
ro.observe(scene3d);

const drawShader = {
    uniforms: {
        tDiffuse: { type: 't', value: null },
        iResolution: { type: 'v2', value: resolution },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
};

var convert = 1000/25.4;
var xhReq = new XMLHttpRequest();
var json;
var allLoaded = false;
var stillLoading = false;
var NUMBER_LOADED = 0;
var LOADED_NEEDED = 0;

var allTextureLoaded = false;
var nesting = false;

var prevJson, differenceJson;
var keepView = false;

// HTML LOADING DISPLAY -----------------------------------------------

var progressBar = document.createElement('div');
var progress = document.createElement('div');
var loadingBackground = document.createElement('div');

progress.id = 'progress';
progressBar.id = 'progressBar';
loadingBackground.id = 'loadingBackground';

loadingBackground.style.position = "absolute";
loadingBackground.style.width = "inherit";
loadingBackground.style.height = "inherit";
// loadingBackground.style.backgroundColor = "#cccccc";
loadingBackground.style.opacity = 1;
loadingBackground.style.zIndex = 1000;
loadingBackground.style.transitionDuration = "0.5s";
scene3d.appendChild(loadingBackground);
progress.appendChild(progressBar);
scene3d.appendChild(progress);

progress.style.position = "relative";
progress.style.transform = "translate(-50%, -50%)";
progress.style.transitionDuration = "0.25s";
progress.style.top = "50%";
progress.style.left = "50%";
progress.style.alignContent = "center";
progress.style.width = "200px";
progress.style.height = "15px";
progress.style.background = "#000";
progress.style.opacity = 0.5;
progress.style.border = "2px solid #000";
progress.style.borderRadius = "10px";
progress.style.zIndex = 1;

progressBar.style.transitionDuration = "0.25s";
progressBar.style.width = "200px";
progressBar.style.height = "15px";
progressBar.style.background = "white";
progressBar.style.opacity = 1;
progressBar.style.border = "none";
progressBar.style.borderRadius = "10px";
progressBar.style.zIndex = 2;

progress.style.opacity = 0;
progressBar.style.opacity = 0;
loadingBackground.style.opacity = 0;

var timeoutAR;

if (window.mobilecheck() == true) {
    window.addEventListener("touchstart", function() {
        timeoutAR = setTimeout(viewInAR, 5000);
    })

    window.addEventListener("touchend", function() {
        clearTimeout(timeoutAR);
    })
}

// LOADERS -------------------------------------------------------------

var manager = new LoadingManager();

manager.onStart = function () {
    allAssetsLoading();
};

manager.onProgress = function ( item, loaded, total ) {

    progressBar.style.transitionDuration = "0.2s";
    progressBar.style.width = (loaded / total * 100) + '%';
};

manager.onLoad = function () {

    if (allLoaded == true) {
        // allLoadedAdjustments();
    }
};

function allLoadedAdjustments() {

    console.log("adjustments")

    if (modes.drafting == false) {
        updateToStandardMaterials();
    } else {
        updateToNormalMaterials();
    }

    updateObjects();

    setTimeout(allAssetsLoaded, 250);
    if (keepView == false) {
        checkSettings();
    }
    addLighting();
    checkVignette();

    var texts = document.getElementsByClassName("measurementDisplay");
    for(var i = 0; i < texts.length; i++) {
        texts[i].style.position = "absolute";
        texts[i].style.zIndex = 25;
        texts[i].style.backgroundColor = "rgba(255,255,255,0.3)";
        texts[i].style.color = "black";
        texts[i].style.fontFamily = "arial";
        texts[i].style.fontWeight = "normal";
        texts[i].style.fontStyle = "italic";
        texts[i].style.fontSize = "15px";
    }   
}

function allAssetsLoaded() {
    loadingBackground.style.transitionDuration = "0.25s";
    progressBar.style.transitionDuration = "0.25s";
    progress.style.transitionDuration = "0.25s";
    loadingBackground.style.opacity = 0;
    progressBar.style.opacity = 0;
    progress.style.opacity = 0;
}

function allAssetsLoading() {
    loadingBackground.style.transitionDuration = "0s";
    progressBar.style.transitionDuration = "0s";
    progress.style.transitionDuration = "0s";
    loadingBackground.style.opacity = 1;
    progressBar.style.opacity = 1;
    progress.style.opacity = 1;
}

var textureManager = new LoadingManager();

textureManager.onLoad = function() {
    loadData();
}

var loader = new GLTFLoader(manager);

DRACOLoader.setDecoderPath('https://utilities.bocklighting.com/js/');
DRACOLoader.setDecoderConfig({type: 'js'});
DRACOLoader.getDecoderModule();

var dracoLoader = new DRACOLoader();
loader.setDRACOLoader(dracoLoader);
var textureLoader = new TextureLoader(textureManager);

// MEASUREMENT DISPLAY -------------------------------------------------

var box, bbox;
var width, height, depth;
var widthText, heightText, depthText;
var widthTextPos, heightTextPos, depthTextPos;
var widthTextPoint, heightTextPoint, depthTextPoint;
var font;
var shrinkAdjustment;

// NORMAL RENDERER -----------------------------------------------------

var renderer = new WebGLRenderer( { antialias: true, alpha:true } );
renderer.setClearColor( 0xffffff , 0 );
renderer.setSize( viewWidth, viewHeight );
renderer.gammaOutput = true;
renderer.gammaFactor = 1;
renderer.physicallyCorrectLights = true;

// DRAFTING RENDERER ---------------------------------------------------

scene3d.appendChild( renderer.domElement );
var scene = new Scene();

var vignetteBackground = createVignetteBackground();

var camera;
var cameraH;
var originalAspect;
var ortho = false;
var modes = {
    boundingBox : true,
    drafting : false
}

var controls;

changeToPerspectiveCamera();
controls.enableRotate = true;
camera.position.set(0,0,10);
var orthoCorrection = 1;

var gui = new dat.GUI({ autoplace:false, width:175 });
var options = {
    perspective : function() {
        perspectiveView();
    },
    orthogonal : function() {
        orthogonalView();
    },
    top: function() {
        topView();
    },
    left: function() {
        leftView();
    },
    right: function() {
        rightView();
    },
    front: function() {
        frontView();
    },
    download: function() {
        downloadAssets();
    },
    AR_view: function() {
        viewInAR();
    }
}

var viewType = gui.addFolder('View Mode');
viewType.add(options, 'perspective');
viewType.add(options, 'orthogonal');

var viewDirection = gui.addFolder('View Direction');
viewDirection.add(options, 'top');
viewDirection.add(options, 'left');
viewDirection.add(options, 'right');
viewDirection.add(options, 'front');

var renderMode = gui.addFolder('Render Mode');

renderMode.add(modes, 'boundingBox').onChange(function(val) {
    changeMeasurementView(val);
});

renderMode.add(modes, 'drafting').onChange(function(val) {
    if (val == false) {
        updateToStandardMaterials();
    } else if (val == true) {
        updateToNormalMaterials();
    }
});

gui.add(options, 'download');

gui.add(options, 'AR_view');

gui.hide();
gui.domElement.id = 'gui';

gui.domElement.style.float = "left";
gui.domElement.style.zIndex = "5";

var guiContainer = document.getElementById('gui-container');
guiContainer.appendChild(gui.domElement);

var viewSize = 10;
var aspectRatio = viewWidth / viewHeight;
var anchor;
var composer;

composer = new EffectComposer( renderer );
var renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );
var pass = new ShaderPass(drawShader);
pass.renderToScreen = true;
composer.addPass(pass);

var target = document.getElementById('threejsjson');
var observer = new MutationObserver(function(mutations) {

    allLoaded = false;
    if (widthText != undefined) {
        widthText.parentNode.removeChild(widthText);                
        heightText.parentNode.removeChild(heightText);                
        depthText.parentNode.removeChild(depthText);
    }
    while (scene.children.length){
        var meshCheck = scene.children[0];
        meshCheck.traverse((node)=> {
            if (node.isMesh) {
                window[node.uuid] = null;
            }
        });
        scene.remove(scene.children[0]);
    }

    if (scene3d == null) return;


    mutations.forEach(function(mutation) {
        prevJson = JSON.parse(mutation.oldValue);
    });

    $(document).ready(function() {
        json = $.parseJSON($("#threejsjson").html());
        if (prevJson != undefined) {


            differenceJson = getDiff(json, prevJson);
            if (differenceJson.settings != null) {
                keepView = false;
            } else {
                keepView = true
            }
            checkJSONChildren(differenceJson.children);
        }

        if (json != null) {
            getMaterials();
            // checkVignette();
        }
    });
});

var config = {attributes: true, childList: true, subtree: true, characterData: true, characterDataOldValue: true};
observer.observe(target, config);

function checkJSONChildren(children) {
    if (children != null) {
        for (var i = 0; i < children.length; i++) {
            if (children[i].type != null) {
            }
            if (children[i].finish != null) {
            }
            checkJSONChildren(children[i].children);
        }
    }
}

var assetBase64;
var mixedReality;

init();
animate();
window.addEventListener( 'resize', onWindowResize, false );

(function () {
    $(window).resize(function () {
        onWindowResize();
    });
    onWindowResize();
}());

/// ----------------------------------------------------------------
/// CANVAS HANDLER
/// ----------------------------------------------------------------

function init() {

    loadingBackground = document.getElementById("loadingBackground");
    progressBar = document.getElementById("progressBar");
    progress = document.getElementById("progress");
    controls.update();

    var firstJson = $('#threejsjson').contents().filter(function(){
      return this.nodeType === 3 && $.trim(this.nodeValue) !== '';
    }).text();

    var checkJson = IsJsonString(firstJson);

    if (checkJson) {
        $(document).ready(function() {
            json = $.parseJSON($("#threejsjson").html());
            if (prevJson != undefined) {
                differenceJson = getDiff(json, prevJson);
                if (differenceJson.settings != null) {
                    keepView = false;
                } else {
                    keepView = true;
                }
                checkJSONChildren(differenceJson.children);
            }
            if (json != null) {
                getMaterials();
            }
        });
    }

    // var geometry = new BoxGeometry( 0.1, 0.1, 0.1 );
    // var material = new MeshStandardMaterial( {color: 0x00ff00} );
    // var cube = new Mesh( geometry, material );
    // cube.position.set(0,0,0);
    // scene.add( cube );

}

function IsJsonString(str) {
  try {
    var json = JSON.parse(str);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}

function animate() {

    if (scene3d == null) return;

    controls.update();
    updateMeasurementPositions();
    checkDraftingView();
    requestAnimationFrame( animate );
    viewWidth = document.getElementById("scene3d").offsetWidth;
    viewHeight = document.getElementById("scene3d").offsetHeight;
}


function onWindowResize(){
    viewWidth = document.getElementById("scene3d").offsetWidth;
    viewHeight = document.getElementById("scene3d").offsetHeight;
    if (ortho == true) {
        var aspect = viewWidth / viewHeight;
        var change = originalAspect / aspect;
        originalAspect = aspect;
        var newSize = viewSize * change;
        camera.left = -aspect * newSize / 2;
        camera.right = aspect * newSize  / 2;
        camera.top = newSize / 2;
        camera.bottom = -newSize / 2;
        camera.updateProjectionMatrix();
        composer.setSize( viewWidth, viewHeight );
        renderer.setSize( viewWidth, viewHeight );
    } else {
        camera.aspect = viewWidth / viewHeight;
        camera.updateProjectionMatrix();
        composer.setSize( viewWidth, viewHeight );
        renderer.setSize( viewWidth, viewHeight );   
    }
}

/// ----------------------------------------------------------------
/// JSON TO GLTF
/// ----------------------------------------------------------------

function loadData() {

    NUMBER_LOADED = 0;
    LOADED_NEEDED = 0;
    shrinkAdjustment = 0;

    traverseJSON(json);
    addAnchor();
    traverseJSONObjects(json.children[0], anchor, true, 0);

}

function traverseJSON(object) {

    for (var key in object) {

        if (key == "type") {

            LOADED_NEEDED += 1;

        }

        if (key == "shrunk") {

            if (object[key] != 0) {

            }

        }

        if (key == "children") {

            for (var i = 0; i < object[key].length; i++) {

               traverseJSON(object[key][i]);

            }
        }

    }
}

function addAnchor() {
    anchor = new Object3D();
    anchor.scale.set(10, 10, 10);
    anchor.rotation.set(-Math.PI/2,0,0);
    anchor.name = "anchor";
    scene.add(anchor);
}

function traverseJSONObjects(jsonNode, parent, last, shrinking) {

    var node = jsonNode;
    var filePath = jsonNode.type;

// LOAD MODEL

    var file = eval("json.model." + String(filePath));

    if (file != undefined) {

        if (file.url_base64 != null) {

            loadModelBase64(file.url_base64, node, parent, last, shrinking);
        
        } else {
            
            loadModel(file.url, node, parent, last, shrinking);
        }

    }



// TRAVERSE THROUGH FUNCTION

    // if (filePath == "_") {
    // if (node.children != null) {
    //     for (var i = 0; i < node.children.length; i++) {
    //         if (node.children[i].type != null) {
    //             if (i == node.children.length - 1) {
    //                 _last = true;
    //             } else {
    //                 _last = false;
    //             }

    //             if (last == false) _last = false;   

    //             console.log(last, _last, filePath);
    //             console.log(node.children[i])             
    //             traverseJSONObjects(node.children[i], mesh, _last);
    //         }
    //     }
    // } else {
    //     if (last) allLoaded = true;
    // }
}


function loadModel(url, children, parent, last, shrinking) {

    new Promise( function( resolve, reject ) {
        if ( url.match( /\.zip$/ ) ) {

            new ZipLoader().load( url ).then( function( zip ) {

                manager.setURLModifier( zip.urlResolver );

                resolve( zip.find( /\.(gltf|glb)$/i )[ 0 ] );

            } );

        } else {

            resolve( url );

        }


    } ).then( function ( file ) {

        loader.load(

            file,
            function ( gltf) {
                load3DAssets(gltf, children, parent, last, shrinking );
            }  
        );
    });
}

function loadModelBase64(base64, children, parent, last, shrinking) {
    
    var b64 = base64ToArrayBuffer(base64);

    loader.parse(b64, null, function(gltf) {

        load3DAssets(gltf, children, parent, last, shrinking);

    });

}

function load3DAssets(gltf, children, parent, last, shrinking) {

    var mesh;
    mesh = gltf.scene.children[0];
    var container = new THREE.Group();
    var nextShrink;

    if(mesh.type == "Object3D" || mesh.type == "Mesh" || mesh.type == "Group") {
        
        if (children.shrunk != 100) {

            var shrunk = children.shrunk/100;
            parent.add(mesh);
            mesh.add(container);
            shrinkObject(mesh, container, shrunk); 
            nextShrink = shrunk;


            var sbox = new Box3().setFromObject(mesh);

            var shrinkAmt = Math.abs(sbox.max.y - sbox.min.y) * ((1-shrunk)/ shrunk);

            shrinkAdjustment += shrinkAmt * convert / 10;
            
            // ADD CLIPPING

            var bX = Math.abs(sbox.max.x - sbox.min.x);
            var bZ = Math.abs(sbox.max.z - sbox.min.z);

            var clipGeometry = new BoxGeometry(0.05, 0.05, 0.025);
            var clipMaterial = new MeshBasicMaterial( {
                color:0x00ff00,
            });

            var clipBox = new Mesh(clipGeometry, clipMaterial);
            clipBox.name = "clipping";

            var clipBoxAdj = Math.abs(sbox.max.y - sbox.min.y) * convert / 1000;

            clipBox.position.set(0,0, clipBoxAdj);
            parent.add(clipBox);


        } else {
            parent.add(mesh);
            nextShrink = 0;
        }

        if (shrinking > 0) {
            mesh.position.set(
                children.x/convert,
                children.z/convert,
                children.y/convert*shrinking)

        } else {
            mesh.position.set(
                children.x/convert,
                children.z/convert,
                children.y/convert);
        }

        mesh.rotation.set(0,0,0);


        var rotateX = mesh.rotation.x;
        var rotateY = mesh.rotation.y;
        var rotateZ = mesh.rotation.z;
        if (children.rx != 0) {
            rotateX += 90 - children.rx;
        }
        if (children.ry != 0) {
            rotateY += 90 - children.ry;
        }
        if (children.rz != 0) {
            rotateZ += 90 - children.rz;
        }
        mesh.rotation.set(
            THREE.Math.degToRad( rotateX ),
            THREE.Math.degToRad( rotateZ ),
            THREE.Math.degToRad( rotateY ));

        mesh.traverse((node) => {
            if(node.isMesh) {
                if (["mat1", "mat2", "mat3"].some(a => a === node.material.name)) {
                    if (children.finish != null) {
                        if (eval("children.finish." + node.material.name) != null) {
                            var materialName = eval("children.finish." + node.material.name);

                            node.material.color.setHex(0xffffff);
                            if(window[materialName] != null) {
                                var box = new Box3().setFromObject( node );

                                var boxSize = Math.abs(box.max.x * box.max.y * box.max.z);
                                boxSize = Math.cbrt(boxSize) * convert;

                                var textureClone = window[materialName];
                                var normalClone = window[materialName + "_normal"];

                                if (normalClone != null) {
                                    node.material.normalMap = normalClone;
                                }

                             
                                node.material.map = textureClone;
                                node.material.needsUpdate = true;
                                window[node.uuid] = node.material;


                            }   
                        }
                        // else if (node.material.name === "mat3") {
                        //     if (eval("children.finish.mat3") != null) {
                        //     } else {
                        //         node.material.map = window[eval("children.finish.mat1")];
                        //         window[node.uuid] = node.material;
                        //         node.material.needsUpdate = true;
                        //     }
                        // }
                    }
                } else {
                    window[node.uuid] = node.material;
                }
            }    
        });

        var _last;


        if (children.children != undefined) {
            allLoaded = false
            for (var i = 0; i < children.children.length; i++) {
                if (children.children[i].type != null) {
                    if (i == children.children.length - 1) {
                        _last = true;
                    } else {
                        _last = false;
                    }

                    if (last == false) _last = false;   

                    if (children.shrunk != 100) {
                       traverseJSONObjects(children.children[i], container, _last, nextShrink);
                    } else {
                       traverseJSONObjects(children.children[i], mesh, _last, nextShrink);

                    }


                }
            }

        } else {


            if (last == true && children.children == undefined) {
                allLoaded = true;

            }
        }
    }


    NUMBER_LOADED += 1;

    if (NUMBER_LOADED == LOADED_NEEDED) {
        allLoaded = true;
        allLoadedAdjustments();
    }

}



/// ----------------------------------------------------------------
/// MATERIAL & ENVIRONMENTS
/// ----------------------------------------------------------------


function getMaterials() {

    if (json.finish == null) {
        
        loadData();

    } else {

        var now = 0;
        var length = Object.keys(json.finish).length;

        for (var name in json.finish) {

            if (json.finish.hasOwnProperty(name)) {

                let materialUrl = json.finish[name].url;
                let normalUrl = json.finish[name].normalUrl;
                
                let material64 = json.finish[name].url_base64;
                let normal64 = json.finish[name].normalUrl_base64;

                if (materialUrl == null && normalUrl == null && material64 != null && normal64 != null) {
                    
                    var mat64 = 'data:image/png;base64,' + material64;
                    var nor64 = 'data:image/png;base64,' + normal64;

                    loadMaterials(mat64, nor64, name);
                    // now++;

                    // if (now == length) {
                    //     loadData();
                    // }

                } else {

                    loadMaterials(materialUrl, normalUrl, name);

                }

            }

        }

    }

}

function loadMaterialBase64(fileSrc, normalFileSrc, name) {


    var textureImage = new Image();
    // fileSrc = 'data:image/png;base64,' + fileSrc;
    textureImage.src = 'data:image/png;base64,' + fileSrc;
    var texture = new Texture();

    var textureMap = texture;
    textureMap.name = name;
    textureMap.flipY = false;
    textureMap.wrapS = RepeatWrapping;
    textureMap.wrapT = RepeatWrapping;
    textureMap.repeat.set(2, 2);
    window[textureMap.name] = textureMap;
    textureMap.image = textureImage;
    textureImage.onload = () =>  {

        anchor.traverse(function(node) {
            if (node instanceof Object3D && node.material != null) {
                console.log(node);
                node.material.needsUpdate = true;
            }
        })

    };


    var normalImage = new Image();
    // normalFileSrc = 'data:image/png;base64,' + fileSrc;
    normalImage.src = 'data:image/png;base64,' + normalFileSrc;

    var normalTexture = new Texture();
    var normalMap = normalTexture;
    normalMap.name = name + "_normal"
    normalMap.flipY = false;
    normalMap.wrapS = RepeatWrapping;
    normalMap.wrapT = RepeatWrapping;
    normalMap.repeat.set(2, 2);
    window[normalMap.name] = normalMap;
    normalMap.image = normalImage;
    normalImage.onload = () =>  { 

        anchor.traverse(function(node) {
            if (node instanceof Object3D && node.material != null) {
                console.log(node);
                node.material.needsUpdate = true;
            }
        })

    };

}

function loadMaterials(filePath, normalFilePath, name) {
    textureLoader.load(filePath, 
        function (texture)  {
            var textureMap = texture;
            textureMap.name = name;
            textureMap.flipY = false;
            textureMap.wrapS = RepeatWrapping;
            textureMap.wrapT = RepeatWrapping;
            textureMap.repeat.set(2, 2);
            window[textureMap.name] = textureMap;
        }
    )

    if (normalFilePath != null) {
        textureLoader.load(normalFilePath,
            function (texture) {
                var normalMap = texture;
                normalMap.name = name + "_normal"
                normalMap.flipY = false;
                normalMap.wrapS = RepeatWrapping;
                normalMap.wrapT = RepeatWrapping;
                normalMap.repeat.set(2, 2);
                window[normalMap.name] = normalMap;
            }
        )
    }
}

function updateToStandardMaterials() {

    for (var j = 0; j < anchor.children.length; j++) {
        var objects = anchor.children[j];
        if (objects.name != "clipping") {
            objects.traverse((node) => {
                if(node.isMesh) {
                    if (window[node.uuid] != null) {
                        node.material = window[node.uuid];
                    } else {
                        node.material = new MeshStandardMaterial({color:0xffffff});
                    }
                    node.material.needsUpdate = true;
                }    
            });
        }
    }
}

function updateToNormalMaterials() {

    if (anchor.children[0].children != null) {
        var objects = anchor.children[0].children;
        if (objects.name != "clipping") {
            for (var i = 0; i < objects.length; i++) {
                objects[i].traverse((node)=> {
                    if(node.isMesh) {
                        node.material = new MeshNormalMaterial();
                        node.material.needsUpdate = true;
                    }
                });
            }
        }
    }  
}

function applyEnv(mesh) {

    mesh.traverse((node) => {
        if (node.isMesh) {
            node.material.envMap = textureCube;
            node.material.envMapIntensity = 1;
        };
    });

}

function addLighting() {
    var ambient = new HemisphereLight( 0xffffff, 0x080820, 2 );
    scene.add( ambient );
    var light = new AmbientLight( 0xffffff, 1 );
    scene.add( light );
    var light2 = new PointLight( 0xffffff, 2, 100 );
    light2.position.set( 5, 5, 5 );
    scene.add( light2 );
}


///------------------------------------------------------------------------------
/// MEASUREMENT DISPLAY
///------------------------------------------------------------------------------

function updateObjects() {
    createBoundingBox();
    measureBoundingBox();
    box.update();
}

function shrinkObject(object, container, amount) {
    object.scale.z = amount;
    container.scale.z = 1/amount;
}

function createBoundingBox() {
    bbox = new Box3().setFromObject(anchor);
    box = new BoxHelper( anchor, 0xcccccc );
    scene.add(box);
}

function measureBoundingBox() {

    var widthJs = Math.abs(bbox.max.x - bbox.min.x);
    var heightJs = Math.abs(bbox.max.y - bbox.min.y);
    var depthJs = Math.abs(bbox.max.z - bbox.min.z);

    width = (widthJs * convert / 10).toFixed(2);
    height = (heightJs * convert / 10).toFixed(2);
    depth = (depthJs * convert / 10).toFixed(2);

    var wpos = bbox.min.x + (bbox.max.x - bbox.min.x)/2;
    var hpos = bbox.min.y + (bbox.max.y - bbox.min.y)/2;
    var dpos = bbox.min.z + (bbox.max.z - bbox.min.z)/2;

    var wOffset = (bbox.max.x - bbox.min.x)/2;
    var hOffset = (bbox.max.y - bbox.min.y)/2;
    var dOffset = (bbox.max.z - bbox.min.z)/2;

    var xOffset = bbox.min.x - widthJs/2;
    var yOffset = bbox.min.y - heightJs/2;

    widthTextPoint = new Object3D();
    heightTextPoint = new Object3D();
    depthTextPoint = new Object3D();

    var wtPosition = new Vector3(bbox.min.x, bbox.max.y - hOffset, bbox.max.z);
    var htPosition = new Vector3(bbox.min.x - wOffset, hpos - hOffset, bbox.max.z);
    var dtPosition = new Vector3(bbox.max.x - wOffset, bbox.max.y - hOffset, dpos);
    
    var anchorOffset = new Vector3(-widthJs/2, -heightJs/2, 0);

    anchor.position.set(-bbox.min.x, -bbox.min.y, -bbox.min.z);
    anchor.position.x -= widthJs/2;
    anchor.position.y -= heightJs/2;
    anchor.position.z -= depthJs/2;
    
    wtPosition.sub(anchorOffset);
    htPosition.sub(anchorOffset);
    dtPosition.sub(anchorOffset);

    wtPosition.divideScalar(10);
    htPosition.divideScalar(10);
    dtPosition.divideScalar(10);

    var axis = new Vector3( 1, 0, 0 );
    var angle = Math.PI / 2;
    wtPosition.applyAxisAngle( axis, angle );
    htPosition.applyAxisAngle( axis, angle );
    dtPosition.applyAxisAngle( axis, angle );

    widthTextPoint.position.copy(wtPosition);
    heightTextPoint.position.copy(htPosition);
    depthTextPoint.position.copy(dtPosition);

    anchor.add( widthTextPoint );
    anchor.add( heightTextPoint );
    anchor.add( depthTextPoint );

    displayMeasurement();
    cameraH = 10 + height/15;
}

function displayMeasurement() {


    if (shrinkAdjustment > 0) {
        height = parseFloat(height) + shrinkAdjustment;
    }

    var wFrac = (Math.round(width * 4) / 4).toFixed(2);
    var hFrac = (Math.round(height * 4) / 4).toFixed(2);
    var dFrac = (Math.round(depth * 4) / 4).toFixed(2);

    widthText = document.createElement('div');
    widthText.className = "measurementDisplay";
    widthText.innerHTML = String("w:" + wFrac);
    measurementContainer.appendChild(widthText);
    heightText = document.createElement('div');
    heightText.className = "measurementDisplay";

    if (shrinkAdjustment > 0) {
        heightText.innerHTML = String("h:" + hFrac + " [clipped]");
    } else {
        heightText.innerHTML = String("h:" + hFrac);
    }

    measurementContainer.appendChild(heightText);
    depthText = document.createElement('div');
    depthText.className = "measurementDisplay";
    depthText.innerHTML = String("d:" + dFrac);
    measurementContainer.appendChild(depthText);
}

function updateMeasurementPositions() {
    if (widthTextPoint != null) {
        var wscreen = toScreenPosition(widthTextPoint);
        widthText.style.left = String(wscreen.x) + 'px';
        widthText.style.top = String(wscreen.y) + 'px';

        var hscreen = toScreenPosition(heightTextPoint);
        heightText.style.left = String(hscreen.x) + 'px';
        heightText.style.top = String(hscreen.y) + 'px';

        var dscreen = toScreenPosition(depthTextPoint);
        depthText.style.left = String(dscreen.x) + 'px';
        depthText.style.top = String(dscreen.y) + 'px';

    }
}

function toScreenPosition(obj) {
    var vector = new Vector3();
    var widthHalf = 0.5 * viewWidth;
    var heightHalf = 0.5 * viewHeight;
    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);
    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;
    return { 
        x: vector.x,
        y: vector.y
    };
};

// function adjustCamera(height) {
//     camera.position.set(0,0, 10 + height/5);
//     console.log(camera.position);
// }

///------------------------------------------------------------------------------
/// VIEW AND GUI HANDLER
///------------------------------------------------------------------------------

    function checkSettings() {
        var dimensions = json.settings.dimensions;
        if (dimensions == 1) {
            gui.hide();
            changeMeasurementView(true);
        } else if (dimensions === -1) {
            gui.hide();
            changeMeasurementView(false);
        } else if (dimensions === 0) {
            gui.show();
        }

        var cartoon = json.settings.cartoon;
        if (cartoon == true) {
            modes.drafting = true;
        } else {
            modes.drafting = false;
        }

        var view = json.settings.view;
        if (view == "perspective") {
            perspectiveView();
        } else if (view == "top") {
            orthoTopView();
        } else if (view == "left") {
            orthoLeftView();

        } else if (view == "right") {
            orthoRightView();
        } else if (view == "front") {
            orthoFrontView();
        }


    }

    function checkVignette() {
        var vignette = json.settings.vignette;


        // vignetteBackground = createVignetteBackground({
        //     colors: [vignette.color1, vignette.color2],
        //     scale: [vignette.scale, vignette.scale]
        // });



        if (vignette != undefined && vignette != null) {

            scene.add(vignetteBackground);
            vignetteBackground.style({
                colors: [vignette.color1, vignette.color2],
                scale: [vignette.scale, vignette.scale]
            })

            loadingBackground.style.visibility = "visible";
            loadingBackground.style.backgroundColor = String(vignette.color2);

        } else {

            loadingBackground.style.visibility = "hidden";

        }


        // loadingBackground.style.backgroundColor = "white";
        // scene.background = new Color( 0xffffff, 0 );
        
    }

    function perspectiveView(){
        changeToPerspectiveCamera();
        controls.enableRotate = true;
        ortho = false;
        orthoCorrection = 1;
        camera.position.set(0,0, cameraH);
    }

    function orthogonalView(){
        changeToOrthoCamera();
        controls.enableRotate = true;
        ortho = true;
        orthoCorrection = 10;
        camera.position.set(0,0,10 * orthoCorrection);
    }

    function topView() {
        controls.reset();
        camera.position.set(0,10 * orthoCorrection,0);
    }

    function leftView() {
        controls.reset();
        camera.position.set(0,0,10 * orthoCorrection);
    }

    function rightView() {
        controls.reset();
        camera.position.set(0,0,-10 * orthoCorrection);
    }

    function frontView() {
        controls.reset();
        camera.position.set(10 * orthoCorrection,0,0);
    }

    function changeToOrthoCamera() {
        originalAspect = viewWidth / viewHeight;
        camera = new OrthographicCamera( -aspectRatio * viewSize / 2, aspectRatio * viewSize / 2, viewSize / 2, -viewSize / 2, 0, 1000);
        camera.updateProjectionMatrix();
        controls = new OrbitControls( camera, scene3d );
        controls.screenSpacePanning = true;  
        renderPass = new RenderPass( scene, camera );
        if (composer != null) {
            composer = new EffectComposer( renderer );
            composer.addPass( renderPass );
            pass = new ShaderPass(drawShader);
            pass.renderToScreen = true;
            composer.addPass(pass);
        }   
        onWindowResize();
    }

    function changeToPerspectiveCamera() {
        originalAspect = viewWidth / viewHeight;
        camera = new PerspectiveCamera( 45, viewWidth / viewHeight, 1, 10000 ); 
        camera.updateProjectionMatrix();
        controls = new OrbitControls( camera, scene3d);
        controls.screenSpacePanning = true;
        renderPass = new RenderPass( scene, camera );
        if (composer != null) {
            composer = new EffectComposer( renderer );
            composer.addPass( renderPass ); 
            pass = new ShaderPass(drawShader);
            pass.renderToScreen = true;
            composer.addPass(pass);
        }               
    }

    function changeMeasurementView(val) {
        box.visible = val;
        widthText.visible = val;
        heightText.visible = val;
        depthText.visible = val;
        var display;
        if (val == true) {
            display = "block";
        } else {
            display = "none";
        }
        widthText.style.display = display;
        heightText.style.display = display;
        depthText.style.display = display;
    }

    function checkDraftingView() {
        if (modes.drafting) {
            composer.render(scene, camera);
        } else {
            renderer.render(scene, camera);
        }   
    }

///------------------------------------------------------------------------------
/// MODEL EXPORTER
///------------------------------------------------------------------------------

    var link = document.createElement( 'a' );
    link.style.display = 'none';
    document.body.appendChild( link );

    var mixedRealityAssetLink = document.createElement( 'a' );
    mixedRealityAssetLink.style.display = 'none';
    document.body.appendChild( mixedRealityAssetLink );

    function save( blob, filename ) {
        link.href = window.URL.createObjectURL( blob );
        link.setAttribute = ("download", filename);
        link.click();
    }

    function store( blob, filename ) {
        mixedRealityAssetLink.href = window.URL.createObjectURL( blob );
        mixedRealityAssetLink.setAttribute = ("download", filename);
    }

    function saveString( text, filename ) {
        save( new Blob( [ text ], { type: 'text/plain' } ), filename );
    }

    function storeArrayBuffer( buffer, filename ) {
        store( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );
    }

    function downloadAssets() {
        var exporter = new ColladaExporter();
        var data = exporter.parse( anchor, null );
        saveString(data.data, 'object.dae')
    }

    function viewInAR() {
        var exporterGLB = new GLTFExporter();
        var ARoptions = {
            binary :true,
            truncateDrawRange : false
        };
        exporterGLB.parse(scene, function(result){
            if ( result instanceof ArrayBuffer ) {

                assetBase64 = result;
                
                mixedReality = window.open("https://live.wsamosir.com/bock_lighting_ar/");

            } else {

                var output = JSON.stringify( result, null, 2 );
                
            
            }
        }, ARoptions);
    }


    // Wait until we receive message from AR page
    window.addEventListener('message', function(event){
        // check if the domain is from my server
        if (~event.origin.indexOf('https://live.wsamosir.com')) { 
            if (event.data == "ready") {
                mixedReality.postMessage(assetBase64, "*");
                console.log("GLB is sent!")
            }
        } else { 

            return; 
        } 
            
    })

   function OpenWindowWithPost(url, windowoption, name, params)
   {
            var form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", url);
            form.setAttribute("target", name);
 
            for (var i in params) {
                if (params.hasOwnProperty(i)) {
                    var input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = i;
                    input.value = params[i];
                    form.appendChild(input);
                }
            }
            
            document.body.appendChild(form);
            
            //note I am using a post.htm page since I did not want to make double request to the page 
           //it might have some Page_Load call which might screw things up.
            window.open('', "window", windowoption);
            
            form.submit();
            
            document.body.removeChild(form);
    }
 
    var binArrayToJson = function(binArray)
    {
        var str = "";
        for (var i = 0; i < binArray.length; i++) {
            str += String.fromCharCode(parseInt(binArray[i]));
        }
        return JSON.parse(str)
    }

    function str2ab(str) {
      var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
      var bufView = new Uint16Array(buf);
      for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }

    function base64ToArrayBuffer(base64) {
        var binary_string =  window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    function base64ArrayBuffer(arrayBuffer) {
      var base64    = ''
      var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

      var bytes         = new Uint8Array(arrayBuffer)
      var byteLength    = bytes.byteLength
      var byteRemainder = byteLength % 3
      var mainLength    = byteLength - byteRemainder

      var a, b, c, d
      var chunk

      // Main loop deals with bytes in chunks of 3
      for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63               // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
      }

      // Deal with the remaining bytes and padding
      if (byteRemainder == 1) {
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3)   << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '=='
      } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '='
      }
      
      return base64
    }

///------------------------------------------------------------------------------
/// TO FIND JSON DIFFERENCE
///------------------------------------------------------------------------------

    function getDiff(a, b){
        var diff = (isArray(a) ? [] : {});
        recursiveDiff(a, b, diff);
        return diff;
    }

    function recursiveDiff(a, b, node){
        var checked = [];

        for(var prop in a){
            if(typeof b[prop] == 'undefined'){
                addNode(prop, '[[removed]]', node);
            }
            else if(JSON.stringify(a[prop]) != JSON.stringify(b[prop])){
                // if value
                if(typeof b[prop] != 'object' || b[prop] == null){
                    addNode(prop, b[prop], node);
                }
                else {
                    // if array
                    if(isArray(b[prop])){
                       addNode(prop, [], node);
                       recursiveDiff(a[prop], b[prop], node[prop]);
                    }
                    // if object
                    else {
                        addNode(prop, {}, node);
                        recursiveDiff(a[prop], b[prop], node[prop]);
                    }
                }
            }
        }
    }

    function addNode(prop, value, parent){
            parent[prop] = value;
    }

    function isArray(obj){
        return (Object.prototype.toString.call(obj) === '[object Array]');
    }
}