<template>
  <div class="hello">
    <div v-if="lang=='cat'">
       <h4><strong>Navegar pel qüestionari</strong>
       </h4>
       <p>
       	<ol>
       	<li> Les fletxes permeten anar a la pregunta anterior o a la pregunta següent.
       	</li>
       	<li>

Els cercles permeten anar directament a la pregunta desitjada.
<ul>
	<li>cercle negre buit: pregunta no resposta
	</li>
	<li>
cercle negre ple: pregunta en la que ens trobem, encara no resposta
	</li>
	<li>
cercle verd buit: pregunta ja resposta
	</li>
	<li>
cercle verd ple: pregunta en la que ens trobem, ja resposta.
	</li>
	</ul>
       	</li>
       	</ol>
L'aplicació no ens permetrà canviar de pregunta en aquests dos casos:
<ul>
<li> S'ha marcat una resposta però no s'ha justificat (veure l'apartat 'Justificació de respostes')
	</li>
	<li>
		S'ha marcat un projecte en curs però no s'ha justificat (veure l'apartat 'Justificació de projectes en curs')
       
       </li>
   </ul>
   <strong>
   Atenció: el qüestionari es desa automàticament al canviar de pregunta.
</strong>
</p>
              <h4><strong>
              	Ajuda
              </strong>
       </h4>
       <p>
       	El botó (i) està disponible durant tot el procés del qüestionari, per poder consultar aquestes instruccions en cas de dubtes.
       </p>
              <h4><strong>
              	Preguntes i respostes
              	</strong>
                     </h4>

       <p>
       	Les preguntes tenen la següent estructura:
<ol>
	<li>
		<strong>Enunciat: </strong>es el títol de la pregunta. El botó (?) permet obtenir més informació.
    </li>
    <li>
<strong>Possibles respostes: </strong>en blanc es mostren diferents escenaris. Cal triar el que s'apropa més a la realitat de l'empresa.
<strong>Atenció: quan es marca una resposta, és obligatori justificar-la mitjançant un arxiu adjunt o una breu explicació. En cas contrari, l'aplicació no permetrà avançar.
</strong>
</li>
<li>
<strong>Projectes en curs (futuribles):</strong> aquesta opció permet indicar que l'empresa té un projecte en curs relacionat amb l'enunciat de la pregunta. 
<strong>
Atenció: en cas de marcar l'opció de projecte en curs, és obligatori explicar breument el projecte. En cas contrari, l'aplicació no permetrà avançar.
</strong>
</li>
</ol>

       </p>
              <h4><strong>
              	Justificació de respostes
              </strong>
       </h4>
       <p>
       	Un cop s'ha triat una resposta, és obligatori justificar-la (l'aplicació no permetrà avançar). Hi ha dos mètodes de justificació:
       	<ol>
       		<li>
Mitjançant un document adjunt
Cal fer clic al botó 'Seleccionar arxiu' i escollir el fitxer que justifica la resposta.
<ul>
	<li>Aquest arxiu no pot ser més gran de 5MB</li>
    <li>Només es pot adjuntar un arxiu</li>
    <li>Un cop adjuntat un arxiu, es pot esborrar fent clic a la creu que es mostra al costat del nom.</li>
</ul>
</li>
<li>
Mitjançant una descripció explicativa 
</li>
</ol>
       </p>
              <h4>
              	<strong>
              		Justificació de projectes en curs
              	</strong>
      </h4>
       <p>
       	Un cop s'ha marcat l'opció de projecte en curs, és obligatori justificar-la mitjançant una breu descripció del projecte
       </p>
              <h4><strong>
              	Puntuar el qüestionari
              </strong>
       </h4>
       <p>
       	Quan s'hagin repòs i justificat totes les preguntes (tots els cercles marcats en verd), s'activarà el botó 'càlcul', que calcularà:
       	<ul>
       		<li>Puntuació obtinguda: puntuació del qüestionari en funció de les respostes proporcionades.</li>
            <li>Puntuació futurible: puntuació en base als projectes en curs. Aquesta puntuació és merament orientativa, i serà sempre igual o major a la puntuació obtinguda.
<strong>Atenció: una vegada s'hagi obtingut la puntuació del qüestionari, aquest no es podrà modificar ni esborrar; per introduir-ne modificacions, se n'haurà de crear un de nou.
</strong>
</li>
</ul>
       </p>
    </div>
       <div v-else>
       <h4>
       	<strong>
       		Navegar por el cuestionario
       	</strong>
       </h4>
       <p>
       	<ol>
       		<li>
       	Las flechas permiten ir a la pregunta anterior o a la pregunta siguiente.
</li>
<li>
Los círculos permiten ir directamente a la pregunta deseada.
<ul>
	<li>
		círculo negro vacío: pregunta no respondida
	</li>
	<li>
círculo negro lleno: pregunta en la que nos encontramos, todavía sin responder
</li>
<li> círculo verde vacío: pregunta ya respondida
</li>
<li>
círculo verde lleno: pregunta en la que nos encontramos, ya respondida.
</li>
</ul>
</li>
</ol>
La aplicación no nos permitirá cambiar de pregunta en estos dos casos:
<ol>
<li>Se ha marcado una respuesta pero no se ha justificado (ver apartado ‘Justificación de respuestas’)</li>
<li>Se ha marcado un proyecto en curso pero no se ha justificado (ver apartado ‘Justificación de proyectos en curso’).
</li>
<strong>
Atención: el cuestionario se guarda automáticamente al cambiar de pregunta.
</strong>
</ol>
       </p>
              <h4><strong>
Ayuda
              </strong>
       </h4>
       <p>
       	El botón (i) está disponible durante todo el proceso del cuestionario para poder consultar las instrucciones en caso de dudas.
El botón (?) permite obtener más información sobre cada pregunta.
       </p>
              <h4>
              	<strong>
              		Preguntas y respuestas
              	</strong>
       </h4>
       <p>
       	Las preguntas tienen la siguiente estructura:
       	<ol>
       		<li>
 Enunciado: es el título de la pregunta. El botón (?) permite obtener más información.
</li>
<li>
Posibles respuestas: en blanco se muestran diferentes escenarios. Es necesario escoger el que más se acerque a la realidad de la empresa.
<strong>
Atención: cuando se marca una respuesta, es obligatorio justificarla mediante un archivo adjunto o una breve explicación. En caso contrario, la aplicación no permitirá avanzar.
</strong>
</li>
<li>
Proyectos en curso (futuribles): esta opción permite indicar que la empresa tiene un proyecto en curso relacionado con el enunciado de la pregunta.
<strong>Atención: en caso de marcar la opción de proyecto en curso, es obligatorio explicar brevemente el proyecto. Encaso contrario, la aplicación no permitirá avanzar.
</strong>
</li>
</ol>
       </p>
              <h4>
              	<strong>
              	Justificación de respuestas
              	</strong>
       </h4>
       <p>
       	Una vez se ha encontrado una respuesta, es obligatorio justificarla (la aplicación no permitirá avanzar en caso contrario). Hay dos métodos de justificación:
<ol>
	<li>Mediante un documento adjunto
Es necesario hacer clic en el botón ‘Seleccionar archivo’ y escoger el fichero que justifica la respuesta.
     <ul>
     	<li> Este archivo no puede ser más grande de 5MB
     	</li>
     	<li>Solo puede adjuntarse un único archivo</li>
<li>Una vez adjuntado un archivo, puede borrarse haciendo clic en la cruz que se muestra al lado del nombre.
</li>
</ul>
<li>Mediante una descripción explicativa.
</li>
</ol>
       </p>
              <h4><strong>
              	Justificación de proyectos en curso
              </strong>
       </h4>
       <p>
       	Una vez se ha marcado la opción de proyecto en curso, es obligatorio justificarla mediante una breve descripción del proyecto.
       </p>
              <h4><strong>
Puntuar el cuestionario
              </strong>
       </h4>
       <p>
       	Cuando se hayan respondido y justificado todas las preguntas (todos los círculos estarán marcados en verde), se activará el botón ‘cálculo’, que calculará:
<ul>
	<li>Puntuación obtenida: puntuación del cuestionario en función de las respuestas proporcionadas.
</li>
<li>
Puntuación futurible: puntuación en base a los proyectos en curso. Esta puntuación es meramente orientativa, y será siempre igual o mayor a la puntuación obtenida.
<strong>
Atención: una vez se haya obtenido la puntuación del cuestionario, este no se podrá modificar ni borrar; para introducir modificaciones, se deberá crear uno nuevo.
</strong>
</li>
</ul>
       </p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Instructions',
  data () {
    return {
      msg: 'ADCC'
    }
  },
    computed: {

        lang: function () {
      return this.$i18n.locale()
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
    text-align: left;
    font-size: 14px;
}
</style>