const glovo_client = require('./client')

const {
	messenger,
	orders,
	tracking
} = require('./libs')
const { messenger } = require('./utils')

module.exports = config => {
	const client = glovo_client(config)
	
	return {
		messenger: messenger(client),
		orders: orders(client),
		tracking: tracking(client),
	}
}
