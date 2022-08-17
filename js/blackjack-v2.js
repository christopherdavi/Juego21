var baraja = {
  crearBaraja: function() {
    var nuevaBaraja = [];
    var simbolos = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
                     "J", "Q", "K" ];
    var palos = [ "hearts", "diams", "spades", "clubs" ];  
    var valores = [ 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10 ];
    var colores = [ "negro", "negro", "negro", "negro" ];
    for (var i = 0; i < simbolos.length; i++) {
      for (var j = 0; j < palos.length; j++) {
        nuevaBaraja[nuevaBaraja.length] = { simbolo: simbolos[i], 
            palo: palos[j], valor: valores[i], color: colores[j] };
      }
    }
    return nuevaBaraja;
  }
}



var crupier = { 
  cartas : [], 
  mano : [], 

  inicializar : function (cartas) {
    console.log("crupier.inicializar()");
    this.cartas = [];
    this.mano = [];
    for (var i= 0; i < cartas.length; i++) {
      this.cartas[this.cartas.length] = cartas[i];
    }
  },

  barajar : function(num) {
    console.log("crupier.barajar() - " + num + " intercambios");
    var pos1 = 0; 
    var pos2 = 0;
    var aux = null; 
    for (var i = 0; i < num; i++) {
      pos1 = Math.floor(Math.random() * 52);
      pos2 = Math.floor(Math.random() * 52);
      aux = this.cartas[pos1];
      this.cartas[pos1] = this.cartas[pos2];
      this.cartas[pos2] = aux;
    }
  },

  darCarta : function() {
    var nueva = []; 
    var carta = this.cartas[0];
  
    for (var i = 1; i<this.cartas.length; i++) {
      nueva[nueva.length] = this.cartas[i];
    }
    this.cartas = nueva; 
    return carta; 
  },

  cogerCarta : function(carta) {
    this.mano[this.mano.length] = carta;
  },

  puntuar : function(mano) {
    var totalPuntos = 0; 

    for (var i = 0; i < mano.length; i++) {
      totalPuntos = totalPuntos + mano[i].valor;
    }
    return totalPuntos;
  },

 
  mostrar : function() {
   
    elementoCartasCrupier.innerHTML = htmlArrayCartas("crupier", this.mano);
    elementoPuntosCrupier.innerHTML = crupier.puntuar(this.mano);
   
    var mensaje = "Mano crupier: " + strMano(this.mano) + 
        "  Puntuación: " + crupier.puntuar(this.mano);
    return mensaje;
  }
}


var jugador = {

  mano : [],

  inicializar : function() {
    this.mano = [];
  },

  pedirCarta : function(carta) {
    this.mano[this.mano.length] = carta;
  },

  pasar : function() {
    var mensaje = this.mostrar() + crupier.mostrar();

    if (crupier.puntuar(this.mano) < 21) {
      elementoMensaje.innerHTML = "¿Pasar o Pedir Carta?";
    }
    else {
      console.log("Jugador ha llegado a 21 o lo ha superado");
      return true;
    }
  },

 
  mostrar : function() {
    elementoCartasJugador.innerHTML = htmlArrayCartas("jugador", this.mano);
    elementoPuntosJugador.innerHTML = crupier.puntuar(this.mano);
    var mensaje = "Tu mano: " + strMano(this.mano) + 
        "  Puntuación: " + crupier.puntuar(this.mano) + '\n';
    return mensaje;
  }
}


function strMano(mano) {
  var resultado = "";
  for (var i = 0; i < mano.length; i++) {
    resultado = resultado + mano[i].simbolo + "-" + mano[i].palo + " ";
  }
  return resultado; 
};

function htmlArrayCartas(sujeto, cartas) {
  var str = "";
  var numCartas = cartas.length;
  var NUM_CARTAS_TOTALES = 9;
  var anchoCarta = 40;
  var paddingBorderCarta = 12; 
  var anchoBody = document.body.clientWidth;
  var desplazamiento = (anchoBody - paddingBorderCarta) / 2 - 
      (numCartas + 1) * anchoCarta/2;
  for(var i = 0; i < cartas.length; i++) {
    str += "<div class=\"carta " + 
    cartas[i].color + "\" style=\"position: absolute; left: " +
      (desplazamiento + i * anchoCarta) + "px;\">" +  cartas[i].simbolo + 
      "<br>&" + cartas[i].palo + ";</div>";
  }
  return str;
}

var blackjack = {
  iniciarPartida : function() {
    elementoMensaje         = document.getElementById("mensaje");
    elementoPuntosCrupier   = document.getElementById("puntos_crupier");
    elementoPuntosJugador   = document.getElementById("puntos_jugador");
    elementoCartasCrupier   = document.getElementById("cartas_crupier");
    elementoCartasJugador   = document.getElementById("cartas_jugador");
    elementoBotonPasar      = document.getElementById("pasar");
    elementoBotonPedirCarta = document.getElementById("pedir_carta");

    var mensaje = "";
    elementoBotonPasar.disabled = false;
    elementoBotonPedirCarta.disabled = false;

    elementoPuntosJugador.innerHTML = "0";
    elementoPuntosCrupier.innerHTML = "0";

    console.clear();
    console.log("miBaraja");
    console.log(blackjack.miBaraja);

    miCrupier.inicializar(miBaraja); 
    miCrupier.barajar(200); 
    console.log("\ncrupier.cartas después de barajar");
    console.log(crupier.cartas);

    miJugador.inicializar(); 

    miJugador.pedirCarta(miCrupier.darCarta());
    miCrupier.cogerCarta(miCrupier.darCarta());

    console.log("\nmiCrupier.cartas - Cartas que quedan tras el reparto inicial");
    console.log(miCrupier.cartas);

    console.log("Manos tras reparto inicial -\n" + 
                miJugador.mostrar() + miCrupier.mostrar());

    puntosJugador = miCrupier.puntuar(miJugador.mano);
    if (puntosJugador > 20) {
      this.comprobarGanador();
    }
    else {
      console.log("Turno del jugador ");
      elementoMensaje.innerHTML = "¿Pasar o Pedir Carta?";
    }
  },
  
  botonPedirCarta : function() {
    console.log("Jugador pide carta");
    miJugador.pedirCarta(miCrupier.darCarta());
    console.log(miJugador.mostrar());
    puntosJugador = miCrupier.puntuar(miJugador.mano);
    if (puntosJugador > 20) {
      this.comprobarGanador();
    }
  },

  botonPasar : function() {
    console.log("Jugador pasa");
    this.comprobarGanador();
  },
  
  comprobarGanador : function() {
    elementoBotonPasar.disabled = true;
    elementoBotonPedirCarta.disabled = true;
    puntosJugador = miCrupier.puntuar(miJugador.mano);
    puntosCrupier = miCrupier.puntuar(miCrupier.mano);
    if (puntosJugador <= 21) {
      console.log("Turno del crupier");
      while(puntosCrupier < 17) {
        miCrupier.cogerCarta(miCrupier.darCarta());
        puntosCrupier = miCrupier.puntuar(miCrupier.mano);
        console.log("Crupier tiene puntuación < 17 y coge carta.\n" + 
                    crupier.mostrar());
      }  
      console.log("Comprobación del ganador");
      if (puntosCrupier > 21 || puntosCrupier < puntosJugador) {
        console.log("Crupier se ha pasado de 21");      
        mensaje = "¡Enhorabuena ganas la partida!\n";
      } 
      else {
        if (puntosCrupier > puntosJugador) {
          console.log("Crupier obtiene más puntos"); 
          mensaje = "¡Lo siento has perdido la partida!<br>" + 
              "El crupier obtiene más puntuación\n";
        } 
        else {
          console.log("Crupier y jugador empatan");        
          mensaje = "¡Has empatado la partida!";
        }
      }
    } 
    else { 
      console.log("Jugador se ha pasado de 21");
      mensaje = "¡Lo siento, has perdido la partida!<br>Te has pasado de 21.\n";
    }

    console.log("Resultado ");
    console.log(mensaje + miJugador.mostrar() + miCrupier.mostrar());
    elementoMensaje.innerHTML = mensaje;

  }
}

var miBaraja = baraja.crearBaraja();
var miCrupier = crupier;
var miJugador = jugador;

var puntosJugador = 0;
var puntosCrupier = 0;

var elementoMensaje;
var elementoPuntosCrupier;
var elementoPuntosJugador;
var elementoCartasCrupier;
var elementoCartasJugador;
var elementoBotonPasar;
var elementoBotonPedirCarta;
