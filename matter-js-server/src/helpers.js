import Matter from 'matter-js'

export const generateWalls = ({ height, width }) => [
	Matter.Bodies.rectangle(width / 2, 0, width, 1, { isStatic: true }),
	Matter.Bodies.rectangle(0, height / 2, 1, height, { isStatic: true }),
	Matter.Bodies.rectangle(width, width / 2, 1, width, { isStatic: true }),
	Matter.Bodies.rectangle(width / 2, height, width, 1, { isStatic: true }),
]

export const generatePlatforms = (platforms) =>
	platforms.map(({ height, width, x, y }) =>
		Matter.Bodies.rectangle(x, y, width, height, { isStatic: true })
	)
