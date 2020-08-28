const Joi = require('@hapi/joi')

module.exports = {
	product: {
        body: {
			name: Joi.string().required(),
			price: Joi.number().required()
		}
	}
}
