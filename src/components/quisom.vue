<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
   <div v-if="lang=='cat'">
   	"L’Associació pel Desenvolupament Rural de la Catalunya Central és una associació sense ànim de lucre, reconeguda com a Grup d’Acció Local (GAL) pel Departament d’agricultura, ramaderia, pesca i alimentació de la Generalitat de Catalunya, que té com objectiu principal “Catalunya central territori de qualitat” tenint com a pilars centrals :

 – La valorització del territori i l’entorn com a elements vertebradors d’una cohesió i responsabilitat territorial. 
– Fomentar l’esperit empresarial. 
– Apostar pel capital humà i la millora de l’ocupabilitat

Per més informació, consultar el web http://www.catcentral.cat/pages/ca/inici.php"
   </div>
   <div v-else>
   	"La Asociación por el Desarrollo Rural de la Cataluña Central es una asociación sin ánimo de lucro, reconocida como Grupo de Acción Local (GAL) por el Departamento de agricultura, ganadería, pesca y alimentación de la Generalitat de Catalunya, que tiene como objetivo principal ""Catalunya central territorio de calidad"" teniendo como pilares centrales:

- La valorización del territorio y el entorno como elementos vertebradores de una cohesión y responsabilidad territorial.
- Fomentar el espíritu empresarial.
- Apostar por el capital humano y la mejora de la ocupabilidad.

Para más información, consultar la web http://www.catcentral.cat/pages/ca/inici.php"
   </div>
   <img style="width: 200px;" src="/static/img/ADCC.png">
   
   <div v-if="lang=='cat'">
   	Inèdit és un estudi d'ecoinnovació estratègica que treballa per a la transició cap a un futur intel·ligent, pròsper i sostenible. Ens aliem amb les organitzacions del demà acompanyant-les a gestionar el canvi que planteja l'economia circular.
   </div>
   <div v-else>
   	Inèdit es un estudio de ecoinnovación estratégica que trabaja para la transición hacia un futuro inteligente, próspero y sostenible. Nos aliamos con las organizaciones del mañana acompañándolas a gestionar el cambio que plantea la economía circular.
   </div>
   <img style="width: 200px;" src="/static/img/inedit.png">
   
   <div v-if="lang=='cat'">
   	"Què és l'economia circular?
L'economia circular és un model econòmic orientat a l'assoliment de sistemes de producció i consum més eficients, que preservin els recursos dins d'un cicle continu i n'optimitzin el seu valor.
Els valors clau de l'economia circular són:
- Prioritzar els recursos renovables
- Conservar els recursos existents
- Entendre els residus com recursos útils
- Repensar el model de negoci
- Ecodissenyar pel futur
- Incorporar la tecnologia digital
- Col·laborar per crear valor compartit

Quins beneficis aporta?
Amb l'economia circular, les economies es poden beneficiar d'estalvis en materials, reducció de l'exposició a la volatilitat de preus i riscs en subministrament, innovació, recerca i coneixement, creació de llocs de treball, reducció d'emissions de Gasos d'Efecte Hivernable i millora de la qualitat de vida."
</div>
<div v-else>
	"¿Qué es la economía circular?
La economía circular es un modelo económico orientado al logro de sistemas de producción y consumo más eficientes, que preserven los recursos dentro de un ciclo continuo y optimicen su valor.
Los valores clave de la economía circular son:
- Priorizar los recursos renovables
- Conservar lo recursos existentes
- Entender los residuos como recursos útiles
- Repensar el modelo de negocio
- Ecodiseñar para el futuro
- Incoroporar la tecnología digital
- Colaborar para crear valor compartido

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

</style>