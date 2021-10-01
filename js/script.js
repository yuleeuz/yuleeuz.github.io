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


const Begruessung = gsap.timeline(
	{
		paused: true, onStart: function() {	window.scrollTo(0,2000); }, 
	}
)

Begruessung/*
	.set(
		'#Willkommen', {
			opacity: 1,
			onComplete: function() {
				Willkommen.currentTime = 0;
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
			duration: 3
		} )
	.to(
		'.Sterne', {
			opacity: 0.1,
			duration: 5,
			delay: -3,
		} )



let Titel = 0;  //  DIGITAL, MATERIAL, MENTAL
let DrehungRelativZuSenke = 0;
let GradAkuteSternDrehung = 0;
let Senke = 0; let Schwelle = 55;
let SternenSenke = 0; let SternenSchwelle = 0;

gsap.set( '#Griff', {
	xPercent: -50,
	yPercent: -50,
	left: '50%',
	top: '50%'
} )

const Auswaehlen = Draggable.create(

	'#Griff', 
	{	type: 'rotation',
		onDrag: function() {
			DrehungRelativZuSenke = this.rotation - Senke;

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
				gsap.to( '#SterneA', { rotation: SterneLose } );  console.log(SterneLose)
}
			else if( DrehungRelativZuSenke > 1 || DrehungRelativZuSenke < -1 ) { 
				gsap.to( '#Rad', { rotation: Gebremst } );
				gsap.to( '#SterneA', { rotation: SterneGebremst } );  console.log(SterneGebremst)
}

		},

		onRelease: function() {
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
	}
);



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
