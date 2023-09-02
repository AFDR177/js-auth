// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')

//Створимо користувача для зручності тестування
// User.create({
//   email: 'test1@gmail.com',
//   password: 12345,
//   role: 1,
// })
// ================================================================

// router.get Створює нам один ентпоїнт

// Цей роутер повертаэ контейнер (тобто сторінку)
router.get('/user-list', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('user-list', {
    // вказуємо назву контейнера
    name: 'user-list',
    // вказуємо назву компонентів
    component: ['back-button'],

    // вказуємо назву сторінки
    title: 'User list page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

// Цей роутер повертає дані
router.get('/user-list-data', function (req, res) {
  const list = User.getList()

  console.log('===Список=====>>>>', list)

  //Перевіряємо чи не порожній список
  if (list.length === 0) {
    return res
      .status(400)
      .json({ message: 'Список користувачів порожній' })
  }

  //якщо список є то
  // ПОвертаємо обєкт list через User.getList()
  // робимо мар для того щоб перетворити список користуваів в потрібні обєкти
  return res.status(200).json({
    // list: list.map((item) => ({
    //   id: item.id,
    //   email: item.email,
    //   role: item.role,
    // })),
    //чи ось так можна
    list: list.map(({ id, email, role }) => ({
      id,
      email,
      role,
    })),
  })
})

//=====

router.get('/user-item', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('user-item', {
    // вказуємо назву контейнера
    name: 'user-item',
    // вказуємо назву компонентів
    component: ['back-button'],

    // вказуємо назву сторінки
    title: 'User item page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

// Цей роутер повертає дані
router.get('/user-item-data', function (req, res) {
  const { id } = req.query

  console.log('=====ID==>', id)

  //Перевіряємо чи є ідентифікатор
  if (!id) {
    return res
      .status(400)
      .json({ message: 'Потрібно передати ID користувача' })
  }

  const user = User.getById(Number(id))

  if (!user) {
    return res
      .status(400)
      .json({ message: 'Користувача з таким ID не існує' })
  }

  //якщо список є то
  // ПОвертаємо обєкт user
  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      isConfirm: user.isConfirm,
    },
  })
})

// Підключаємо роутер до бек-енду
module.exports = router
