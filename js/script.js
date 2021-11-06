gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(CustomEase);

const Kern = document.getElementById('Kern');

const Willkommen = document.getElementById('Willkommen');
const Anleitung = document.getElementById('Anleitung');

const Rad = document.getElementById('Rad');
const Griff = document.getElementById('Griff');

const Digital = document.getElementById('Digital');



let Hoehe = Kern.clientHeight/2;



var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
handleDarkmode(darkModeMediaQuery);
function handleDarkmode(e){
	var darkModeOn = e.matches; // true if dark mode is enabled
	var favicon = document.querySelector('link[rel="shortcut icon"]'); 
	if(darkModeOn){  favicon.href = '/favicon-dark.ico';  }else{  favicon.href = '/favicon.ico';  }
}
darkModeMediaQuery.addListener(handleDarkmode);




window.addEventListener('DOMContentLoaded', function() {

    GriffBereiten();
    console.log('Begruessung beginnt');
    Begruessung.play();
	} );

window.addEventListener( 'resize', function() {  

	if( window.innerHeight < window.innerWidth ) {  Rad.style.height = '40%'; Rad.style.width= '';  }
	if( window.innerHeight > window.innerWidth ) {  Rad.style.height = ''; Rad.style.width= '80%';  }

	GriffBereiten(); // Größe Rad entsprechend aktualisieren  

	Hoehe = Kern.clientHeight/2;  } );

window.addEventListener( 'wheel', function() {  Input(); });
window.addEventListener( 'touchstart', function() {  Input(); });




function GriffBereiten(){

	let Breite = Rad.clientWidth;
	Griff.style.height = Breite + 'px';
	Griff.style.width = Breite + 'px';
	NichtGriff.style.height = (Breite - (Breite/100)*40) + 'px';
	NichtGriff.style.width = (Breite - (Breite/100)*40) + 'px';	
}
gsap.set( '#Griff', {
	xPercent: -50,
	yPercent: -50,
	left: '50%',
	top: '50%'
} )

let RadAnhebenID = 0;

const Auswaehlen = Draggable.create(

	'#Griff', 
	{	type: 'rotation',
		onPress: function() {  
			RadAnhebenID = setInterval( RadAnheben, 100 ); },
		onDrag: function() {  
			RadDrehen(this.rotation); },
		onRelease: function() {  
			if( RadAnhebenID != -1 ) clearInterval( RadAnhebenID );
			gsap.to( '#RadSchatten', { opacity: 1, duration: 2  });
			gsap.to( '#RadSchattenWeit', { opacity: 0, duration: 2  });
			if( window.innerHeight < window.innerWidth ) {  gsap.to( Rad, { height: '40%', duration: 2 } ); }
			if( window.innerHeight > window.innerWidth ) {  gsap.to( Rad, { width: '80%', duration: 2 } );  }
			RadLoslassen();
			this.endDrag();
		},
	}
);

function RadAnheben() {

	gsap.to( '#RadSchatten', { opacity: 0 });
	gsap.to( '#RadSchattenWeit', { opacity: 1 });
	if( window.innerHeight < window.innerWidth && Rad.style.height != '41%' ) {  gsap.to( Rad, { height: '41%' } );  } 
	if( window.innerHeight > window.innerWidth && Rad.style.width != '82%' ) {  gsap.to( Rad, { width: '82%' } );  }  
  if( window.innerHeight < window.innerWidth && Rad.style.height == '41%' ) {  gsap.set( Rad, { height: '41%' } ); clearInterval( RadAnhebenID );  } 
	if( window.innerHeight > window.innerWidth && Rad.style.width == '82%' ) {  gsap.set( Rad, { width: '82%' } ); clearInterval( RadAnhebenID );  }  
}






function Input(){

	if( AnleitungLaeuft ){  
		console.log( 'Anleitung wird abgebrochen' );
		Begruessung.seek(11);
		gsap.to( '.Sterne', {
				opacity: 0.15,
				duration: 2,
			} );
		gsap.to( '#RadSchatten', {
				opacity: 1,
				duration: 2,
			} );
		clearInterval( SimulationIntervallID );
		RadLoslassen();
		gsap.to('#Anleitung', {
			opacity: 0,
			onComplete: function() {  Anleitung.style.display = 'none';  }
		} );
		AnleitungLaeuft = 0;
	}  
}




let AnleitungLaeuft = 0;
const Begruessung = gsap.timeline( {
		paused: true, 
		onStart: function() {  window.scrollTo(0, (2000 + Kern.clientHeight/4));
		}

} )

Begruessung
/*
		.set( '#Willkommen', {
				opacity: 1,
				onComplete: function() {
					Willkommen.currentTime = 0;
					Willkommen.play();  }
			} )
		.set( '#Willkommen', {
				onBegin: function() {
					Anleitung.currentTime = 0;
					Anleitung.pause();
					console.log( 'Anleitung laeuft' );
					AnleitungLaeuft = 1;  },
				opacity: 0,
				delay: 3.5,
				onComplete: function() {  
					console.log( 'Begruessung ist abgeschlossen' );
					Willkommen.style.display = 'none';  }
			} )/*/
	.to( '#Rad', {
			opacity: 1, duration: 2
		} )/*
	.to( '#Anleitung', {
			opacity: 1,
			delay: -1,
			onComplete: function() {  Anleitung.play(); Anleitung.playbackRate = 0.9;  }
		} )
		.set( '#Anleitung', {
				delay: 1.6,
				onComplete: function() { SimulationIntervallID = setInterval( RadSimulieren, 50 );  } 
			} )
		.set( '#Anleitung', { 
				delay: 5,
				onBegin: function() {  SimulationIntervallID = setInterval( ScrollSimulieren, 10 );  }  
			} )
		.set( '#Anleitung', {
				delay: 10.5,
				onComplete: function() {  
					console.log( 'Anleitung ist abgeschlossen');
					AnleitungLaeuft = 0; Anleitung.style.display = 'none'; }
			} )/*/
	.to(
		'.Sterne', {
			opacity: 0.1,
			duration: 5,
			delay: -6
		} )
	.to( '#RadSchatten', {
			opacity: 1,
			duration: 2,
		}, '<' );


					Willkommen.style.display = 'none';



let Grad = 0;
let Verschiebung = 0;

let SimulationIntervallID = 0;

function RadSimulieren() {
	if( Anleitung.currentTime >1.6 && Anleitung.currentTime <1.85 ){
			Grad = (Anleitung.currentTime -1.6)/0.20 *5;
			//console.log(1)
		}
	if( Anleitung.currentTime >1.85 && Anleitung.currentTime <2.75 ){
			Grad = (Anleitung.currentTime -1.85)/0.9 *75  +25; 
			//console.log(2)
		}
	if( Anleitung.currentTime >2.75 && Anleitung.currentTime <3.4 ){
			Grad = (Anleitung.currentTime -2.75)/0.65 *120  +100; 
			//console.log(3)
		}
	if( Anleitung.currentTime >3.4 && Anleitung.currentTime <4.2 ) {
			Grad = (Anleitung.currentTime -3.4)/0.8 *95  +220; 
			//console.log(4)
		}
	if( Anleitung.currentTime >4.2 && Anleitung.currentTime <4.6 )	{
			Grad = (Anleitung.currentTime -4.2)/0.4 *70  +315; 
			//console.log(5)
		}
	if( Anleitung.currentTime >5 && Anleitung.currentTime <5.2 )	{
			Grad = -(Anleitung.currentTime -5)/0.2 *5  +385; 
			//console.log(5)
		}
	RadDrehen( Grad );	
	if( Anleitung.currentTime > 5.3 ){ 
		clearInterval( SimulationIntervallID ); RadLoslassen();  }
}

function ScrollSimulieren() {

	if( Anleitung.currentTime >6.3 && Anleitung.currentTime <7 ){
		Verschiebung = -( (Anleitung.clientHeight/2.7)/70 );
		window.scrollBy( 0, Verschiebung );
	}
	if( Anleitung.currentTime >7 && Anleitung.currentTime <7.3 ){
		Verschiebung = -( (Anleitung.clientHeight/7)/30 );
		window.scrollBy( 0, Verschiebung );
	}
	if( Anleitung.currentTime >7.7 && Anleitung.currentTime <8.4 ){
		Verschiebung = ( (Anleitung.clientHeight/3.5)/80 );
		window.scrollBy( 0, Verschiebung );
	}
	if( Anleitung.currentTime >8.4 && Anleitung.currentTime <8.9 ){
		Verschiebung = ( (Anleitung.clientHeight/6)/50 );
		window.scrollBy( 0, Verschiebung );
	}

	if( Anleitung.currentTime > 8.9 ){ 
		clearInterval( SimulationIntervallID ); }
}









let Titel = 0;  //  DIGITAL, MATERIAL, MENTAL
let DrehungRelativZuSenke = 0;
let GradAkuteSternDrehung = 0;
let RadRotation = 0;
let Senke = 0; let Schwelle = 55;
let AnteilLose = 0; // im Uhrzeigersinn aufwärts

function RadDrehen(GriffRotation) {

			DrehungRelativZuSenke = GriffRotation - Senke;

				let Lose = Senke + DrehungRelativZuSenke;
				let Gebremst = 0;

			if( DrehungRelativZuSenke < -Schwelle ){
 
				Senke -= Schwelle;

				if( Titel == 2 ) {  Schwelle = 70;  } else{  Schwelle = 55;  }

				Senke -= Schwelle;

				Titel = (Titel +2) %3;
			} 
			if( DrehungRelativZuSenke > Schwelle ){

				Senke += Schwelle;

				if( Titel == 0 ) {  Schwelle = 70;  } else{  Schwelle = 55;  }

				Senke += Schwelle;

				Titel = (Titel +1) %3;
			} 

			if( DrehungRelativZuSenke < -1 ){

				Gebremst = Senke - Math.log( -DrehungRelativZuSenke );

				AnteilLose = 1 +( DrehungRelativZuSenke +30 ) / ( Schwelle -30 ) / 2

			} if ( DrehungRelativZuSenke > 1 ){

				Gebremst = Senke + Math.log( DrehungRelativZuSenke );

				AnteilLose = ( DrehungRelativZuSenke -30 ) / ( Schwelle -30 ) / 2
			}

			if( DrehungRelativZuSenke > 30 || DrehungRelativZuSenke < -30 ) {
				RadRotation = Rad.style.transform;
				RadRotation = RadRotation.split('(');
				RadRotation = RadRotation[RadRotation.length-1].replace( 'deg)', '' );

				if( Math.round(RadRotation) == Math.round(GriffRotation) ) {  RadGeschwindigkeit = 0.1  };
				gsap.to( ['#Rad','#RadSchatten', '#RadSchattenWeit'], { rotation: GriffRotation, duration: RadGeschwindigkeit,
						onComplete: function() {  if( Math.round(RadRotation) == Math.round(GriffRotation) ) {  RadGeschwindigkeit = 0.1  };  } } );
				/*gsap.to( '#SterneA', { rotation: SterneLose } ); */ }
			else if( DrehungRelativZuSenke > 1 || DrehungRelativZuSenke < -1 ) { 
				gsap.to( ['#Rad','#RadSchatten', '#RadSchattenWeit'], { rotation: Gebremst, duration: 0.75 } );
				RadGeschwindigkeit = 0.75;
				/*gsap.to( '#SterneA', { rotation: SterneGebremst } ); */ }


			console.log( AnteilLose +' ' +Titel +' ' +DrehungRelativZuSenke +' ' +Senke +' ' +Schwelle);
}

function RadLoslassen() {

			gsap.to( ['#Rad','#RadSchatten', '#RadSchattenWeit', '#Griff'], {  
				rotation: Senke, 
				ease: CustomEase.create("custom", "M0,0 C0,0 0.454,0.093 0.586,0.45 0.702,0.764 0.651,0.937 0.682,0.978 0.732,1.06 0.79,1.012 0.89,1 0.952,0.99 1,1 1,1"), 
				duration: 1.4
			} );/*
			gsap.to( '#SterneA', {
				rotation: SternenSenke, 
				ease: 'power', 
				duration: 1.4,
				onComplete: function() {  
					if( SternenSenke >= 60 || SternenSenke <= 60 ){  SternenSenke = SternenSenke%60  };
					gsap.set ( '#SterneA', {  rotation: SternenSenke, } );
				}
			})*/
}







const video = document.querySelector("#GesteMaterial");
let src = video.currentSrc || video.src;
console.log(video, src);

/* Make sure the video is 'activated' on iOS */
function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});


let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: "#Kern",
    start: "top center",
    end: "center center",
    scrub: true
  }
});

once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: video.duration
    },
    {
      currentTime: 0
    }
  );
});




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
/*

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
	} );*/
