gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);



let Rotation = 0;
const Rad = document.getElementById('#Wheel');

const Auswahl = Draggable.create(
	'#Emblem',
	{
		type: 'rotation',
		onDrag: function() {
			Rotation = this.rotation;
			if( Rotation > 60 || Rotation < -60){
				gsap.to('#Emblem', {
					rotation: 0
				})
			} else {
				console.log(Rotation);
				console.log( (Rotation / ( 2 * Rotation )) );
				gsap.to('#Wheel', {
				})
			}
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