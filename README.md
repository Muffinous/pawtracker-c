<p class="has-line-data" data-line-start="0" data-line-end="1"># pawtracker-c</p>
<h1 class="code-line" data-line-start=2 data-line-end=3 ><a id="PawTracker_2"></a>PawTracker.</h1>
<p class="has-line-data" data-line-start="3" data-line-end="5">Aplicación multiplataforma con Ionic Framework para el cuidado de animales y facilitar la adopción.<br>
La aplicación contiene tres secciones importantes: Home, Adopt y Profile.</p>
<ul>
<li class="has-line-data" data-line-start="5" data-line-end="6">Home: Página principal de la aplicación donde se muestra un calendario en el cual el usuario puede agregar, modificar o eliminar eventos / citas relacionadas con sus animales de compañía.</li>
<li class="has-line-data" data-line-start="6" data-line-end="7">Adopt: Página que permite al usuario ver todos los animales que están en adopción y además, le brinda la opción de registrar un nuevo animal para su adopción.</li>
<li class="has-line-data" data-line-start="7" data-line-end="9">Página que muestra el perfil del usuario y su información, así como los animales que tiene registrados a su cargo.</li>
</ul>
<h2 class="code-line" data-line-start=9 data-line-end=10 ><a id="Resumen_y_contexto_9"></a>Resumen y contexto</h2>
<p class="has-line-data" data-line-start="10" data-line-end="15">En España, la tasa de abandono de animales sigue siendo un problema importante. Según la Fundación Affinity, en 2021 se abandonaron más de 285.000 animales. La mayoría de los animales abandonados en España son perros, seguidos de gatos y otros animales domésticos como conejos, hurones y aves.<br>
Para abordar este problema, existen diversas iniciativas a nivel local y nacional, como las campañas de concienciación, los programas de adopción, el fomento de la esterilización, etc.<br>
Teniendo en cuenta este contexto, se ha desarrollado una aplicación llamada PawBuddy, la cual brinda apoyo a las personas encargadas del cuidado de animales, con el fin de que puedan mantener un registro organizado de las citas veterinarias y promover el cuidado y bienestar de los animales. La aplicación, se ha construido utilizando el framework Ionic y la plataforma de Firebase para bases de datos en tiempo real. PawBuddy es fácil de usar y permite a los usuarios agregar, modificar y eliminar citas, así como recibir recordatorios para no olvidarlas.<br>
Además, incluye una sección destinada a fomentar la adopción de animales, en la que los usuarios podrán publicar animales que estén buscando un hogar, así como buscar y ver otros animales que se encuentran disponibles para adopción. De esta manera, se espera contribuir a la reducción del número de animales en situación de abandono o en albergues.<br>
Se espera que PawBuddy sea útil tanto para las personas que tienen animales a su cargo como para aquellas que estén interesadas en la adopción. La presente memoria describe las principales características de la aplicación desarrollada, así como las conclusiones derivadas del trabajo realizado.</p>
<h2 class="code-line" data-line-start=16 data-line-end=17 ><a id="Tecnologas_16"></a>Tecnologías</h2>
<p class="has-line-data" data-line-start="18" data-line-end="19">PawBuddy usa las siguientes tecnologías:</p>
<ul>
<li class="has-line-data" data-line-start="19" data-line-end="20">[TypeScript]</li>
<li class="has-line-data" data-line-start="20" data-line-end="21">[CSS]</li>
<li class="has-line-data" data-line-start="21" data-line-end="22">[HTML]</li>
<li class="has-line-data" data-line-start="22" data-line-end="23">[Firebase]</li>
</ul>
<h2 class="code-line" data-line-start=25 data-line-end=26 ><a id="Manual_para_clonar_el_repositorio_y_ejecutarlo_en_local_25"></a>Manual para clonar el repositorio y ejecutarlo en local.</h2>
<p class="has-line-data" data-line-start="26" data-line-end="36">Esta sección se ha creado con el fin de facilitar el arranque de la aplicación en local.<br>
El repositorio de GitHub que contiene el código fuente se encuentra en:<br>
<a href="https://github.com/Muffinous/pawtracker-c">https://github.com/Muffinous/pawtracker-c</a><br>
Una vez clonado será necesario instalar todas las dependencias con el comando:<br>
npm install<br>
Finalmente, si todo ha ido bien, el proyecto se podrá arrancar con el comando de Ionic:<br>
ionic serve<br>
Aconsejo utilizar las opciones -l -s [ionic serve -l -t], donde:<br>
•   -l: Permite ver múltiples plataformas a la vez.<br>
•   -t: Permite empezar el servidor con una plataforma determinada</p>
