'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')

class AccountsController {

  * store (request, response) {
    const data = request.only('username', 'email', 'password', 'password_confirmation')

    const validation = yield Validator.validateAll(data, {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    })

    if (validation.fails()) {
      yield request.withOut('password', 'password_confirmation')
        .andWith({ errors: validation.messages() }).flash()
      return response.redirect('back')
    }

    delete data['password_confirmation']
    yield User.create(data)

    return response.redirect('/')
  }

}

module.exports = AccountsController
