// BUG DA CORREGGERE
// Todo: ultimoMessaggio() legge undefined se viene cancellato ultimo messaggio --> controllare lunghezza array



// Vue Application
var app = new Vue ({
  el: '#container',
  data: {
    nomeUtente: 'Elisa Bianchi',    // UTENTE
    chatSearch: '',                 // FILTRO RICERCA CHAT
    newMessage: '',                 // TESTO NUOVO MESSAGGIO
    utenteSelezionato: 0,           // UTENTE SELEZIONATO NELLA CHAT
    msgCliccato: -1,                // ULTIMO MESSAGGIO CLICCATO
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

      this.chiudiMenuOptions();
    },

    // INVIA MESSAGGIO *********************************************************
    sendMessage: function(index){

      // PREPARAZIONE DATI
      const i = this.utenteSelezionato;
      const msg = this.newMessage;
      // Spostare formattazione data in funzione dedicata
      let time = ((new Date()).toLocaleString('en-US', { hour12: false })).replace (',', ''); //Ora locale + eliminazione virgola
      console.log(time);
      time = dayjs(time).format('MM/DD/YYYY HH:mm:ss');
      console.log(time);
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
        this.setTimeoutMethod(this.autoResponder(msg), 1000); // Richiama auto risponditore
      }

    },
    // SET TIMEOUT METHOD *****************************************************
    setTimeoutMethod: function(fName, timeMs){
      setTimeout(fName, timeMs);
    },


    // AUTORESPONDER - semplice bot ********************************************
    autoResponder: function(msg){
      // PREPARAZIONE DATI
      const i = this.utenteSelezionato;
      // Spostare formattazione data in funzione dedicata

      
      let time = ((new Date()).toLocaleString('en-US', { hour12: false })).replace (',', ''); //Ora locale + eliminazione virgola
      time = dayjs(time).format('MM/DD/YYYY HH:mm:ss');
      let risposta = 'ok';
      let msgRicevuto = msg.toLowerCase();

      // Risposte del bot
      if (msgRicevuto.includes('ciao')){
        risposta = 'Ciao';
      }
      if (msgRicevuto.includes('buongiorno')){
        risposta = 'Buongiornissimo!Caffè!?';
      }
      if (msgRicevuto.includes('buonasera')){
        risposta = 'Buonasera';
      }
      // /Risposte del bot

      //
      const msgObject ={
        date: time,
        text: risposta,
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
    // APRI MENU OPTIONS ******************************************************
    apriMenuOptions:function(index){
      this.msgCliccato = index;
    },
    // INFO MESSAGE ************************************************************
    infoMessage: function(index){
      alert('Hai cliccato il messaggio numero: ' + index);

    },
    // DELETE MESSAGE **********************************************************
    deleteMessage: function(index){
      // PREPARAZIONE DATI
      const utenteCorrente = this.utenteSelezionato;
      const listaContatti = this.contacts[utenteCorrente];
      const listaMessaggi = listaContatti.messages

      // RIMUOVI ELEMENTO IN POSIZIONE INDEX
      listaMessaggi.splice(index,1);

      // CHIUDI MENU OPTIONS
      this.chiudiMenuOptions();
    },

    // ULTIMO MESSAGGIO TEXT ***************************************************
    ultimoMessaggioText: function(index){
      // PREPARAZIONE DATI
      const listaContatti = this.contacts[index];
      const listaMessaggi = listaContatti.messages;
      const indiceUltimoMessaggio = this.contacts[index].messages.length -1;

      let text = listaMessaggi[indiceUltimoMessaggio].text
      const maxChar = 40;

      // ACCORCIA MESSAGGIO LUNGO
      if(text.length > maxChar) {
        text = text.substr(0,maxChar) + '...';
      }

      return text;

    },
    // ULTIMO MESSAGGIO DATA  **************************************************
    ultimoMessaggioDate: function(index){
      // PREPARAZIONE DATI
      const listaContatti = this.contacts[index];
      const listaMessaggi = listaContatti.messages;
      const indiceUltimoMessaggio = this.contacts[index].messages.length -1;

      // RITORNA DATA IN FORMATO hh:mm
      return this.mostraOraMessaggi(index, indiceUltimoMessaggio);
    },

    // ULTIMO ACCESSO  *********************************************************
    ultimoAccesso: function(index){

      // RITORNA DATA ULTIMO MESSAGGIO
      // Semplificato con ora dell'ultimo messaggio
      return this.ultimoMessaggioDate(index);
    },

    // MOSTRA ORA MESSAGGI  ****************************************************
    mostraOraMessaggi: function(indexUtente, indexMessaggio){
      // PREPARAZIONE DATI
      const listaContatti = this.contacts[indexUtente];
      const listaMessaggi = listaContatti.messages;

      // Estrai
      const newDate = (listaMessaggi[indexMessaggio].date).substr(11, 5);


      return newDate;

    },
    // VISIBILITA' DROPDOWN  ****************************************************
    visibilityMenu: function(index){
      let visible = false;
      let msgClicked = this.msgCliccato;

      // Visibilità = true se indici uguali
      if (index === msgClicked) {
          visible = true;
      }

      return visible;
    },
    // CHIUDI MENU DROPDOWN*****************************************************
    chiudiMenuOptions: function(){
      this.msgCliccato = -1;
    }

  }

});
// TOOL DI SVILUPPO
Vue.config.devtools = true;
