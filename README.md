# WebXR-Videogame

LIVE DEMO (MOVIL) : https://practicafinal.charlypri.repl.co/

La idea principal consiste en anclar un frame a la cámara similar al de una nave espacial para que de la
sensación de estar dentro de una nave y añadir elementos como aliens, cometas y planetas para
ofrecer una sensación de estar navegando por una galaxia. En cuanto a la dinamica del juego
esta consistiría en generar objetos y elementos como aliens, pociones y herramientas los cuales
podrás interactuar con ellos para poder ir avanzando por los distintos niveles de dificultad

De manera resumida, la aplicación consistiría en un videojuego en el que hay dos elementos
principales; la nave y los objetivos.

## Nave.
La nave será un elemento que se mantendrá fijo a la pantalla del móvil. Esto quiere
decir que, cuando se gire o se mueva el móvil, la nave se mantendrá en la misma posición
con respecto al móvil. En la pantalla aparecerá un objetivo y ese será el punto que se
utilizará para disparar.
## Objetivos.
Los objetivos son elementos que aparecerán de las paredes o del suelo y,
dependiendo de la dificultad que se haya elegido, se moveran de manera errática, cíclica
o no se moverán.

##  Objetivos
La interacción principal de la aplicación consiste en mover el móvil y apuntar a los distintos
objetivos que aparezcan alrededor del usuario. La forma de disparar y destruir los objetivos es
mantenerse apuntando hacia ellos durante un número determinado de segundos. A partir de
las medidas calculadas a lo largo del transcurso de la partida, se calculará una medida de temblor
en la mano y de precisión que puede servir como guía para intentar prevenir enfermedades
relacionadas con el cerebro.
Con el objetivo de intentar facilitar la comunicación del usuario, después de terminar una
partida que produzca unas medidas excesivamente peligrosas, se le propondrá al usuario la
posibilidad de enviar sus resultados. Se podría llegar incluso a plantear el contacto directo con
el médico, sobre todo si la aplicación se llegara a integrar con algún software público.
Por último, algo que creemos que puede llegar a aumentar la gamificación de la aplicación
y puede suponer una medida más precisa es el aumento de la dificultad. 

## Dificultades
En este aspecto, vamos a introducir tres tipos de dificultades:
Dificultad 1. Los objetivos aparecen de las paredes o de las distintas superficies de la
escena y se mantienen fijos.
5
Dificultad 2. Los objetivos de mueven de manera cíclica y más o menos se mantienen en
la misma posición.
Dificultad 3. Los objetivos se mueven de manera más errática, haciendo que se deban
tener algunos reflejos para poder destruirlos.
## Tipos de interacción
El resultado final de la aplicación debería estar completamente integrado con el entorno,
haciendo que el usuario pueda interactuar de distintas maneras con los distintos elementos de
Realidad Aumentada. En concreto, los tres tipos de interacción que se implementarán serán las
siguientes:
## Hit Testing.
Este es el mecanismo para colocar objetos en el mundo real a través de la
inferencia de las distintas superficies que lo componen. En nuestro caso, será utilizado
para hacer aparecer los distintos enemigos y elementos que se deben destruir o coger.
DOM Overlays. Mecanismo para mostrar contenido web 2D interactivo durante una se-
sión inmersiva. En nuestro caso, esto puede ser utilizado para seleccionar los marcadores
que se quieren utilizar o ver la puntuación en tiempo real.
Apuntado con el móvil. Este es el mecanismo que permite seleccionar con un objetivo
distinto elementos de Realidad Aumentada. Esto será utilizado a la hora de destruir los
distintos enemigos.

## Dispositivo utilizado y entorno de interacción
Debido a que la aplicación necesita que el usuario tome el dispositivo con la mano, la opción
más acertada es el uso de dispositivos móviles. Este tipo de dispositivos se conocen como “paso
a través” y utilizan una pantalla opaca para combinar contenido virtual con una transmisión de
cámara del entorno real. Este tipo de dispositivos son ampliamente utilizados y deberían tener
un público mucho más amplio.
El hecho de utilizar un dispositivo móvil nos permite que la aplicación pueda potencialmente
ser utilizada en cualquier entorno. Sin embargo, en nuestro caso el entorno debería tener una
serie de características:
El jugador debería moverse en un espacio reducido, no podría ir andando mientras lo
utiliza.
El entorno debe tener algún tipo de superficie, como podría ser el suelo, mesas o paredes.
El jugador no debería tener vibración artificial mientras se juega (por ejemplo, producida
por el desplazamiento de un tren) para que las medidas fueran correctas. Si para el usuario
6 no es interesante las medidas de salud, la aplicación se debería poder utilizar en cualquier
lugar.