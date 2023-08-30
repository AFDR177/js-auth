class User {
  static USER_ROLE = {
    USER: 1,
    ADMIN: 2,
    DEVELOPER: 3,
  }

  static #list = []
  static #count = 1

  constructor({ email, password, role }) {
    this.id = User.#count++
    this.email = String(email).toLocaleLowerCase()
    this.password = String(password)
    this.role = User.#convertRole(role)
    this.isConfirm = false
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

    console.log(this.#list)

    return user
  }

  //Шукаємо користувача по email і якщо знаходимо то повертаємо його якщо не знаходимо то повертаємо null
  static getByEmail(email) {
    return (
      this.#list.find(
        (user) =>
          user.email === String(email).toLocaleLowerCase(),
      ) || null
    )
  }
}

module.exports = {
  User,
}
