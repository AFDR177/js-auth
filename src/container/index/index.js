document.addEventListener('DOMContentLoaded', () => {
  if (window.session) {
    const { user } = window.session

    console.log(user)

    //Код який виявляє на яку сторінку потрібно перейти користувачу

    if (user.isConfirm) {
      //Якщо є аккаунт підтверджений перехід на стор home
      location.assign('/home')
    } else {
      //Якщо є аккаунт непідтверджений перехід на стор signup-confirm
      location.assign('/signup-confirm')
    }
  } else {
    //Якщо немає аккаунту (немає session) тоді перехід на стор signup
    location.assign('/signup')
  }
})
