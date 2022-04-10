//almacenamos las puntuaciones obtenidas en el gameplay
let puntuaciones = sessionStorage.getItem("estabilidad");
    puntuaciones2 = sessionStorage.getItem("precision");
    puntuaciones3 = sessionStorage.getItem("velocidad");

/////////////////// PANTALLA ESTADISTICAS //////////////////////

// Animación de graficas para las estadisticas
function loadStats() {
    var can = document.getElementsByClassName('canvas'),
        spanProcent = document.getElementsByClassName('procent'),
        c = can[0].getContext('2d');
    
    var posX = can[0].width / 2,
        posY = can[0].height / 2,
        fps = 0.1,
        procent = 0,
        oneProcent = 360 / 100,
        result = oneProcent * puntuaciones,
        result2 = oneProcent * puntuaciones2,
        result3 = oneProcent * puntuaciones3;
    
    c.lineCap = 'round';
    arcMove();
    c2 = can[1].getContext('2d');
    c2.lineCap = 'round';
    
    arcMove2();
    c3 = can[2].getContext('2d');
    c3.lineCap = 'round';
    
    arcMove3();
    //Automatizamos el movimiento para el canvas del arco numero 1
    function arcMove(){
        var deegres = 0;
        var acrInterval = setInterval (function() {
          deegres += 1;
          c.clearRect( 0, 0, can[0].width, can[0].height );
          procent = deegres / oneProcent;
    
          spanProcent[0].innerHTML = procent.toFixed();
    
          c.beginPath();
          c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
          c.strokeStyle = '#b1b1b1';
          c.lineWidth = '10';
          c.stroke();
    
          c.beginPath();
          c.strokeStyle = '#7fe1ad';
          c.lineWidth = '10';
          c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
          c.stroke();
          if( deegres >= result ) clearInterval(acrInterval);
        }, fps);
        
      }
      //Automatizamos el movimiento para el canvas del arco numero 2
      function arcMove2(){
        var deegres = 0;
        var acrInterval = setInterval (function() {
          deegres += 1;
          c2.clearRect( 0, 0, can[1].width, can[1].height );
          procent = deegres / oneProcent;
    
          spanProcent[1].innerHTML = procent.toFixed();
    
          c2.beginPath();
          c2.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
          c2.strokeStyle = '#b1b1b1';
          c2.lineWidth = '10';
          c2.stroke();
    
          c2.beginPath();
          c2.strokeStyle = '#f85f6a';
          c2.lineWidth = '10';
          c2.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
          c2.stroke();
          if( deegres >= result2 ) clearInterval(acrInterval);
        }, fps);
        
      }
      //Automatizamos el movimiento para el canvas del arco numero 3
      function arcMove3(){
        
        var deegres = 0;
        var acrInterval = setInterval (function() {
          deegres += 1;
          c3.clearRect( 0, 0, can[2].width, can[2].height );
          procent = deegres / oneProcent;
    
          spanProcent[2].innerHTML = procent.toFixed();
    
          c3.beginPath();
          c3.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
          c3.strokeStyle = '#b1b1b1';
          c3.lineWidth = '10';
          c3.stroke();
    
          c3.beginPath();
          c3.strokeStyle = '#3949AB';
          c3.lineWidth = '10';
          c3.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
          c3.stroke();
          if( deegres >= result3 ) clearInterval(acrInterval);
        }, fps);
        
      }
    
  }

// Función que utiliza la libreria js_pdf para genera un PDF con los resultados
function generarPDF(){
    var doc = new jsPDF();
    doc.setFontSize(11);
    doc.text(20, 20, 'En el siguiente documento se describen los resultados obtenidos en la prueba diseñada ');
    doc.text(20, 30, 'por Spaceship AR para diagnosticar enfermedades crónicas como la ELA o el Parkinson.');
    doc.text(20, 50, 'Estabilidad: ' );
    doc.text(45, 50, puntuaciones.toString() );
    doc.text(20, 60, 'Precision: ' );
    doc.text(45, 60, puntuaciones2.toString() );
    doc.text(20, 70, 'Velocidad:' );
    doc.text(45, 70, puntuaciones3.toString() );
    doc.text(20, 90, 'Rogamos aún así que los resultados se tomen y se utilicen con cautela ya que el equipo ');
    doc.text(20,100,'sigue trabajando dia a dia para mejorar la precisón de los resultados.');
    doc.save('MiDiagnostico.pdf');
}

// Función que muestra el panel de seleccion de dificultad al pusar el boton NEW GAME
let abierto = false;
function selectDifficulty(){
  let div = document.getElementsByClassName('top');
  let ppal = document.getElementById('but_principal');
  if(abierto){
    div[0].style.display = "none";
    ppal.style.marginTop = "55%";
    abierto = false;
  }
  else{
    div[0].style.display = "flex";
    ppal.style.marginTop = "6.9%";
    abierto = true;
  }
  
}


//Funcion que abre el modal al pulsar en el icono del manual
function showModal(){
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  var a_countdown = new Audio('./media/countdown.wav');
  a_countdown.volume = 0.2;
  a_countdown.play();
}
//Funcion que cierra el modal al pulsar en el icono del manual
function closeModal(){
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}


/////////
