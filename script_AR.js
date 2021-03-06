
/********              VARIABLES GLOBALES                ***********/
let total_aliens = 2; //Numero total de aliens que aparecerán en la partida
let time_start; // Marcador del tiempo del inicio de partida
let duracion_partida = 30; //expressed in seconds
let velocidad = 0; //Tiempo en terminar la partida
let precision = 0; //Se sumará un punto por alien matado
let estabilidad = 100; // Cada vez que se pierda un alien del punto de mira se restarán 5 puntos a este valor
let wall_found = false;
let aliens_pos = [];

/********                AUDIO EFFECTS                   ************/

var a_countdown = new Audio('./media/countdown.wav');
var a_breach = new Audio('./media/breach.wav');
var a_explosion = new Audio('./media/explosion.wav');

a_countdown.volume = 0.2; 
a_breach.volume = 0.05; 
a_explosion.volume = 0.5; 


/********                COMPONENTES A-FRAME                   ************/

// Componente para destruir un objetivo. 

AFRAME.registerComponent('destroy-objective', {
    schema: {
        // color: { type: 'string', default: '#0000ff'},
        timeToDestroy: { type: 'number', default: 1.5 }
    }, 
    init(){
        this.isLooking = false;
        this.timeIn = new Date().getTime() / 1000;
        this.destroyed = false;
        this.originalScale = this.el.object3D.scale;

        //this.originalColor = this.el.getAttribute('material').color;
        this.el.addEventListener('mouseenter', () => {
            this.timeIn = new Date().getTime() / 1000;
            this.isLooking = true;
        });     

        this.el.addEventListener('mouseleave', () => {
            this.isLooking = false;
            if(estabilidad > 0){
              estabilidad -= 5;
            }
        });   
    },
    update(){

    },
    tick(){
        // Se obtienen el momento actual
        let currentTime = new Date().getTime() / 1000;

        // Si han pasado 2 segundos o más y mirando el objetivo, este es destruido.
        if(currentTime - this.timeIn >= this.data.timeToDestroy && this.isLooking == true){
            this.el.setAttribute('color', this.data.color);
            this.destroyed = true;
        }

        // Si el objetivo ha sido destruido, se hace pequeño y rota.
        if(this.destroyed == true){
            let currentScale = this.el.object3D.scale;

            this.el.setAttribute('scale', {
                x: currentScale.x - this.originalScale.x * 0.075,
                y: currentScale.y - this.originalScale.y * 0.075,
                z: currentScale.z - this.originalScale.z * 0.075
            });

            this.el.object3D.rotation.y += 0.20;

            if (currentScale.x < 0.0003){
              // window.navigator.vibrate(200);
              precision ++;
               a_explosion.play();
                // Si la precisión es igual que el total de aliens, significa
                // que hemos eliminado a todos los aliens de la partida
              if (precision == total_aliens){
                  // Se actualizan las distintas estadísticas
                let timer = (new Date().getTime() / 1000);
                velocidad =  ( (1 - (timer - time_start) / duracion_partida))*100 ; 
                precision = (precision / total_aliens) * 100;
                alert(precision.toString());
                sessionStorage.setItem("estabilidad", estabilidad);
                sessionStorage.setItem("velocidad", velocidad);
                sessionStorage.setItem("precision", precision);
                window.location.href = "./Resultados.html";

              } else {
                // Se elimina el alien
                this.el.parentNode.removeChild(this.el); 
              }
                
            } 
        }
    }
});

// Componente con el movimiento cíclico del objetivo

AFRAME.registerComponent('movimiento-ciclico', {
    schema: {
        speed: { type: 'number', default: 0.02},
        range: { type: 'number', default: 0.3}
    },
    init(){
        // Limites hasta los que se mueve el objetivo
        this.leftEnd = this.el.object3D.position.x - this.data.range;
        this.rightEnd = this.el.object3D.position.x + this.data.range;

        // Variable que indica si va hacia la izquierda o hacia la derecha
        this.goingRight = true;
    },
    tick(){

        // Condiciones para cambiar el sentido en caso de superar el límite.
        if (this.goingRight == true && this.el.object3D.position.x >= this.rightEnd){
            this.goingRight = false
        } else if (this.goingRight == false && this.el.object3D.position.x <= this.leftEnd) {
            this.goingRight = true
        }

        // Condición que indica si ir hacia la derecha o hacia la izquierda.
        if (this.goingRight == true){
            this.el.object3D.position.x += this.data.speed;
        } else {
            this.el.object3D.position.x -= this.data.speed;
        }
    }
});

// Mirar a la cámara continuamente

AFRAME.registerComponent('stare-to-camera', {
    init(){ 
        this.vector = new THREE.Vector3();
    },
    tick(){
        let cameraEl = document.querySelector('#camera');
        this.el.object3D.lookAt(cameraEl.getAttribute('position'));

    }
});

// Empieza el videojuego
AFRAME.registerComponent('detect-positions', {
  schema: {
      timeBetweenDetections: { type: 'number', default: 2},
      maximumDetections: { type: 'number', default: 5}
  },
  init(){
      this.initTime = new Date().getTime() / 1000;
      this.sceneEl = document.querySelector('a-scene');
  },
  tick(){
    let currentTime = new Date().getTime() / 1000;
    let passedTime = currentTime - this.initTime;

    if (passedTime >= this.data.timeBetweenDetections){
      this.initTime = currentTime;

      // Se busca una nueva superficie
      if (wall_found){
        wall_found = false;

        // Se almacena la posición en la lista de posiciones de aliens
        var posicion = document.querySelector("#reticle").getAttribute('position');
        aliens_pos.push(posicion.x.toString()+" "+ posicion.y.toString() +" "+ posicion.z.toString());

        // Se detecta un alien
        alert("Superficie detectada! Sigue escaneando");
      }

      if(aliens_pos.length == total_aliens ){
        // Se elimina el circulo azul del hit-testing
        reticle.setAttribute('visible', 'false');

        // Se elimina el texto de escanear la habitación
        document.querySelector(".texto_inicial").setAttribute('visible', 'false');
        
        // Se introduce el componente
        let entityEl = document.createElement('a-entity');
        entityEl.setAttribute("countdown", "");
        this.sceneEl.append(entityEl);

        // Se elimina la entidad que contiene este componente
        this.el.parentNode.removeChild(this.el);
      }
    }
  }
});


// Cuenta atrás
AFRAME.registerComponent("countdown", {
  schema: {
      countdownTime: { type: 'number', default: 5},
      timeBetweenSeconds: { type: 'number', default: 1},
  },
  init(){
      this.initTime = new Date().getTime() / 1000;

      // Se crea el a-text con el countdown
      this.sceneEl = document.querySelector('a-scene');
      this.countdownEntity = document.createElement('a-text');
      this.countdownEntity.setAttribute("id", "countdown");
      this.countdownEntity.setAttribute("value", this.data.countdownTime.toString());
      this.countdownEntity.setAttribute("align", "center");
      this.countdownEntity.object3D.scale.set(4, 4, 4);
      this.countdownEntity.object3D.position.set(0, 2, -4);
      this.sceneEl.append(this.countdownEntity);
  },
  tick(){
    let currentTime = new Date().getTime() / 1000;
    let passedTime = currentTime - this.initTime;

    if (passedTime >= this.data.timeBetweenSeconds){
      this.initTime = currentTime;

      // Si aun no se ha llegado al maximo de detecciones, se sigue detectando
      if(this.data.countdownTime != 0){
        this.data.countdownTime -= 1;
        // Se ejecuta un sonido
        a_countdown.cloneNode(true).play();
        this.countdownEntity.setAttribute("value", this.data.countdownTime.toString()); 

      // Si se ha llegado al maximo se ejecuta otro componente
      } else {
        // alert("calling function to insert aliens");
        time_start = new Date().getTime() / 1000;

        // Creamos el generador de aliens
        var entityEl = document.createElement('a-entity');
        entityEl.setAttribute("alien-generator", "timeBetweenSpawns: 4");
        this.sceneEl.append(entityEl);

        // Creamos el timer global
        var entityEl = document.createElement('a-entity');
        entityEl.setAttribute("game-time", "");
        this.sceneEl.append(entityEl);

        // Se eliminan tanto esta entidad como la que tiene el countdown
        this.countdownEntity.parentNode.removeChild(this.countdownEntity);
        this.el.parentNode.removeChild(this.el);
      }
    }
  }
});

// Generación de aliens
AFRAME.registerComponent('alien-generator', {
  schema: {
    timeBetweenSpawns: { type: 'number', default: 2}
  },
  init(){
    this.sceneEl = document.querySelector('a-scene');
    this.aliensSpawned = 0;
    this.initTime = new Date().getTime() / 1000;
  },
  tick(){
    let currentTime = new Date().getTime() / 1000;
    let passedTime = currentTime - this.initTime;

    if (passedTime >= this.data.timeBetweenSpawns){
      let entityEl = document.createElement('a-entity');
      entityEl.setAttribute("mixin", "alienSize");
      entityEl.setAttribute("color", "yellow");
      entityEl.setAttribute("gltf-model", "#alien");
      entityEl.setAttribute("class", "selectable");
      entityEl.setAttribute('destroy-objective', {timeToDestroy: "1.5"});
      
      if(sessionStorage.getItem("dificultad") == 1){
        entityEl.setAttribute("movimiento-ciclico", "speed", "0.005");
        //entityEl.object3D.scale.set(0.0008, 0.0008, 0.0008);
        entityEl.setAttribute("scale", "0.0008 0.0008 0.0008");
      }
      if(sessionStorage.getItem("dificultad") == 2){
        entityEl.setAttribute("movimiento-ciclico", "speed", "0.01");
        entityEl.object3D.scale.set(0.0007, 0.0007, 0.0007);
      }
      if(sessionStorage.getItem("dificultad") == 3){
        entityEl.setAttribute("movimiento-ciclico", "speed", "0.015");
        entityEl.object3D.scale.set(0.0006, 0.0006, 0.0006);
      }

      entityEl.setAttribute('position', aliens_pos[this.aliensSpawned]);

      // entityEl.setAttribute("position", "0 2 -4");
      // entityEl.setAttribute("stare-to-camera","");
      entityEl.setAttribute("id", this.aliensSpawned.toString());
      entityEl.flushToDOM();

      this.sceneEl.appendChild(entityEl);
      
      a_breach.play();
      this.aliensSpawned += 1;

      if (this.aliensSpawned >= total_aliens){
        this.el.parentNode.removeChild(this.el);
      }
    }
  }
});


// Conteo del tiempo total de juego
AFRAME.registerComponent('game-time', {

  init(){
    time_start = new Date().getTime() / 1000;
  },
  tick(){
    let currentTime = new Date().getTime() / 1000;
    let passedTime = currentTime - time_start;

    // Acaba una partida tras 1 minuto
    if( passedTime >= duracion_partida){
      velocidad =  ( (1 - passedTime / duracion_partida))*100 ; 
      precision = (precision / total_aliens) * 100;
      sessionStorage.setItem("estabilidad", estabilidad);
      sessionStorage.setItem("velocidad", velocidad);
      sessionStorage.setItem("precision", precision);

      window.location.href = "./Resultados.html";

      this.el.parentNode.removeChild(this.el);
    }
    
  }
});

// ///////////////////  HIT TESTING   //////////////

const sceneEl = document.querySelector("a-scene");
const reticle = document.querySelector("#reticle");
let rafId = null;

sceneEl.addEventListener("enter-vr", async () => {
      if(!sceneEl.is("ar-mode")) return;
      // reticle.setAttribute('visible', 'false');
      const xr = sceneEl.renderer.xr;
      const session = xr.getSession();
      //console.log(session);
      const viewerSpace = await session.requestReferenceSpace('viewer');
      const refSpace = await session.requestReferenceSpace('local-floor');

      const xrHitTestSource = await session.requestHitTestSource({space: viewerSpace});

      reticle.object3D.matrixAutoUpdate = false;

      function onXRFrame(t, frame){
        // reticle.setAttribute('visible', 'false');
        rafId = session.requestAnimationFrame(onXRFrame);
        const viewerPose = frame.getViewerPose(refSpace);
        if (xrHitTestSource && viewerPose ){
          const hitTestResults = frame.getHitTestResults(xrHitTestSource);
          if(hitTestResults.length > 0){
            const hitTestPose = hitTestResults[0].getPose(refSpace);
            console.log(hitTestPose.transform);
            reticle.object3D.matrix.elements = hitTestPose.transform.matrix;
            ['x', 'y', 'z'].forEach( axis =>{
              reticle.object3D.position[axis] = hitTestPose.transform.position[axis];
            });
			      reticle.object3D.quaternion.copy(hitTestPose.transform.orientation);
            wall_found = true;
          }
        }
      }

      rafId = session.requestAnimationFrame(onXRFrame);

    });
