// 1) Завантаження даних - відобразити статус Завантаження
// 2) Відображення даних які ми завантажили (конвертація даних)
// 3) Якщо є помилка виводимо статус помилки

export class List {
  // STATE - буде відображати статуси
  STATE = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
  }
  // status - окрема властивість яка буде мати одне з 3х значень
  status = null
  //data - дані які ми завантажили
  data = null
  //element - елемент який ми будемо відображати
  element = null

  //updateStatus - функція яка буде приймати  статус та дані та змінювати їх
  updateStatus = (status, data) => {
    this.status = status
    if (data) this.data = data
    this.updataView()
  }

  updataView = () => {}

  loadData = async () => {}

  //convertData - буде конвертувати дані в фронтнед вигляд
  convertData = () => {}
}
