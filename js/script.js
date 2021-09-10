gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);


const Rad = document.getElementById('Rad');
const Emblem = document.getElementById('Emblem');
const Griff = document.getElementById('Griff');

Emblem.style.display = 'none';

/*
const Begruessung = gsap.timeline(
	{
		paused: true
	}
)

Begruessung
	.to( 
		['#Emblem', '#Rad'], {
			opacity: 0
		}
		)
	.to(
		'#Willkommen', {
			opacity: 0,
			delay: 3
		}
		)
	.to( 
		['#Emblem', '#Rad'], {
			opacity: 1,
			duration: 1
		}
		)

window.addEventListener('load', () => {
    Begruessung.play();
});

*/

let Breite = Rad.clientWidth;
Griff.style.height = Breite + 'px';
Griff.style.width = Breite + 'px';

let Titel = 0; // 0 DIGITAL, 1 MATERIAL, 2 MENTAL

let Drehung = 0; // Grad akuter Drehung
let Ausrichtung = 0; // Grad des Rades
let Widerstand = 0; // Grad gegen Widerstand akuter Drehung

const Auswahl = Draggable.create(

	'#Griff',{
		type: 'rotation',

		onDrag: function() {
			Drehung = this.rotation;

			if( Drehung < 60 && Drehung > -60 ) {

				Widerstand += 1 / ( 0.5 * Drehung );

				gsap.to( '#Rad', {  rotation: Widerstand  } );

			} if( Drehung > 60 || Drehung < -60 ) {

				this.endDrag();
				gsap.to( '#Griff', {  rotation: 0  } );

				if( Drehung < 0 ){		
					if( Titel == 0 ){  Ausrichtung -= 110;  }
					if( Titel == 1 ){  Ausrichtung -= 125;  }
					if( Titel == 2 ){  Ausrichtung -= 125;  }
	
					Titel = (Titel + 2 )%3;

				} else {
					if( Titel == 0 ){  Ausrichtung += 125;  }
					if( Titel == 1 ){  Ausrichtung += 125;  }
					if( Titel == 2 ){  Ausrichtung += 110;  }
	
					Titel = (Titel + 1)%3;
				}

				gsap.to( '#Rad', {  rotation: Ausrichtung  } );
				Widerstand = Ausrichtung;

				console.log('Gedreht ' + 'A ' + Ausrichtung + ' T ' +  Titel + ' R ' +  this.rotation + ' W ' +  Widerstand);
			}
		},

		onRelease: function() {
			gsap.to( '#Rad', {  rotation: Ausrichtung  } );			

			gsap.to( '#Griff', {  rotation: 0  } );

			Widerstand = Ausrichtung;
				console.log('Losgelassen ' + 'A ' + Ausrichtung + ' T ' +  Titel + ' R ' +  this.rotation + ' W ' +  Widerstand);
		}
		
	}
);






/*
const Schwingen = gsap.timeline(
	{
		paused: true
	}
)

Schwingen
	.to(
		'#Emblem',
		{
			duration: 5, rotation: '360', ease: 'elastic'
		}
	)

const EmblemAnstossen = document.getElementById('Emblem');

EmblemAnstossen.addEventListener('mouseover', () => {
	Schwingen.play();
	Schwingen.restart();
})
EmblemAnstossen.addEventListener('touchstart', () => {
	Schwingen.play();
	Schwingen.restart();
})*/