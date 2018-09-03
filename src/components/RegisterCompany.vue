
<template>

  <div class="register-wrapper border border-light">
 
    <form class="form-signin" @submit.prevent="register">
      <h2 class="form-signin-heading">{{"Dades de l'empresa"|translate}}</h2>
  {{decoded.identity}}
  
  <div class="form-group">
                <span id="exButton2" v-on:mouseover="showModaltooltip()" >
               <icon name="question-circle"   scale="1.5" style="vertical-align: middle;"/>
            </span>
    <select required class="custom-select" v-model='sector' >
      <option value="" disabled hidden>{{'Sector'|translate}}</option>

  <option v-for="sectorItem in sectorCategories" v-bind:value="sectorItem"> 
    {{sectorItem|translate}}
  </option>
</select>
</div>
<div v-if="sector" class="form-group">

          <select  required class="custom-select" v-model='subsector'>
<option value="" disabled hidden>{{'Subsector'|translate}}</option>
  <option v-for="(subsectorItem,index) in subsectorCategories" v-bind:value="subsectorItem.item"> 
    {{subsectorItem.item|translate}}  

 
  </option>
</select>
    
</div>

      
      <label for="inputcommercial_name" class="sr-only">{{'nom comercial'|translate}}</label>
      <input v-model="commercial_name" type="text" id="inputcommercial_name" class="form-control" v-bind:placeholder="'Nom comercial'|translate" required autofocus>
      <label for="inputfiscal_name" class="sr-only">fiscal_name </label>
      <input v-model="fiscal_name" type="text" id="inputfiscal_name" class="form-control" placeholder="Fiscal Name" required autofocus>
      <label for="inputnif" class="sr-only">nif </label>
      <input v-model="nif" type="text" id="inputnif" class="form-control" placeholder="NIF" required autofocus>
      {{'Dades de la persona de contacte'|translate}}
      <label for="inputname_surname" class="sr-only">nif </label>

      <input v-model="name_surname" type="text" id="inputname_surname" class="form-control" v-bind:placeholder="'Nom i cognoms'|translate" required autofocus>
      <label for="inputtelephone_number" class="sr-only">telephone_number </label>
      <input v-model="telephone_number" type="text" id="inputtelephone_number" class="form-control" v-bind:placeholder="'Telèfon'|translate" required autofocus>
      <label for="inputdescription" class="sr-only">description </label>
      <div v-if="currentRoute" class="form-check float-left">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="duplication_survey">
        <label class="form-check-label" for="exampleCheck1">{{'Permís per duplicar qüestionaris activa'|translate}}</label>
     </div>
      <input v-model="description" type="text" id="inputdescription" class="form-control" v-bind:placeholder="'Descripció activitat'|translate" required autofocus>
  <div class="form-group">
    <select required class="custom-select" v-model='comarca' >
      <option value="" disabled selected>Comarca</option>
  <option v-for="sectorItem in comarcas" v-bind:value="sectorItem"> 
    {{sectorItem|translate}}
  </option>
</select>
</div>
  <div class="form-group">
    <select required class="custom-select" v-model='territori_leader' >
      <option value="" disabled hidden>{{'Territori Leader'|translate}}</option>
  <option v-for="sectorItem in leaders" v-bind:value="sectorItem"> 
    {{sectorItem|translate}}
  </option>
</select>
</div>
      <label for="inputnumber_workers" class="sr-only">territori_leader </label>
      <input v-model="number_workers" type="text" id="inputnumber_workers" class="form-control " v-bind:placeholder="'Número de treballadors'|translate" required autofocus>
      <button class="btn btn-lg btn-primary btn-block" type="submit">{{status|translate}}</button>
      <span>{{error}}</span>
    </form>
                 <b-modal ref="tooltip" id="tooltip">
  <div v-if="lang=='cat'">
  <table class="table">
<tbody>
<tr >
<td ><span >Sector</span></td>
<td ><span >Subsectors</span></td>
<td ><span >Ampliaci&oacute; d&rsquo;informaci&oacute; per l&rsquo;usuari</span></td>
</tr>
<tr >
<td ><span >Agroalimentari</span></td>
<td ><span >Agricultura i ramaderia</span></td>
<td ><span >Conreus, vivers, producci&oacute; ramadera, producci&oacute; agr&iacute;cola combinada amb la producci&oacute; ramadera, activitats de suport a l'agricultura, ramaderia i preparaci&oacute; posterior a la collita</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Pesca i ca&ccedil;a</span></td>
<td ><span >Pesca, aq&uuml;icultura i ca&ccedil;a</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Productes c&agrave;rnics</span></td>
<td ><span >Sacrifici de bestiar i conservaci&oacute; de carn i elaboraci&oacute; de productes c&agrave;rnics</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Fruites i hortalisses</span></td>
<td ><span >Preparaci&oacute; i conservaci&oacute; de fruites i hortalisses</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Oli</span></td>
<td ><span >Fabricaci&oacute; d'oli d'oliva</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Productes lactis</span></td>
<td ><span >Elaboraci&oacute; de gelats, fabricaci&oacute; de formatges, preparaci&oacute; de llet i altres productes lactis</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Productes de fleca</span></td>
<td ><span >Pa, productes de fleca i pastes aliment&agrave;ries</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Begudes</span></td>
<td ><span >Cervesa, vins, sidra, begudes analcoh&ograve;liques, aig&uuml;es minerals i altres tipus d'aig&uuml;es embotellades</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Altres</span></td>
<td ><span >Elaboraci&oacute; i conservaci&oacute; de peix, crustacis i mol&middot;luscos</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Fabricaci&oacute; d'olis (excepte d'oliva) i greixos</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Fabricaci&oacute; de productes per l'alimentaci&oacute; animal</span></td>
</tr>
<tr >
<td ">&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Ind&uacute;stries del tabac</span></td>
</tr>
<tr >
<td ><span >Industrial</span></td>
<td ><span >Fusta</span></td>
<td ><span >Ind&uacute;stries de la fusta, el suro, cistelleria i esparteria, fabricaci&oacute; de mobles</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Maquin&agrave;ria</span></td>
<td ><span >Fabricaci&oacute; de maquin&agrave;ria agr&agrave;ria i forestal, fabricaci&oacute; de m&agrave;quines eina, fabricaci&oacute; de vehicles de motor, remolcs i semiremolcs,</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Qu&iacute;mica</span></td>
<td ><span >Fabricaci&oacute; de productes qu&iacute;mics b&agrave;sics, compostos nitrogenats, fertilitzants, pl&agrave;stics, productes agroqu&iacute;mics, pintures i vernissos, sabons, detergents i altres productes qu&iacute;mics</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Metal&middot;l&uacute;rgia</span></td>
<td ><span >Fabricaci&oacute; de productes de ferro i acer, fabricaci&oacute; de productes met&agrave;l&middot;lics, excepte maquin&agrave;ria</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >T&egrave;xtil</span></td>
<td ><span >Industries t&egrave;xtils, confecci&oacute; de peces de vestir, ind&uacute;stria del cuir i del cal&ccedil;at</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Construcci&oacute;</span></td>
<td ><span >Construcci&oacute; d'immobles, construcci&oacute; d'obres d'enginyeria civil, activitats especialitzades de la construcci&oacute;</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Altres</span></td>
<td ><span >Ind&uacute;stries extractives</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Subministrament d'energia el&egrave;ctrica, gas, vapor i aire condicionat</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Subministrament d'aigua, activitats de sanejament, gesti&oacute; de residus i descontaminaci&oacute;</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Ind&uacute;stries del paper i cartr&oacute;</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Fabricaci&oacute; de productes farmac&egrave;utics</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Fabricaci&oacute; de productes inform&agrave;tics, electr&ograve;nics i &ograve;ptics</span></td>
</tr>
<tr >
<td ">&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Altres ind&uacute;stries</span></td>
</tr>
<tr >
<td ><span >Comercial</span></td>
<td ><span >Comer&ccedil; a l'engr&ograve;s i al detall de productes d'alimentaci&oacute;</span></td>
<td ><span >Comer&ccedil; a l'engr&ograve;s i al detall de productes alimentaris i de begudes</span></td>
</tr>
<tr >
<td ">&nbsp;</td>
<td ><span >Comer&ccedil; a l'engr&ograve;s i al detall d'altres productes</span></td>
<td ><span >Comer&ccedil; a l&rsquo;engr&ograve;s i al detall de productes no alimentaris ni begudes</span></td>
</tr>
<tr >
<td ><span >Serveis</span></td>
<td ><span >Transport i emmagatzematge</span></td>
<td ><span >Transport terrestre, per canonades, mar&iacute;tim i aeri, emmagatzematge i activitats afins al transport, activitats postals i de correus</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Restauraci&oacute;</span></td>
<td ><span >Restaurants i establiments de menjars, provisi&oacute; de menjars preparats per a celebracions i altres serveis de menjars, establiments de begudes</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Allotjament</span></td>
<td ><span >Hotels i allotjaments similars, allotjaments tur&iacute;stics, c&agrave;mpings i altres tipus d'allotjaments</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Reparaci&oacute; de vehicles de motor i motocicletes</span></td>
<td ><span >Manteniment i reparaci&oacute; de vehicles de motor i motocicletes</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Activitats professionals, cient&iacute;fiques i t&egrave;cniques</span></td>
<td ><span >Activitats jur&iacute;diques, de consultoria, d'arquitectura i enginyeria, recerca i desenvolupament, publicitat, activitats veterin&agrave;ries i altres activitats professionals, cient&iacute;fiques i t&egrave;cniques</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Activitats sanit&agrave;ries</span></td>
<td ><span >Activitats sanit&agrave;ries, hospital&agrave;ries, m&egrave;diques i odontol&ograve;giques, i activitats de serveis socials</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Educaci&oacute;</span></td>
<td ><span >Educaci&oacute; preprim&agrave;ria, prim&agrave;ria, secund&agrave;ria, postsecund&agrave;ria i altres activitats d'educaci&oacute;</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Activitats art&iacute;stiques, recreatives i d'entreteniment</span></td>
<td >
<p><span >Activitats de creaci&oacute;, art&iacute;stiques i d'espectacles; </span></p>
<p><span >activitats de biblioteques, arxius, museus i</span></p>
<p><span > altres activitats culturals; </span></p>
<p><span >activitats relacionades amb els jocs d'atzar i les apostes; </span></p>
<p><span >activitats esportives, recreatives i d'entreteniment</span></p>
</td>
</tr>
<tr >
<td >&nbsp;</td>
<td ><span >Altres serveis</span></td>
<td ><span >Informaci&oacute; i comunicacions</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Serveis financers i assegurances</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Activitats immobili&agrave;ries i de lloguer</span></td>
</tr>
<tr >
<td >&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Activitats de neteja i jardineria</span></td>
</tr>
<tr >
<td ">&nbsp;</td>
<td >&nbsp;</td>
<td ><span >Altres serveis</span></td>
</tr>
<tr >
<td ><span >P&uacute;blic</span></td>
<td ><span >Administraci&oacute; p&uacute;blica</span></td>
<td ><span >Administraci&oacute; p&uacute;blica, Defensa i Seguretat Social obligat&ograve;ria</span></td>
</tr>
</tbody>
</table>
</div>
<div v-if="lang=='es'" > 
<table  class="table">
<tbody>
<tr >
<td >Sector</td>
<td >Subsectores</td>
<td >Ampliaci&oacute;n de informaci&oacute;n para el usuario</td>
</tr>
<tr >
<td >Agroalimentario</td>
<td>Agricultura y ganader&iacute;a</td>
<td>Cultivos, viveros, producci&oacute;n ganadera, producci&oacute;n agr&iacute;cola combinada con la producci&oacute;n ganadera, actividades de apoyo a la agricultura, ganader&iacute;a y preparaci&oacute;n posterior a la cosecha</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Pesca y caza</td>
<td>Pesca, acuicultura y caza</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Productos c&aacute;rnicos</td>
<td>Sacrificio de ganado y conservaci&oacute;n de carne y elaboraci&oacute;n de productos c&aacute;rnicos</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Frutas y hortalizas</td>
<td>Preparaci&oacute;n y conservaci&oacute;n de frutas y hortalizas</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Aceite</td>
<td>Fabricaci&oacute;n de aceite de oliva</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Productos l&aacute;cteos</td>
<td>Elaboraci&oacute;n de helados, fabricaci&oacute;n de quesos, preparaci&oacute;n de leche y otros productos l&aacute;cteos</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Productos de panader&iacute;a</td>
<td>Pan, productos de panader&iacute;a y pastas alimentarias</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Bebidas</td>
<td>Cerveza, vinos, sidra, bebidas analcoh&oacute;licas, aguas minerales y otros tipos de aguas embotelladas</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Otros</td>
<td>Elaboraci&oacute;n y conservaci&oacute;n de pescado, crust&aacute;ceos y moluscos</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Fabricaci&oacute;n de aceites (excepto de oliva) y grasas</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Fabricaci&oacute;n de productos para la alimentaci&oacute;n animal</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Industrias del tabaco</td>
</tr>
<tr >
<td >Industrial</td>
<td>Madera</td>
<td>Industrias de la madera, el corcho, cestas y espartos, fabricaci&oacute;n de muebles</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Maquinaria</td>
<td>Fabricaci&oacute;n de maquinaria agraria y forestal, fabricaci&oacute;n de m&aacute;quinas herramienta, fabricaci&oacute;n de veh&iacute;culos de motor, remolques y semirremolques</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Qu&iacute;mica</td>
<td>Fabricaci&oacute;n de productos qu&iacute;micos b&aacute;sicos, compuestos nitrogenados, fertilizantes, pl&aacute;sticos, productos agroqu&iacute;micos, pinturas y barnices, jabones, detergentes y otros productos qu&iacute;micos</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Metalurgia</td>
<td>Fabricaci&oacute;n de productos de hierro y acero, fabricaci&oacute;n de productos met&aacute;licos, excepto maquinaria</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Textil</td>
<td>Industrias textiles, confecci&oacute;n de piezas de vestir, industria del cuero y del calzado</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Construcci&oacute;n</td>
<td>Construcci&oacute;n de inmuebles, construcci&oacute;n de obras de ingenier&iacute;a civil, actividades especializadas de la construcci&oacute;n</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Otros</td>
<td>Industrias extractivas</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Suministro de energ&iacute;a el&eacute;ctrica, gas, vapor y aire acondicionado</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Suministro de agua, actividades de saneamiento, gesti&oacute;n de residuos y descontaminaci&oacute;n</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Industrias del papel y cart&oacute;n</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Fabricaci&oacute;n de productos farmac&eacute;uticos</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Fabricaci&oacute;n de productos inform&aacute;ticos, electr&oacute;nicos y &oacute;pticos</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Otras industrias</td>
</tr>
<tr >
<td >Comercial</td>
<td>Comercio al por mayor y al pormenor de productos de alimentaci&oacute;n</td>
<td>Comercio al por mayor y al por menor de productos alimentarios y bebidas</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Comercio al por mayor y al pormenor de otros productos</td>
<td>Comercio al por mayor y al por menor de productos no alimentarios ni bebidas</td>
</tr>
<tr >
<td >Servicios</td>
<td>Transporte y almacenaje</td>
<td>Transporte terrestre, por ca&ntilde;er&iacute;as, mar&iacute;timo y a&eacute;reo, almacenaje y actividades afines al transporte, actividades postales y de correos</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Restauraci&oacute;n</td>
<td>Restaurantes y establecimientos de comida, provisi&oacute;n de comidas preparadas para celebraciones y otros servicios de comidas, establecimientos de bebidas</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Alojamiento</td>
<td>Hoteles y alojamientos similares, alojamientos tur&iacute;sticos, campings y otros tipos de alojamiento</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Reparaci&oacute;n de veh&iacute;culos de motor y motocicletas</td>
<td>Mantenimiento y reparaci&oacute;n de veh&iacute;culos de motor y motocicletas</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Actividades profesionales, cient&iacute;ficas y t&eacute;cnicas</td>
<td>Actividades jur&iacute;dicas, de consultor&iacute;a, de arquitectura e ingenier&iacute;a, investigaci&oacute;n y desarrollo, publicidad, actividades veterinarias y otras actividades profesionales, cient&iacute;ficas y t&eacute;cnicas</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Actividades sanitarias</td>
<td>Actividades sanitarias, hospitalarias, m&eacute;dicas y odontol&oacute;gicas, y actividades de servicios sociales</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Educaci&oacute;n</td>
<td>Educaci&oacute;n pre-primaria, secundaria, postsecundaria y otras actividades de educaci&oacute;n</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Actividades art&iacute;sticas, recreativas y de entretenimiento</td>
<td>Actividades de creaci&oacute;n, art&iacute;sticas y de espect&aacute;culos; actividades de bibliotecas, archivos, museos y otras actividades culturales; actividades relacionadas con los juegos de azar y las apuestas; actividades deportivas, recreativas y de entretenimiento</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>Otros servicios</td>
<td>Informaci&oacute;n y comunicaciones</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Servicios financieros y seguros</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Actividades inmobiliarias y de alquiler</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Actividades de limpieza y jardiner&iacute;a</td>
</tr>
<tr >
<td >&nbsp;</td>
<td>&nbsp;</td>
<td>Otros servicios</td>
</tr>
<tr >
<td >P&uacute;blico</td>
<td>Administraci&oacute;n p&uacute;blica</td>
<td>Administraci&oacute;n p&uacute;blica, Defensa y Seguridad Social obligatoria</td>
</tr>
</tbody>
</table>
</div>
     </b-modal>
  </div>

</template>


<script>
import auth from '../auth/index.js'
import uniq from 'lodash/uniq'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import 'vue-awesome/icons/circle'
import 'vue-awesome/icons/circle-o'
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/arrow-right'
import 'vue-awesome/icons/arrow-left'
import bButton from 'bootstrap-vue/es/components/button/button';
import bFormRadio from 'bootstrap-vue/es/components/form-radio/form-radio';
import bTooltip from 'bootstrap-vue/es/components/tooltip/tooltip';
import Icon from 'vue-awesome/components/Icon'
export default {
  name: 'RegisterCompany',
    components: {
      Icon,
   'b-button': bButton,
   'b-tooltip': bTooltip,
   'b-modal': bModal
  },
  data () {
    return {
    sectors:[],
sector : '',
    subsector : '',
    commercial_name : '',
    fiscal_name : '',
    nif : '',
    number_survey : '',
    duplication_survey : '',
    name_surname : '',
    telephone_number : '',
    description : '',
    comarca : '',
    territori_leader : '',
    number_workers : '',
    error:'',
    decoded:auth.decoded(),
    company_id:'',
    status:'',
    comarcas:[],
    leaders:[]
    }
  },
computed: {
          lang: function () {
      return this.$i18n.locale()
    }
  ,
      currentRoute(){
       //console.log(this.$route.path=='/registerAdmin')
       return this.$route.params.id!=undefined
    },
  sectorCategories () {
    return uniq(this.sectors.map(p => p.sector))
  },
  subsectorCategories () {
    return this.sectors.filter(p => p.sector==this.sector).map(s=>{return {'item':s.subsector, 'info':s.info}})
  }
},
  methods: {
 getSectors(){
  this.$http.get('sectors', { })
    .then(request => this.sectors=request.data)
    .catch(() => "")
},
 getComarcas(){
  this.$http.get('comarcas', { })
    .then(request => this.comarcas=request.data)
    .catch(() => "")
},
 getLeaders(){
  this.$http.get('leaders', { })
    .then(request => this.leaders=request.data)
    .catch(() => "")
},
 fetchCompany () {
  var routeurl=''
  if (this.$route.params.id!=undefined)
      routeurl='company?user_id='+this.$route.params.id
    else
      routeurl='company'
  this.$http.get(routeurl, { headers: auth.getAuthHeader() })
    .then(request =>{ 
     if (request.data.id!='')
      {this.status='Actualitzar'
    this.sector = request.data.sector;
    this.subsector = request.data.subsector;
    this.commercial_name = request.data.commercial_name;
    this.fiscal_name =request.data.fiscal_name;
    this.nif = request.data.nif;
    this.duplication_survey=false ;
    
      this.duplication_survey=request.data.duplication_survey
    
    this.name_surname =request.data.name_surname;
    this.telephone_number = request.data.telephone_number;
    this.description = request.data.description;
    this.comarca = request.data.comarca;
    this.territori_leader = request.data.territori_leader;
    this.number_workers = request.data.number_workers;
    this.company_id= request.data.id
    

  }
      
      else {
        this.status="Donar d'alta la meva empresa"
      }})
    .catch(() => "")
},
 register () {
  var routeurl=''
  if (this.$route.params.id!=undefined)
      routeurl='registrationcompany?user_id='+this.$route.params.id
    else
      routeurl='registrationcompany'
  if (this.company_id=='') {
  this.$http.post(routeurl, { 
    sector : this.sector,
    subsector : this.subsector,
    commercial_name : this.commercial_name,
    fiscal_name : this.fiscal_name,
    nif : this.nif,
    duplication_survey : this.duplication_survey,
    name_surname : this.name_surname,
    telephone_number : this.telephone_number,
    description : this.description,
    comarca : this.comarca,
    territori_leader : this.territori_leader ,
    number_workers : this.number_workers}, { headers: auth.getAuthHeader() })
    .then(request => this.registerSuccessful(request))
    .catch(() => this.registerFailed()) }

    else  {
      this.$http.put('registrationcompany/'+this.company_id, { 
    sector : this.sector,
    subsector : this.subsector,
    commercial_name : this.commercial_name,
    fiscal_name : this.fiscal_name,
    nif : this.nif,
    duplication_survey : this.duplication_survey,
    name_surname : this.name_surname,
    telephone_number : this.telephone_number,
    description : this.description,
    comarca : this.comarca,
    territori_leader : this.territori_leader ,
    number_workers : this.number_workers}, { headers: auth.getAuthHeader() })
    .then(request => this.registerSuccessful(request))
    .catch(() => this.registerFailed())
} },
    registerSuccessful (req) {
      if (this.$route.params.id!=undefined)
         {this.$router.replace(this.$route.query.redirect || '/updatesurvey/'+this.$route.params.id)}
        else
      {this.$router.push("user")}
    },
    registerFailed (message) {
      this.error = message
    },
            showModaltooltip () {
      this.$refs.tooltip.show()
    },
    hideModaltooltip () {
      this.$refs.tooltip.hide()
    }
  },mounted(){this.getSectors(),this.getComarcas(),this.getLeaders(),this.fetchCompany()}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">

body {
  background: #605B56;
}

.register-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
