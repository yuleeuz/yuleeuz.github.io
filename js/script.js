gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(CustomEase);

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

Digital.style.opacity = 0;




window.addEventListener('DOMContentLoaded', function() {

    console.log('Begruessung beginnt');
    Begruessung.play();

``}
);

const Begruessung = gsap.timeline(
	{
		paused: true, onStart: function() {	window.scrollTo(0,2000); }, 
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
				if( GradAkuteDrehung < -30 ) gsap.to( '#Rad', { rotation: Senke + GradAkuteDrehung } )
				else gsap.to( '#Rad', { rotation: ( Senke - Math.log( -GradAkuteDrehung ) ) } )
//				console.log('Senke: '+Senke+' GradAkuteDrehung '+GradAkuteDrehung+' rotation '+this.rotation)
			} if ( GradAkuteDrehung > 1 ){
				if( GradAkuteDrehung > 30 ) gsap.to( '#Rad', { rotation: Senke + GradAkuteDrehung  } )
				else gsap.to( '#Rad', { rotation: ( Senke + Math.log( GradAkuteDrehung ) ) } )
//				console.log('Senke: '+Senke+' GradAkuteDrehung '+GradAkuteDrehung+' rotation '+this.rotation)
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

			gsap.to( ['#Griff', '#Rad'], {  rotation: Senke, ease: CustomEase.create("custom", "M0,0 C0,0 0.454,0.093 0.586,0.45 0.702,0.764 0.651,0.937 0.682,0.978 0.732,1.06 0.79,1.012 0.89,1 0.952,0.99 1,1 1,1"), duration: 1  } );
			GradAkuteDrehung = Senke; 
		}
	}
)





	const test = gsap.fromTo( '#Digital', {opacity: 1}, {
	opacity: 0,
	scrollTrigger: {
		trigger: '#Inhalt',
		start: 'top top',
		end: 'bottom top',                    
		toggleActions: 'reverse reverse reverse reverse',
		scrub: true,
		markers: true,
		                    onToggle: () => {console.log('h')}

	}
})
