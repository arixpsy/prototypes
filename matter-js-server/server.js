import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import http from 'http'
import Matter from 'matter-js'
import { Server } from 'socket.io'
import { Env, CorsOrigin } from './src/constants.js'
import { generatePlatforms, generateWalls } from './src/helpers.js'
// import { socket } from '@/socket'

console.log('hello')

const port = Env.PORT
const env = Env.ENV
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
	cors: {
		origin: CorsOrigin[env],
		// credentials: true,
	},
})

app.use(express.static('public'))

app.use(
	cors({
		origin: CorsOrigin[env],
	})
)

app.get('/healthcheck', (_, res) => {
	res.send('MatterJs + Express + Socket.io Server')
})

server.listen(port, () => {
	console.log(`🟢 ${env} server is running on port ${port}`)
	// socket(io)
})

const ForestConfig = {
	key: 'MAP_FOREST',
	dimensions: {
		height: 560,
		width: 1024,
	},
	platform: [
		{
			height: 50,
			width: 1024,
			x: 512, // 1024 / 2
			y: 535, // (560 - 50) + (50 / 2)
		},
	],
	spawn: {
		x: 512,
		y: 300,
	},
}

const MapEngines = {
	FOREST: Matter.Engine.create(),
}

const MapEntities = {
	FOREST: {
		WALLS: generateWalls(ForestConfig.dimensions),
		PLATFORMS: generatePlatforms(ForestConfig.platform),
		PLAYERS: {},
	},
}

Matter.Composite.add(MapEngines.FOREST.world, [
	...MapEntities.FOREST.WALLS,
	...MapEntities.FOREST.PLATFORMS,
])
const toVertices = (e) => e.vertices.map(({ x, y }) => ({ x, y }))
const frameRate = 1000 / 30

setInterval(() => {
	Matter.Engine.update(MapEngines.FOREST, frameRate)

  const players = {}
  for (const key of Object.keys(MapEntities.FOREST.PLAYERS)) {
    players[key] = toVertices(MapEntities.FOREST.PLAYERS[key])
  }
	io.emit('update state', {
		walls: MapEntities.FOREST.WALLS.map(toVertices),
		platforms: MapEntities.FOREST.PLATFORMS.map(toVertices),
    players
	})
}, frameRate)

io.on('connection', (socket) => {
	console.log(`🟢 A user connected: ${socket.id}`)

	MapEntities.FOREST.PLAYERS[socket.id] = Matter.Bodies.rectangle(
		ForestConfig.spawn.x,
		ForestConfig.spawn.y,
		100,
		100
	)
  MapEntities.FOREST.PLAYERS[socket.id].collisionFilter.group = -1
  Matter.Composite.add(MapEngines.FOREST.world, MapEntities.FOREST.PLAYERS[socket.id])

  socket.on('disconnect', function () {
    console.log(`⛔ A user disconnected: ${socket.id}`)
    Matter.Composite.remove(MapEngines.FOREST.world, MapEntities.FOREST.PLAYERS[socket.id])
    delete MapEntities.FOREST.PLAYERS[socket.id]
  })

	socket.on('register', (cb) => cb(ForestConfig.dimensions))
})
