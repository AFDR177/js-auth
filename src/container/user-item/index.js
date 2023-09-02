import { List } from '../../script/list'
import { USER_ROLE } from '../../script/user'

class UserItem extends List {
  constructor() {
    super() //щоб працював конструктор у батьківського List

    //достаємо element по id user-item та перевіряємо його чи він є
    this.element = document.querySelector('#user-item')
    if (!this.element) throw new Error('Element is null')

    // достаємо id з URLSearchParams та перевірка чи він є
    this.id = new URLSearchParams(location.search).get('id')

    //якщо id немає тоді перекидаємо на список
    if (!this.id) location.assign('/user-list')

    //далі вмикаємо завантаження...
    this.loadData()
  }

  // loadData - щоб почати завантажувати дані
  loadData = async () => {
    //вивзиваємо функцію updateStatus, туди передаємо STATE.LOADING (унаслідуємо з класу List)
    this.updateStatus(this.STATE.LOADING)
    console.log('ID-item', this.id)
    // return null
    //Далі все робимо череж try catch
    // робимо get запит

    try {
      const res = await fetch(
        `/user-item-data?id=${this.id}`,
        {
          method: 'GET',
        },
      )

      //Отримаємо дані
      const data = await res.json()

      //Перевіряємо чи отримані дані
      if (res.ok) {
        this.updateStatus(
          this.STATE.SUCCESS,
          this.convertData(data),
        )
      } else {
        this.updateStatus(this.STATE.ERROR, data)
      }
    } catch (err) {
      console.log(err)
      this.updateStatus(this.STATE.ERROR, {
        message: err.message,
      })
    }
  }

  //КОнвертація даних які приходять з сервера (число в строку и типу того)
  //основна логіка в тому щоб перетворити дані в більш зручний вигляд
  convertData = (data) => {
    return {
      ...data,
      user: {
        ...data.user,
        role: USER_ROLE[data.user.role],
        confirm: data.user.isConfirm ? 'Так' : 'Ні',
      },
    }
  }

  updataView = () => {
    //Прибираємо все що там було
    this.element.innerHTML = ''

    console.log(this.status, this.data)

    switch (this.status) {
      case this.STATE.LOADING:
        this.element.innerHTML = `<div class="data">
        <span class="data__title skeleton">ID</span>
        <span class="data__value skeleton"></span>

    </div>
    <div class="data">
        <span class="data__title skeleton">E-mail</span>
        <span class="data__value skeleton"></span>

    </div>
    <div class="data">
        <span class="data__title skeleton">Роль</span>
        <span class="data__value skeleton"></span>

    </div>
    <div class="data">
        <span class="data__title skeleton">Пошта підтверджена?</span>
        <span class="data__value skeleton"></span>

    </div>`
        break
      case this.STATE.SUCCESS:
        const { id, email, role, confirm } = this.data.user

        this.element.innerHTML = `<div class="data">
        <span class="data__title ">ID</span>
        <span class="data__value ">${id}</span>

    </div>
    <div class="data">
        <span class="data__title ">E-mail</span>
        <span class="data__value ">${email}</span>

    </div>
    <div class="data">
        <span class="data__title ">Роль</span>
        <span class="data__value ">${role}</span>

    </div>
    <div class="data">
        <span class="data__title ">Пошта підтверджена?</span>
        <span class="data__value ">${confirm}</span>

    </div>`

        break
      case this.STATE.ERROR:
        this.element.innerHTML = `<span class="alert alert--error">${this.data.message}</span>`
        break
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (
      !window.session ||
      !window.session.user ||
      !window.session.user.isConfirm
    ) {
      location.assign('/')
    }
  } catch (e) {}
  new UserItem()
})
