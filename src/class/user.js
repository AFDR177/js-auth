class User {
  static USER_ROLE = {
    USER: 1,
    ADMIN: 2,
    DEVELOPER: 3,
  }

  static #list = []

  constructor({ email, password, role }) {
    this.email = email
    this.password = password
    this.role = User.#convertRole(role)
  }

  //Метод перевірки role  на число, якщо не число то позамовчуванню буде USER
  static #convertRole = (role) => {
    role = Number(role)

    if (isNaN(role)) {
      role = this.USER_ROLE.USER
    }

    role = Object.values(this.USER_ROLE).includes(role)
      ? role
      : this.USER_ROLE.USER

    return role
  }

  //Статичний метод create - приймає дані, створюж юзера і додає його в лист
  static create(data) {
    const user = new User(data)

    this.#list.push(user)
  }
}

module.exports = {
  User,
}