class FieldSelect {
  static toggle = (target) => {
    const options = target.nextElementSibling

    options.toggleAttribute('active')

    //закриття списку при натисканні будь де
    setTimeout(() => {
      window.addEventListener(
        'click',
        (e) => {
          if (!options.parentElement.contains(e.target))
            options.removeAttribute('active')
        },
        { once: true },
      )
    })
  }

  static change = (target) => {
    const parent = target.parentElement.parentElement
    const list = target.parentElement

    // ===
    // Піднімаюсь на 1 рівень вгору і шукаю якийсь елемент * з атрибутом [active]
    const active = list.querySelector('*[active]')
    //Якщо вона є я її вирубаю
    if (active) active.toggleAttribute('active')

    // ===
    //Додаю атрибут active в target
    target.toggleAttribute('active')

    // ===

    //Отримую головний елемент - parent (на два рівня вище)
    // із li через ul у div.field__container
    //const parent = target.parentElement.parentElement

    //В ньому шукаю .field__value
    const value = parent.querySelector('.field__value')

    if (value) {
      value.innerText = target.innerText
      value.classList.remove('field__value--placeholder')
    }

    // ===

    //Отримую лист (список моїх опцій)
    // const list = target.parentElement

    //Перемикач атрибута active щоб закрити моє поле
    list.toggleAttribute('active')
  }
}

window.fieldSelect = FieldSelect
