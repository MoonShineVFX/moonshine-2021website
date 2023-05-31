import { useEffect, useRef } from "react";
import { Engine, Scene,DefaultLoadingScreen} from "@babylonjs/core";

export default ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest}) => {
  const reactCanvas = useRef(null);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    const scene = new Scene(engine, sceneOptions);
 		// scene.debugLayer.show();
		DefaultLoadingScreen.prototype.displayLoadingUI = function () {
			if (document.getElementById("customLoadingScreenDiv")) {
					// Do not add a loading screen if there is already one
					document.getElementById("customLoadingScreenDiv").style.display = "flex";
					return;
			}
			this._loadingDiv = document.createElement("div");
			this._loadingDiv.id = "customLoadingScreenDiv";
			this._loadingDiv.innerHTML = `<div><img src="sources/loading.gif" alt=""/></div><div>模型讀取中..</div>`;
			var customLoadingScreenCss = document.createElement('style');
			customLoadingScreenCss.type = 'text/css';
			customLoadingScreenCss.innerHTML = `
			#customLoadingScreenDiv{
					color: white;
					font-size:50px;
					text-align:center;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size:1rem;
					width:100%;
					height:100vh;
					flex-direction: column;
			}
			#customLoadingScreenDiv div img{
				width:50px;
			}
			`;
			document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
			this._resizeLoadingUI();
			window.addEventListener("resize", this._resizeLoadingUI);
			document.body.appendChild(this._loadingDiv);
		};
	
		DefaultLoadingScreen.prototype.hideLoadingUI = function(){
			document.getElementById("customLoadingScreenDiv").style.display = "none";
			console.log("scene is now loaded");
		}
		
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

  return <canvas ref={reactCanvas} {...rest} />;
};