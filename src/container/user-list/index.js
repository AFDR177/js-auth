import { List } from '../../script/list'
import { USER_ROLE } from '../../script/user'

class UserList extends List {
  constructor() {
    super()

    this.element = document.querySelector('#user-list')
    if (!this.element) throw new Error('Element is null')

    this.loadData()
  }

  // loadData - щоб почати завантажувати дані
  loadData = async () => {
    //вивзиваємо функцію updateStatus, туди передаємо STATE.LOADING (унаслідуємо з класу List)
    this.updateStatus(this.STATE.LOADING)

    // return null
    //Далі все робимо череж try catch
    // робимо get запит

    try {
      const res = await fetch('/user-list-data', {
        method: 'GET',
      })

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
      list: data.list.map((user) => ({
        ...user,
        role: USER_ROLE[user.role],
      })),
    }
  }

  updataView = () => {
    //Прибираємо все що там було
    this.element.innerHTML = ''

    console.log(this.status, this.data)

    switch (this.status) {
      case this.STATE.LOADING:
        this.element.innerHTML = `<div class="user">
        <span class="user__title skeleton"></span>
        <span class="user__sub skeleton"></span>

    </div>
    <div class="user">
        <span class="user__title skeleton"></span>
        <span class="user__sub skeleton"></span>

    </div>
    <div class="user">
        <span class="user__title skeleton"></span>
        <span class="user__sub skeleton"></span>

    </div>`
        break
      case this.STATE.SUCCESS:
        this.data.list.forEach((item) => {
          this.element.innerHTML += `<a href="/user-item?id=${item.id}" class="user user--click">
          <span class="user__title">${item.email}</span>
          <span class="user__sub">${item.role}</span>

      </a>
      `
        })
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
  new UserList()
})
