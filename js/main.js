// <!-- Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
// Copiate nel vostro data l'array di oggetti contacts, che trovate nella cartella drive, oppure qui in allegato. -->


// JS
// 1) lista contatti
// 2) messaggi nel main


// *GRAFICA*
// 1) struttura + colori
// 2) resize
// 3) icone


// Vue
var app = new Vue ({
  el: '#container',
  data: {
    nomeUtente: 'Nome Utente',
    chatSearch: 'Cerca o inizia una nuova chat',
    newMessage: 'Nuovo messaggio',
    utenteSelezionato: 0,
    // messaggiInviati: [
    //   {
    //   messaggio: 'Inviato1',
    //   ora      : '14:29'
    //   },
    //   {
    //   messaggio: 'Inviato2',
    //   ora      : '17:29'
    //   },
    //   {
    //   messaggio: 'Inviato3',
    //   ora      : '09:29'
    //   },
    // ],
    // messaggiRicevuti: [
    //   {
    //   messaggio: 'Ricevuto1',
    //   ora      : '14:29'
    //   },
    //   {
    //   messaggio: 'Ricevuto2',
    //   ora      : '17:29'
    //   },
    //   {
    //   messaggio: 'Ricevuto3',
    //   ora      : '09:29'
    //   },
    // ],
    // messaggiInviati: [ 'messaggioI1','messaggioI2','messaggioI3',],
    // messaggiRicevuti: [ 'messaggioR1','messaggioR2','messaggioR3',],
    contacts: [
    	{
    		name: 'Michele',
    		avatar: '_1',
    		visible: true,
    		messages: [
    			{
    				date: '10/01/2020 15:30:55',
    				text: 'Hai portato a spasso il cane?',
    				status: 'sent'
    			},
    			{
    				date: '10/01/2020 15:50:00',
    				text: 'Ricordati di dargli da mangiare',
    				status: 'sent'
    			},
    			{
    				date: '10/01/2020 16:15:22',
    				text: 'Tutto fatto!',
    				status: 'received'
    			}
    		],
    	},
    	{
    		name: 'Fabio',
    		avatar: '_2',
    		visible: true,
    		messages: [
    			{
    				date: '20/03/2020 16:30:00',
    				text: 'Ciao come stai?',
    				status: 'sent'
    			},
    			{
    				date: '20/03/2020 16:30:55',
    				text: 'Bene grazie! Stasera ci vediamo?',
    				status: 'received'
    			},
    			{
    				date: '20/03/2020 16:35:00',
    				text: 'Mi piacerebbe ma devo andare a fare la spesa.',
    				status: 'sent'
    			}
    		],
    	},
    	{
    		name: 'Samuele',
    		avatar: '_3',
    		visible: true,
    		messages: [
    			{
    				date: '28/03/2020 10:10:40',
    				text: 'La Marianna va in campagna',
    				status: 'received'
    			},
    			{
    				date: '28/03/2020 10:20:10',
    				text: 'Sicuro di non aver sbagliato chat?',
    				status: 'sent'
    			},
    			{
    				date: '28/03/2020 16:15:22',
    				text: 'Ah scusa!',
    				status: 'received'
    			}
    		],
    	},
    	{
    		name: 'Luisa',
    		avatar: '_4',
    		visible: true,
    		messages: [
    			{
    				date: '10/01/2020 15:30:55',
    				text: 'Lo sai che ha aperto una nuova pizzeria?',
    				status: 'sent'
    			},
    			{
    				date: '10/01/2020 15:50:00',
    				text: 'Si, ma preferirei andare al cinema',
    				status: 'received'
    			}
    		],
    	},
    ]
  },
   methods : {
    caricaUtente: function (index){
      this.utenteSelezionato = index;


    },
    sendMessage: function(){
      let i = this.utenteSelezionato;
      let newMsgIndex = this.contacts[i].messages.length;
      // Crea nuovo oggetto in contacts
      this.contacts[i].messages[newMsgIndex] ={
        date: 'oggi',
        text: 'Messaggio nuovo',
        status: 'sent'
      }

      // Forza rendering a video
      this.$forceUpdate();

    }
  }

});
Vue.config.devtools = true;
