<template>
  <div class="hello" style="color:white; ">
    <h1>{{ msg | translate}}</h1>
    <h2>ADCC</h2>
   <div v-if="lang=='cat'" style="text-align:left">
   	"L’Associació pel Desenvolupament Rural de la Catalunya Central és una associació sense ànim de lucre, reconeguda com a Grup d’Acció Local (GAL) pel Departament d’agricultura, ramaderia, pesca i alimentació de la Generalitat de Catalunya, que té com objectiu principal “Catalunya central territori de qualitat” tenint com a pilars centrals :
<ul>
 <li>La valorització del territori i l’entorn com a elements vertebradors d’una cohesió i responsabilitat territorial. </li>
<li>Fomentar l’esperit empresarial. </li>
  <li>Apostar pel capital humà i la millora de l’ocupabilitat</li>
</ul>
Per més informació, consultar el web <a style="color:white"  href="http://www.catcentral.cat/pages/ca/inici.php"> http://www.catcentral.cat/pages/ca/inici.php" </a>
   </div>
   <div v-else style="text-align:left">
   	"La Asociación por el Desarrollo Rural de la Cataluña Central es una asociación sin ánimo de lucro, reconocida como Grupo de Acción Local (GAL) por el Departamento de agricultura, ganadería, pesca y alimentación de la Generalitat de Catalunya, que tiene como objetivo principal ""Catalunya central territorio de calidad"" teniendo como pilares centrales:

<ul><li>La valorización del territorio y el entorno como elementos vertebradores de una cohesión y responsabilidad territorial.</li>
<li>Fomentar el espíritu empresarial.</li>
<li>Apostar por el capital humano y la mejora de la ocupabilidad.</li>
</ul>
Para más información, consultar la web <a style="color:white" href="http://www.catcentral.cat/pages/ca/inici.php">http://www.catcentral.cat/pages/ca/inici.php"</a>
   </div>
   <img style="width: 200px;" src="/static/img/Alogo.png">
   <h2 style="padding-top:30px">Inèdit</h2>
   <div v-if="lang=='cat'" style="text-align:left">
   	Inèdit és un estudi d'ecoinnovació estratègica que treballa per a la transició cap a un futur intel·ligent, pròsper i sostenible. Ens aliem amb les organitzacions del demà acompanyant-les a gestionar el canvi que planteja l'economia circular.
   </div>
   <div v-else style="text-align:left">
   	Inèdit es un estudio de ecoinnovación estratégica que trabaja para la transición hacia un futuro inteligente, próspero y sostenible. Nos aliamos con las organizaciones del mañana acompañándolas a gestionar el cambio que plantea la economía circular.
   </div>
   <img style="width: 150px;" src="/static/img/inedit.png">
   <h2>{{"Què és l'economia circular?"|translate}}</h2>
   <div v-if="lang=='cat'" style="text-align:left">
 
L'economia circular és un model econòmic orientat a l'assoliment de sistemes de producció i consum més eficients, que preservin els recursos dins d'un cicle continu i n'optimitzin el seu valor.

Els valors clau de l'economia circular són:
<ul>
<li>Prioritzar els recursos renovables</li>
<li>Conservar els recursos existents</li>
<li>Entendre els residus com recursos útils</li>
<li>Repensar el model de negoci</li>
<li>Ecodissenyar pel futur</li>
<li>Incorporar la tecnologia digital</li>
<li>Col·laborar per crear valor compartit</li>
</ul>

Quins beneficis aporta?
Amb l'economia circular, les economies es poden beneficiar d'estalvis en materials, reducció de l'exposició a la volatilitat de preus i riscs en subministrament, innovació, recerca i coneixement, creació de llocs de treball, reducció d'emissions de Gasos d'Efecte Hivernable i millora de la qualitat de vida."
</div>
<div v-else style="text-align:left">
	
La economía circular es un modelo económico orientado al logro de sistemas de producción y consumo más eficientes, que preserven los recursos dentro de un ciclo continuo y optimicen su valor.
Los valores clave de la economía circular son:
<ul>
<li>Priorizar los recursos renovables</li>
<li>Conservar lo recursos existentes</li>
<li>Entender los residuos como recursos útiles</li>
<li>Repensar el modelo de negocio</li>
<li>Ecodiseñar para el futuro</li>
<li>Incoroporar la tecnología digital</li>
<li>Colaborar para crear valor compartido</li>
</ul>
¿Qué beneficios aporta?
Con la economía circular, las economías se pueden beneficiar de ahorros en materiales, reducción de la exposición a la volatilidad de precios y riesgos en el suministro, innovación, investigación y conocimiento, creación de puestos de trabajo, reducción de emisiones de Gases de Efecto Invernadero y mejora de la calidad de vida."
	</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Qui som'
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
li{
  
}
</style>