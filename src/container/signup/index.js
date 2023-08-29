class SignupForm {
  static value = {} //Сюди будуть записуватись значення з полей вводу

  static validate = (name, value) => {
    // для перевірки валідності даних
    return true
  }

  static submit = () => {
    console.log(this.value)
  }

  static change = (name, value) => {
    console.log(name, value)
    if (this.validate(name, value)) this.value[name] = value
  }
}

window.signupForm = SignupForm
