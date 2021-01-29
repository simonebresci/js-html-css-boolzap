// <!-- Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
// Copiate nel vostro data l'array di oggetti contacts, che trovate nella cartella drive, oppure qui in allegato. -->


// Vue
var app = new Vue ({
  el: '#container',
  data: {
    testoProva: 'testo di prova'
    // inputAttivita: ''
  }
  // methods : {
    // pushElement: function (){
    //   if(this.inputAttivita != ''){
    //     this.listaTodo.push(this.inputAttivita);
    //   }
    // },
    // removeElement: function (index){
    //   // Rimuovere elemento con funzione .filter
    //   this.listaTodo = this.listaTodo.filter( (element,i) =>{
    //     return (i != index);
    //   });
    // }
  // }

});
Vue.config.devtools = true;
