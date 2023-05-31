import React from 'react'
import { Vector3,Color3, HemisphericLight, MeshBuilder,ArcRotateCamera,Tools,SpotLight,AssetsManager,Axis,SceneLoader } from "@babylonjs/core";
import {AdvancedDynamicTexture,Button} from '@babylonjs/gui';
import SceneComponent from './SceneComponent'
import '@babylonjs/loaders/glTF'
import {requestOptions} from './Helper'
import  gsap from 'gsap'
function FirstScene() {
	let box;
	var haveModelDataArray=[]
	var currentIndex = 0
	let loadBikeModel;
	var currentMesh;
	const onSceneReady = (scene,engine) => {
		
		var camera = new ArcRotateCamera(
			"Camera001",
			5.5,
			Tools.ToRadians(80),
			3,
			new Vector3(1.6,1.5, -1.3),
			scene
		);
		const canvas = scene.getEngine().getRenderingCanvas();
		// This attaches the camera to the canvas
		camera.attachControl(canvas, true);
		camera.lowerRadiusLimit = 3;
		camera.upperRadiusLimit = 20;
		camera.lowerBetaLimit = camera.beta - Tools.ToRadians(80);
		camera.upperBetaLimit = camera.beta + Tools.ToRadians(20);
		camera.wheelPrecision = 100;
		//custom Scene
		// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
		scene.clearColor = Color3.FromHexString("#1d1d1d");
		//Adding a light
		var light = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
		light.intensity = 1;
		

		var light6 = new SpotLight("spotLight",new Vector3(0, -2, -1), new Vector3(0, 1, 0), Math.PI / 3, 40, scene);
		light6.diffuse =  Color3.FromHexString("#ffffff");
		light6.specular =  Color3.FromHexString("#ffffff");
		light6.intensity = 6
		light6.angle = 120




		// 製作踩的地板
		SceneLoader.ImportMesh("", `${process.env.PUBLIC_URL+'/sources/'}`, "rock.glb", scene, function (newMeshes) {
			// Set the target of the camera to the first imported mesh
			// camera.target = newMeshes[0];
			newMeshes[0].scaling = new Vector3 (2,1,2)
			newMeshes[0].position = new Vector3 (0,-1.5,0)
						var a = scene.getMeshByName('RockFlyPt1')
						var b = scene.getMeshByName('RockFlyPt2')
						console.log(a.material)
						a.material._albedoColor= Color3.FromHexString("#282f38");
						a.material._roughness = 0.6
						b.material._albedoColor= Color3.FromHexString("#282f38");
						b.material._roughness = 0.6
						scene.registerBeforeRender(function () {
							newMeshes[0].rotate(Axis.Y, -Math.PI / 300);
						})
			
		});
		var gui = AdvancedDynamicTexture.CreateFullscreenUI("myUI");
		var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
		const createNexPrevtButton = function(){
			var buttonSphere = Button.CreateImageWithCenterTextButton("butSphere", "Sphere", `${process.env.PUBLIC_URL+'/sources/next2.png'}`);
			buttonSphere.width = "50px";
			buttonSphere.height = "70px";
			buttonSphere.color = "transparent";
			// buttonSphere.background = "#a9b7b781";
			buttonSphere.top = "-10%";
			buttonSphere.left = "40%";
			buttonSphere.alpha = 0.3;
			buttonSphere.cornerRadius = 5;
			buttonSphere.margin = "20px";
			buttonSphere.onPointerEnterObservable.add(function() {
				buttonSphere.alpha = 1;
			});
			buttonSphere.onPointerOutObservable.add(function() {
				buttonSphere.alpha = 0.3;
			});
			buttonSphere.onPointerClickObservable.add(function(){
				// 新增或刪除模型
				enableAndRemoveMesh(currentMesh)

				if(currentIndex < haveModelDataArray.length -1){
					currentIndex++
					console.log(currentIndex)
					swapObject(currentIndex)
						// glbUrl = fetchGetObject(haveModelDataArray[currentIndex].id)
				}else{
					currentIndex = 0
					swapObject(currentIndex)
					// glbUrl = fetchGetObject(haveModelDataArray[currentIndex].id)
					// loadModels(glbUrl).load()
				}
			});

			var prevButtonSphere = Button.CreateImageWithCenterTextButton("butSphere", "Sphere", `${process.env.PUBLIC_URL+'/sources/prev2.png'}`);
			prevButtonSphere.width = "50px";
			prevButtonSphere.height = "70px";
			prevButtonSphere.color = "transparent";
			// prevButtonSphere.background = "#a9b7b781";
			prevButtonSphere.top = "-10%";
			prevButtonSphere.left = "-40%";
			prevButtonSphere.cornerRadius = 5;
			prevButtonSphere.margin = "30px";
			prevButtonSphere.alpha = 0.3;
			prevButtonSphere.onPointerEnterObservable.add(function() {
				prevButtonSphere.alpha = 1;
			});
			prevButtonSphere.onPointerOutObservable.add(function() {
				prevButtonSphere.alpha = 0.3;
			});
			prevButtonSphere.onPointerClickObservable.add(function(){
				// 新增或刪除模型
				enableAndRemoveMesh(currentMesh)
				 // 2 -1 1 -1 0 
				if(currentIndex <= 0 ){
					currentIndex = haveModelDataArray.length -1
					console.log(currentIndex)
				 
					
					swapObject(currentIndex)
						// glbUrl = fetchGetObject(haveModelDataArray[currentIndex].id)
				}else{
					
					currentIndex--
					swapObject(currentIndex)
					// glbUrl = fetchGetObject(haveModelDataArray[currentIndex].id)
					// loadModels(glbUrl).load()
				}
				
	
			});
			advancedTexture.addControl(buttonSphere);  
			advancedTexture.addControl(prevButtonSphere); 
		}
		const createRefreshButton = () => {
			var refreshButtonSphere = Button.CreateImageWithCenterTextButton("butSphere", "Sphere", `${process.env.PUBLIC_URL+'/sources/icons8.png'}`);
			refreshButtonSphere.width = "70px";
			refreshButtonSphere.height = "70px";
			refreshButtonSphere.color = "transparent";
			// buttonSphere.background = "#a9b7b781";
			refreshButtonSphere.top = "40%";
			refreshButtonSphere.left = "0%";
			refreshButtonSphere.alpha = 0.3;
			refreshButtonSphere.cornerRadius = 5;
			refreshButtonSphere.margin = "20px";
		
			refreshButtonSphere.onPointerEnterObservable.add(function() {
				refreshButtonSphere.alpha = 1;
			});
			refreshButtonSphere.onPointerOutObservable.add(function() {
				refreshButtonSphere.alpha = 0.3;
			});
		
			refreshButtonSphere.onPointerClickObservable.add(function(){
						// 重新取清單載入模型
						enableAndRemoveMesh(currentMesh)
						refreshUrlList()
						moveCamera('c')
						
			});
			advancedTexture.addControl(refreshButtonSphere);  
		}
		const createButtonGroup = () => {
			var number1ButtonSphere = Button.CreateImageWithCenterTextButton("butSphere", "Sphere", `${process.env.PUBLIC_URL+'/sources/number1.png'}`);
			number1ButtonSphere.width = "40px";
			number1ButtonSphere.height = "40px";
			number1ButtonSphere.color = "transparent";
			number1ButtonSphere.top = "40%";
			number1ButtonSphere.left = "15%";
			number1ButtonSphere.alpha = 0.3;
			number1ButtonSphere.cornerRadius = 5;
			number1ButtonSphere.margin = "20px";
		
			number1ButtonSphere.onPointerEnterObservable.add(function() {
				number1ButtonSphere.alpha = 1;
			});
			number1ButtonSphere.onPointerOutObservable.add(function() {
				number1ButtonSphere.alpha = 0.3;
			});
		
			number1ButtonSphere.onPointerClickObservable.add(function(){
				moveCamera('a')
			});
			var number2ButtonSphere = Button.CreateImageWithCenterTextButton("butSphere", "Sphere", `${process.env.PUBLIC_URL+'/sources/number2.png'}`);
			number2ButtonSphere.width = "40px";
			number2ButtonSphere.height = "40px";
			number2ButtonSphere.color = "transparent";
			number2ButtonSphere.top = "40%";
			number2ButtonSphere.left = "25%";
			number2ButtonSphere.alpha = 0.3;
			number2ButtonSphere.cornerRadius = 5;
			number2ButtonSphere.margin = "20px";
		
			number2ButtonSphere.onPointerEnterObservable.add(function() {
				number2ButtonSphere.alpha = 1;
			});
			number2ButtonSphere.onPointerOutObservable.add(function() {
				number2ButtonSphere.alpha = 0.3;
			});
		
			number2ButtonSphere.onPointerClickObservable.add(function(){
				moveCamera('b')
			});
			var number3ButtonSphere = Button.CreateImageWithCenterTextButton("butSphere", "Sphere", `${process.env.PUBLIC_URL+'/sources/number3.png'}`);
			number3ButtonSphere.width = "40px";
			number3ButtonSphere.height = "40px";
			number3ButtonSphere.color = "transparent";
			number3ButtonSphere.top = "40%";
			number3ButtonSphere.left = "35%";
			number3ButtonSphere.alpha = 0.3;
			number3ButtonSphere.cornerRadius = 5;
			number3ButtonSphere.margin = "20px";
		
			number3ButtonSphere.onPointerEnterObservable.add(function() {
				number3ButtonSphere.alpha = 1;
			});
			number3ButtonSphere.onPointerOutObservable.add(function() {
				number3ButtonSphere.alpha = 0.3;
			});
		
			number3ButtonSphere.onPointerClickObservable.add(function(){
				moveCamera('c')
			});
			advancedTexture.addControl(number1ButtonSphere);  
			advancedTexture.addControl(number2ButtonSphere);  
			advancedTexture.addControl(number3ButtonSphere);  
		}
		

		const moveCamera = (num) =>{
			let regions = {    
				a : { id: 'top', alpha: 8.1490, beta: 0.6739, radius: 4 },      
				b : { id: 'Sa', alpha: 8.460744722271127, beta: 1.7453, radius: 10.038313487331575 },      
				c : { id: 'BidonRosu', alpha: 5.5414, beta: 1.3698, radius: 5.1128 },      
				d : { id: 'Ghidon', alpha: 5.218007193438249, beta: 1.042441018904849, radius: 19.999952560667452 },
				e : { id: 'Ghidon', alpha: 5.5414, beta: 1.3698, radius: 5.1128 },
			}
			console.log(regions[num])
			console.log(camera)
			gsap.to(camera, {
				radius: regions[num].radius,
				alpha: regions[num].alpha,
				beta: regions[num].beta,
			});
			gsap.to(camera.target,{x:0, y:1, z:0, ease: "power2"})
			// camera.setTarget(new Vector3 (1,1,0))
	
		}
		const loadModels = (url) =>{
			console.log(url)
			let loader = new AssetsManager(scene);
			loadBikeModel = loader.addMeshTask("", "", "",url);
			loadBikeModel.onSuccess = function (task) {
				task.loadedMeshes[0].scaling = new Vector3 (0,0,0);
				currentMesh =null
				currentMesh = task.loadedMeshes[0]
				console.log(task.loadedMeshes[0]._scene.materials)
				var loadMeshMaterials = task.loadedMeshes[0]._scene.materials
				var loadMeshMaterialsLength = loadMeshMaterials.length
				var lastElementMaterials = loadMeshMaterials[loadMeshMaterialsLength-1]
				if(lastElementMaterials.name == 'Model_Model_7'){
					lastElementMaterials.metallic=0
					lastElementMaterials.roughness=1
				}
	
				camera.setTarget(new Vector3 (0,1,0))
	
				let wentSize = 150
				let wentSize2 = 1.5      
				let wentRadius = 5
				scene.registerBeforeRender(function () {

					task.loadedMeshes[0].rotate(Axis.Y, -Math.PI / 300);
					if( task.loadedMeshes[0] && task.loadedMeshes[0].scaling.x < wentSize2){
						task.loadedMeshes[0].scaling.x += 0.1 / 2.125;
						task.loadedMeshes[0].scaling.y += 0.1 / 2.125;
						task.loadedMeshes[0].scaling.z += 0.1 / 2.125;
					} 
				});
			}
			loadBikeModel.onError = function (task, message, exception) {
				console.log(message, exception);
			};
	
			loader.onProgress = function(remainingCount, totalCount, lastFinishedTask) {
				console.log(  engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.')
				engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.'
			};
	
			return loader
	
		}
		const playFirstData =  (data) =>{
			console.log('play' ,data)
			let newArray=[];
			data.map( (item)=>{
				if(item.rigged_glb !== null){
					console.log(item)
					haveModelDataArray.push(item)
				}
			})
			console.log(newArray)
			loadModels(haveModelDataArray[0].rigged_glb).load()
		}
		const swapObject =async (num)=>{
			// glbUrl = await fetchGetObject(num)
			await loadModels(haveModelDataArray[num].rigged_glb).load()
		}
		const fetchDataList = async ()=>{
			let url = 'https://fullbodyscan-dev.msvfx.com/api/latest_fbs_photos_with_glb?latest=20'
			const ids = await (await fetch(url, requestOptions)).json()
				console.log(ids)
				const data = Promise.all(
					ids.map(async (i) => await (await fetch(`https://fullbodyscan-dev.msvfx.com/api/guest_fbs_photo_profile/${i.id}`,requestOptions )).json())
				)
				return data 
		}
		const getLatestData = async ()=>{
			let latestjson =await fetchDataList()
			console.log(latestjson)
			playFirstData(latestjson)
		}
	
		const refreshUrlList = () =>{
			// idDataArray = []
			haveModelDataArray=[]
			currentIndex = 0
			getLatestData()
			console.log(haveModelDataArray)
		}
	
		const enableAndRemoveMesh = (item) => {
			item.setEnabled(false)  
			item.isVisible = false 
		}
		createNexPrevtButton()
		createRefreshButton()
		createButtonGroup()
		getLatestData()


	};

	/**
	 * Will run on every frame render.  We are spinning the box on y-axis.
	 */
	const onRender = (scene) => {
	if (box !== undefined) {
			var deltaTimeInMillis = scene.getEngine().getDeltaTime();

			const rpm = 10;
			box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
	}
	};
  return (
    <div >
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    </div>
  )
}

export default FirstScene