// Includes anzichè startsWith()
// .map o forEach?


// Vue Application
var app = new Vue ({
  el: '#container',
  data: {
    nomeUtente: 'Nome Utente',      // UTENTE
    chatSearch: '',                 // FILTRO RICERCA CHAT
    newMessage: '',                 // TESTO NUOVO MESSAGGIO
    utenteSelezionato: 0,           // UTENTE SELEZIONATO NELLA CHAT
    contacts: [                     // INFORMAZIONI UTENTE + STORICO CHAT
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
    // CARICA CHAT UTENTE ******************************************************
    caricaChatUtente: function (index){
      this.utenteSelezionato = index;
    },

    // INVIA MESSAGGIO *********************************************************
    sendMessage: function(index){

      // Preparazione dati
      const i = this.utenteSelezionato;
      const msg = this.newMessage;
      const time = ((new Date()).toLocaleString()).replace (',', ''); //Ora locale + eliminazione virgola
      const msgObject = {
        date: time,
        text: msg ,
        status: 'sent'
      };

      // Invio messaggio
      if (msg.length < 1){
        // Non inviare messaggio
      }else{
        // Agggiungi nuovo oggetto messaggio in contacts
        this.contacts[i].messages.push(msgObject);
        this.newMessage = ''; // Svuota messaggio
        this.setTimeoutMethod(this.autoResponder, 1000); // Richiama auto risponditore
      }

    },
    // SET TIMEOUT METHOD *****************************************************
    setTimeoutMethod: function(fName, timeMs){
      setTimeout(fName, timeMs);
    },


    // AUTORESPONDER - semplice bot ********************************************
    autoResponder: function(){
      // Preparazione dati
      const i = this.utenteSelezionato;
      const time = ((new Date()).toLocaleString()).replace (',', '');
      const msgObject ={
        date: time,
        text: 'ok',
        status: 'received'
      };

      // Aggiungi nuovo oggetto messaggio in contacts
      this.contacts[i].messages.push(msgObject);
    },

    // RICERCA CONTATTO - che iniziano con lettere inserite nel filtro**********
    searchContact: function(){
      //Preparazione dati
      const stringa = (this.chatSearch).toLowerCase();
      const listaContatti = this.contacts;

      // Caso filtro non in uso
      if (stringa.length < 1){

        // Applica visibilità a tutti gli elementi
        listaContatti.map( (element) =>{
          element.visible = true;
        });

      // Caso filtro attivo
      }else{

        // Metti visible true su elementi che iniziano con stringa
        listaContatti.map( (element) =>{
          // Destrutturazione oggetto
          let {name} = element;
          name = name.toLowerCase(); //Stinga in minuscolo

          // Imposta visible = true se nome inizia con stringa
          element.visible = false;  //inizializza a false
          if (name.startsWith(stringa)){
            element.visible = true;
          }
        });
      }
    },

  }

});
// TOOL DI SVILUPPO
Vue.config.devtools = true;
