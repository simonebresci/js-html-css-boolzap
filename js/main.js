
// Milestone 4
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)



// Controlli app da implementare
// - vietare messaggio vuoto


// Vue Application
var app = new Vue ({
  el: '#container',
  data: {
    // UTENTE
    nomeUtente: 'Nome Utente',
    // RICERCA
    chatSearch: '',
    // NUOVO MESSAGGIO
    newMessage: '',
    // UTENTE SELEZIONATO NELLA CHAT
    utenteSelezionato: 0,
    // STORICO CHAT
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
    		visible: true, //Debugging
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
    // CARICA CHAT UTENTE
    caricaUtente: function (index){
      this.utenteSelezionato = index;
    },
    // INVIA MESSAGGIO
    sendMessage: function(index){
      const i = this.utenteSelezionato;
      const msg = this.newMessage;
       //Converti in ora locale ed elimina virgola
      const time = ((new Date()).toLocaleString()).replace (',', '');

      if (msg.length < 1){
        // Non inviare messaggio
      }else{

        // Crea nuovo oggetto in contacts
        this.contacts[i].messages.push({
          date: time,
          text: msg ,
          status: 'sent'
        });

        // Svuota messaggio
        this.newMessage = '';

        this.setTimeoutMethod();
      }

    },
    // SET TIMEOUT METHOD
    setTimeoutMethod: function(){
      // alert('avvio autoResponder');
      setTimeout(this.autoResponder, 1000);
    },
    // AUTORESPONDER - semplice bot
    autoResponder: function(){
      const i = this.utenteSelezionato;
      const time = ((new Date()).toLocaleString()).replace (',', '');
      // ******* REPLICARE SU sendMessage()

      const msg ={
        date: time,
        text: 'ok',
        status: 'received'
      };

      this.contacts[i].messages.push(msg);
    },

    searchContact: function(){
      // Cerca contatti che iniziano con lettere inserite
      const stringa = (this.chatSearch).toLowerCase();

      // Mappa proprietà visibile dei contatti ()
      if (stringa.length < 1){
        // Mostra tutto - filtro disattivato

        // Applica visibilità a tutti gli elementi
        (this.contacts).map( (element) =>{
          element.visible = true;
        });

      }else{

        (this.contacts).map( (element) =>{
          // Destrutturazione oggetto
          let {name} = element;

          // Controlla stringa
          name = name.toLowerCase();
          element.visible = false;
          if (name.startsWith(stringa)){
            element.visible = true;
            // alert('ho trovato fabio');
          }


        });
        // alert('searchContactfinito');
    }
    },

    mapVisible: function(){

    }



  }

});
// TOOL DI SVILUPPO
Vue.config.devtools = true;
