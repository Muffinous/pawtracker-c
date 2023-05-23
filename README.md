﻿# pawtracker-c

# PawBuddy.
Aplicación multiplataforma con Ionic Framework para el cuidado de animales y facilitar la adopción.
La aplicación contiene tres secciones importantes: Home, Adopt y Profile.
- Home: Página principal de la aplicación donde se muestra un calendario en el cual el usuario puede agregar, modificar o eliminar eventos / citas relacionadas con sus animales de compañía.
- Adopt: Página que permite al usuario ver todos los animales que están en adopción y además, le brinda la opción de registrar un nuevo animal para su adopción. 
- Página que muestra el perfil del usuario y su información, así como los animales que tiene registrados a su cargo.

## Resumen y contexto
En España, la tasa de abandono de animales sigue siendo un problema importante. Según la Fundación Affinity, en 2021 se abandonaron más de 285.000 animales. La mayoría de los animales abandonados en España son perros, seguidos de gatos y otros animales domésticos como conejos, hurones y aves.
Para abordar este problema, existen diversas iniciativas a nivel local y nacional, como las campañas de concienciación, los programas de adopción, el fomento de la esterilización, etc. 
Teniendo en cuenta este contexto, se ha desarrollado una aplicación llamada PawBuddy, la cual brinda apoyo a las personas encargadas del cuidado de animales, con el fin de que puedan mantener un registro organizado de las citas veterinarias y promover el cuidado y bienestar de los animales. La aplicación, se ha construido utilizando el framework Ionic y la plataforma de Firebase para bases de datos en tiempo real. PawBuddy es fácil de usar y permite a los usuarios agregar, modificar y eliminar citas, así como recibir recordatorios para no olvidarlas.
Además, incluye una sección destinada a fomentar la adopción de animales, en la que los usuarios podrán publicar animales que estén buscando un hogar, así como buscar y ver otros animales que se encuentran disponibles para adopción. De esta manera, se espera contribuir a la reducción del número de animales en situación de abandono o en albergues.
Se espera que PawBuddy sea útil tanto para las personas que tienen animales a su cargo como para aquellas que estén interesadas en la adopción. La presente memoria describe las principales características de la aplicación desarrollada, así como las conclusiones derivadas del trabajo realizado.

## Tecnologías

PawBuddy usa las siguientes tecnologías:
- [TypeScript]
- [CSS]
- [HTML]
- [Firebase]


## Manual para clonar el repositorio y ejecutarlo en local. 
Esta sección se ha creado con el fin de facilitar el arranque de la aplicación en local.
El repositorio de GitHub que contiene el código fuente se encuentra en:
https://github.com/Muffinous/pawtracker-c
Una vez clonado será necesario instalar todas las dependencias con el comando:
npm install
Finalmente, si todo ha ido bien, el proyecto se podrá arrancar con el comando de Ionic:
ionic serve
Aconsejo utilizar las opciones -l -s [ionic serve -l -t], donde:
•	-l: Permite ver múltiples plataformas a la vez.
•	-t: Permite empezar el servidor con una plataforma determinada
