
// todo: Funzione Genera date
// TODO: controllo input utente
// TODO: implementare libreria day.js

// Milestone 5 - BONUS.
// 1)Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
// Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti
//
// Consigli utili:
// Si possono trascurare le scrollbar verticali, sia nel pannello dei messaggi, che nella lista dei contatti
// I pulsanti e le icone possono non funzionare (a parte l’invio del messaggio)
// Per gestire le date, può essere utile la libreria day.js


// Vue Application
var app = new Vue ({
  el: '#container',
  data: {
    nomeUtente: 'Nome Utente',      // UTENTE
    chatSearch: '',                 // FILTRO RICERCA CHAT
    newMessage: '',                 // TESTO NUOVO MESSAGGIO
    utenteSelezionato: 0,           // UTENTE SELEZIONATO NELLA CHAT
    msgCliccato: -1,                  // ULTIMO MESSAGGIO CLICCATO
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

      // PREPARAZIONE DATI
      const i = this.utenteSelezionato;
      const msg = this.newMessage;
      const time = ((new Date()).toLocaleString()).replace (',', ''); //Ora locale + eliminazione virgola
      const msgObject = {
        date: time,
        text: msg ,
        status: 'sent'
      };

      // INVIO MESSAGGIO
      if (msg.length < 1){
      // NON INVIARE MESSAGGIO
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
      // PREPARAZIONE DATI
      const i = this.utenteSelezionato;
      const time = ((new Date()).toLocaleString()).replace (',', '');
      const msgObject ={
        date: time,
        text: 'ok',
        status: 'received'
      };

      // AGGIUNGI NUOVO OGGETTO MESSAGGIO IN CONTACTS
      this.contacts[i].messages.push(msgObject);
    },

    // RICERCA CONTATTO - che iniziano con lettere inserite nel filtro**********
    searchContact: function(){
      //PREPARAZIONE DATI
      const stringa = (this.chatSearch).toLowerCase();
      const listaContatti = this.contacts;

      // CASO FILTRO NON IN USO
      if (stringa.length < 1){

        // Applica visibilità a tutti gli elementi
        listaContatti.forEach( (element) =>{
          element.visible = true;
        });

      // CASO FILTRO ATTIVO
      }else{

        // Metti visible true su elementi che iniziano con stringa
        listaContatti.forEach( (element) =>{
        // Destrutturazione oggetto
        let {name} = element;
        name = name.toLowerCase(); //Stinga in minuscolo

        // Imposta visible = true se nome inizia con stringa o la contiene
        element.visible = false;  //inizializza a false
        if (name.startsWith(stringa) || name.includes(stringa)){
          element.visible = true;
        }
        });
      }
    },

    // BONUS *******************************************************************
    apriMenuOptions:function(index){
        this.msgCliccato = index;
    },
    infoMessage: function(index){
      alert('Hai cliccato il messaggio numero: ' + index);

    },
    deleteMessage: function(index){
      const utenteCorrente = this.utenteSelezionato;
      const listaContatti = this.contacts[utenteCorrente];
      const listaMessaggi = listaContatti.messages

      listaMessaggi.splice(index,1);

    },
    chiudiMenu: function(){
      alert('chiudo');
    },
    ultimoMessaggioText: function(index){
      const listaContatti = this.contacts[index];
      const listaMessaggi = listaContatti.messages
      const indiceUltimoMessaggio = this.contacts[index].messages.length -1

      return listaMessaggi[indiceUltimoMessaggio].text
    },
    ultimoMessaggioDate: function(index){
      const listaContatti = this.contacts[index];
      const listaMessaggi = listaContatti.messages
      const indiceUltimoMessaggio = this.contacts[index].messages.length -1

      return listaMessaggi[indiceUltimoMessaggio].date
    }
    // *************************************************************************

  }

});
// TOOL DI SVILUPPO
Vue.config.devtools = true;
