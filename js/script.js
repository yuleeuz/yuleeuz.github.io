gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(CustomEase);

const Emblem = document.getElementById('Emblem');

const Willkommen = document.getElementById('Willkommen');

const Rad = document.getElementById('Rad');
const Griff = document.getElementById('Griff');

const Digital = document.getElementById('Digital');



function GriffBereiten(){

	let Breite = Rad.clientWidth;
	Griff.style.height = Breite + 'px';
	Griff.style.width = Breite + 'px';
	NichtGriff.style.height = (Breite - (Breite/100)*40) + 'px';
	NichtGriff.style.width = (Breite - (Breite/100)*40) + 'px';	
}


window.addEventListener('DOMContentLoaded', function() {

    GriffBereiten();
    console.log('Begruessung beginnt');
    Begruessung.play();

	}
);

window.addEventListener('resize', function() {
	GriffBereiten();
	}
);


var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
handleDarkmode(darkModeMediaQuery);
function handleDarkmode(e){
	var darkModeOn = e.matches; // true if dark mode is enabled
	var favicon = document.querySelector('link[rel="shortcut icon"]'); 
	if(darkModeOn){  favicon.href = '/favicon-dark.ico';  }else{  favicon.href = '/favicon.ico';  }
}
darkModeMediaQuery.addListener(handleDarkmode);







const Begruessung = gsap.timeline(
	{
		paused: true, onStart: function() { 
			window.scrollTo(0, (2000 + window.innerHeight/2)); }, 
	}
)


let RadSimulationID = 0;


Begruessung


	.set(
		'#Willkommen', {
			opacity: 1,
			onComplete: function() {
				Willkommen.currentTime = 0;
				Anleitung.currentTime = 0;
				Anleitung.pause();
				Willkommen.play();
			}
		} )
	.to(
		'#Willkommen', {
			opacity: 0,
			delay: 3.5,
			onComplete: function() {  Willkommen.style.display = 'none';  }
		} )
	.to( 
		'#Rad', {
			opacity: 1,
			duration: 0.5
		} )
	.set(
		'#Anleitung', {
			opacity: 1,
			
			onComplete: function() {
				Willkommen.style.display = 'none';
			},
			onBegin: function() { 
				RadSimulationID = setInterval( RadSimulieren, 100 );
				Anleitung.currentTime = 0;
				Anleitung.play();
				},

		} )
	.to(
		'#Anleitung', {
			opacity: 0,
			delay: 35,			onComplete: function() {  Anleitung.style.display = 'none';  }
		} )
	.to(
		'.Sterne', {
			opacity: 0.1,
			duration: 5,
			delay: -3,
		} )


	let Grad = 0;

function RadSimulieren() {
	if( Anleitung.currentTime >3.35 && Anleitung.currentTime <3.75 ){
			Grad = -(Anleitung.currentTime -3.35)/0.4 *5; 
			//console.log(1)
		}
	if( Anleitung.currentTime >3.75 && Anleitung.currentTime <3.9 ){
			Grad = -(Anleitung.currentTime -3.75)/0.15 *3  -5; 
			//console.log(2)
		}
	if( Anleitung.currentTime >3.9 && Anleitung.currentTime <4.0 ){
			Grad = (Anleitung.currentTime -3.9)/0.2 *20  -8; 
			//console.log(3)
		}
	if( Anleitung.currentTime >4.0 && Anleitung.currentTime <5.8 ) {//bis 100
			Grad = (Anleitung.currentTime -4.1)/1.8 *98  +12; 
			//console.log(4)
		}
	if( Anleitung.currentTime >5.8 && Anleitung.currentTime <6.8 )	{//bis 195
			Grad = (Anleitung.currentTime -5.8)/1 *85  +110; 
			//console.log(5)
		}
	if( Anleitung.currentTime >6.8 && Anleitung.currentTime <8.0 )  {//bis 260
			Grad = (Anleitung.currentTime -6.8)/1.2 *60  +195;	
			//console.log(6)
		}
	if( Anleitung.currentTime >8.0 && Anleitung.currentTime <9.6 ){
			Grad = (Anleitung.currentTime -8.0)/1.6 *70  +255; 
			//console.log(7)
		}
	if( Anleitung.currentTime >9.6 && Anleitung.currentTime <12 ){
			Grad = (Anleitung.currentTime -9.6)/2.4 *80  +325; 
			//console.log(8)
		}
	RadDrehen( Grad );
	console.log(Grad);
	if( Anleitung.currentTime > 12 ){ clearInterval(RadSimulationID); RadLoslassen(); }

}



let Titel = 0;  //  DIGITAL, MATERIAL, MENTAL
let DrehungRelativZuSenke = 0;
let GradAkuteSternDrehung = 0;
let Senke = 0; let Schwelle = 55;
let SternenSenke = 0; let SternenSchwelle = 0;

function RadDrehen(Rotation) {

			DrehungRelativZuSenke = Rotation - Senke;

				let Lose = Senke + DrehungRelativZuSenke;
				let SterneLose = SternenSenke + DrehungRelativZuSenke/Schwelle*SternenSchwelle;
				let Gebremst = 0;
				let SterneGebremst = 0;

			if( DrehungRelativZuSenke < -Schwelle ){
 
				Senke -= Schwelle;
				SternenSenke -= 2*SternenSchwelle;

				if( Titel == 2 ) {  Schwelle = 70;  } else{  Schwelle = 55;  }

				Senke -= Schwelle;

				Titel = (Titel +2) %3;
			} 
			if( DrehungRelativZuSenke > Schwelle ){

				Senke += Schwelle;
				SternenSenke += 2*SternenSchwelle;

				if( Titel == 0 ) {  Schwelle = 70;  } else{  Schwelle = 55;  }

				Senke += Schwelle;

				Titel = (Titel +1) %3;
			} 

			if( DrehungRelativZuSenke < -1 ){

				if( Titel == 0 ) SternenSchwelle = 15;
				if( Titel == 1 ) SternenSchwelle = 9;
				if( Titel == 2 ) SternenSchwelle = 6;
 
				Gebremst = Senke - Math.log( -DrehungRelativZuSenke );

				SterneGebremst = SternenSenke - Math.log( -DrehungRelativZuSenke/Schwelle*SternenSchwelle );

			} if ( DrehungRelativZuSenke > 1 ){

				if( Titel == 0 ) SternenSchwelle = 9;
				if( Titel == 1 ) SternenSchwelle = 6;
				if( Titel == 2 ) SternenSchwelle = 15;

				Gebremst = Senke + Math.log( DrehungRelativZuSenke );

				SterneGebremst = SternenSenke + Math.log( DrehungRelativZuSenke/Schwelle*SternenSchwelle );
			}

			if( DrehungRelativZuSenke > 30 || DrehungRelativZuSenke < -30 ) {
				gsap.to( '#Rad', { rotation: Lose } );
				gsap.to( '#SterneA', { rotation: SterneLose } );  }
			else if( DrehungRelativZuSenke > 1 || DrehungRelativZuSenke < -1 ) { 
				gsap.to( '#Rad', { rotation: Gebremst } );
				gsap.to( '#SterneA', { rotation: SterneGebremst } );  }
}

function RadLoslassen() {

			gsap.to( ['#Rad', '#Griff'], {  
				rotation: Senke, 
				ease: CustomEase.create("custom", "M0,0 C0,0 0.454,0.093 0.586,0.45 0.702,0.764 0.651,0.937 0.682,0.978 0.732,1.06 0.79,1.012 0.89,1 0.952,0.99 1,1 1,1"), 
				duration: 1,
				onComplete: function() {  
					if( Senke >= 360 || Senke <= -360 ){  Senke = Senke%360  };
					gsap.set ( ['#Rad', '#Griff'], {  rotation: Senke, } );
				}
			} );
			gsap.to( '#SterneA', {
				rotation: SternenSenke, 
				ease: 'power', 
				duration: 1,
				onComplete: function() {  
					if( SternenSenke >= 60 || SternenSenke <= 60 ){  SternenSenke = SternenSenke%60  };
					gsap.set ( '#SterneA', {  rotation: SternenSenke, } );
				}
			})
}


gsap.set( '#Griff', {
	xPercent: -50,
	yPercent: -50,
	left: '50%',
	top: '50%'
} )

const Auswaehlen = Draggable.create(

	'#Griff', 
	{	type: 'rotation',
		onDrag: function() { RadDrehen(this.rotation); },

		onRelease: function() { RadLoslassen(); }
	}
);







const Credits = gsap.timeline(
		{  paused: false, repeat: -1  }
	)
Credits
	.to( '#Visuell', { opacity: 1, duration: 2 })
	.to( '#Visuell', { opacity: 0, duration: 2 })
	.to( '#Konzept', { opacity: 1, duration: 2 })
	.to( '#Konzept', { opacity: 0, duration: 2 })
	.to( '#Entwicklung', { opacity: 1, duration: 2 })
	.to( '#Entwicklung', { opacity: 0, duration: 2 })


	const g = gsap.fromTo( 

		'#Digital', 
		{	opacity: 1  }, 
		{	opacity: 0,
				scrollTrigger: {
					trigger: '#Inhalt',
					start: 'top top',
					end: 'bottom top',           
					toggleActions: 'reverse reverse reverse reverse',
					scrub: true,
					//markers: true,
				}
	} );
