gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);


const Emblem = document.getElementById('Emblem');

const Willkommen = document.getElementById('Willkommen');

const Rad = document.getElementById('Rad');
const Griff = document.getElementById('Griff');

const Digital = document.getElementById('Digital');


Emblem.style.opacity = 0;
Willkommen.style.opacity = 0;

Rad.style.opacity = 0;

let Breite = Rad.clientWidth;
Griff.style.height = Breite + 'px';
Griff.style.width = Breite + 'px';

Digital.style.opacity = 1;




window.addEventListener('load', function() {

    console.log('Begruessung beginnt');
    Begruessung.play();
	window.scrollTo(0,0);

})

const Begruessung = gsap.timeline(
	{
		paused: true
	}
)

Begruessung/*
	.to(
		'#Emblem', {
			opacity: 1,
			duration: 1,
		} )
	.to(
		'#Emblem', {
			opacity: 0,
			duration: 1,
		} )
	.to(
		'#Willkommen', {
			opacity: 1,
			delay: 1,
			onComplete: function() {
				Willkommen.play();
			}
		} )
	.to(
		'#Willkommen', {
			opacity: 0,
			delay: 3.5
		} )*/
	.to( 
		'#Rad', {
			opacity: 1,
			duration: 2
		} )








let Drehung = 0; // Grad akuter Drehung
let Ausrichtung = 0; // Grad des Rades
let Widerstand = 0; // Grad gegen Widerstand akuter Drehung
/*
const AAuswahl = Draggable.create(
	'',{
		type: 'rotation',
		onDrag: function() {

			Drehung = this.rotation;

			if( Drehung < 60 && Drehung > 0 ) {
				Widerstand = Ausrichtung + 2 * Math.log(Drehung);
				gsap.to( '#Rad', {  rotation: Widerstand  } );
			} if ( Drehung > -60 && Drehung < 0 ) {
				Widerstand = Ausrichtung + -2 * Math.log(-Drehung);
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
		}, onRelease: function() {
	
			gsap.to( '#Griff', {  rotation: 0  } );

			gsap.to( '#Rad', {  rotation: Ausrichtung  } );		
			Widerstand = Ausrichtung;

				console.log('Losgelassen ' + 'A ' + Ausrichtung + ' T ' +  Titel + ' R ' +  this.rotation + ' W ' +  Widerstand);
			}
		
	}
);*/




let Titel = 0;  //  DIGITAL, MATERIAL, MENTAL
let Senke = 0;
let GradAkuteDrehung = 0;
let Schwelle = 55;


const Auswaehlen = Draggable.create(

	'#Griff', {
		type: 'rotation',

		onDrag: function() {

			GradAkuteDrehung = this.rotation - Senke;



			if( GradAkuteDrehung < -1 ){
				gsap.to( '#Rad', { rotation: ( Senke - Math.log( -GradAkuteDrehung ) ) } )
				console.log('Senke: '+Senke+' GradAkuteDrehung '+GradAkuteDrehung+' rotation '+this.rotation)
			} if ( GradAkuteDrehung > 1 ){
				gsap.to( '#Rad', { rotation: ( Senke + Math.log( GradAkuteDrehung ) ) } )
				console.log('Senke: '+Senke+' GradAkuteDrehung '+GradAkuteDrehung+' rotation '+this.rotation)
			}



			if( GradAkuteDrehung > Schwelle ){

				Senke += Schwelle;

				if( Titel == 0 ) { Schwelle = 70; // MENTAL -ziehen-> DIGITAL
				} else{ Schwelle = 55; }

				Senke += Schwelle;
				Titel = (Titel +1) %3;
			
			} if( GradAkuteDrehung < -Schwelle ){

				Senke -= Schwelle;

				if( Titel == 2 ) { Schwelle = 70; // MATERIAL -ziehen-> DIGITAL
				} else{ Schwelle = 55; }

				Senke -= Schwelle;
				Titel = (Titel +2) %3;
			}





			
		},

		onRelease: function() {

			gsap.to( ['#Griff', '#Rad'], {  rotation: Senke, ease: 'power1'  } );
			
			GradAkuteDrehung = Senke;

		}
	}
)

const Auswahl = Draggable.create(

	'#Zahnrad', {
		type: 'rotation',

		onDrag: function() {

			



			
		}
	}
)



/*

	const test = gsap.to( Digital, {
	opacity: '1',
	scrollTrigger: {
		trigger: '#Inhalt',
		start: 'bottom top',
		end: 'bottom bottom',                    
		toggleActions: 'none reverse play reverse',
		scrub: true,
		markers: true
	}
})*/
