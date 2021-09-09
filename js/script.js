gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);


const Auswahl = Draggable.create(
	'#Emblem',
	{
		type: 'rotation',
		onDrag: function() {
				console.log(this.rotation)}
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