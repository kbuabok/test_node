const Joi = require('@hapi/joi')

const validate = schema => {
	return (req, res, next) => {
		let toValidate = {}
		if (!schema) {
			return next()
		}
		;['params', 'body', 'query'].forEach(key => {
			if (schema[key]) {
				toValidate[key] = req[key]
			}
		})
		return Joi.validate(
			toValidate,
			schema,
			{
				abortEarly: false,
				allowUnknown: true
			},
			err => {
				if (err) {
					return next(err)
				}
				return next()
			}
		)
	}
}

module.exports = validate