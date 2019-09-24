import 'module-alias/register'
import randomString from 'randomstring'
import { BookModel } from '@Server/api/book/BookModel'

const MAX_PROMISES = 1000

const TOTAL = 100000


const migrate = async () => {
  let promises = []
  let count = 0
  for (let index = 0; index < TOTAL; index++) {
    const title = randomString.generate()
    const author = randomString.generate()
    const description = randomString.generate()

    const bookModel = new BookModel({
      title,
      author,
      description,
      date: new Date(),
    })

    promises.push(bookModel.save())

    if (promises.length >= MAX_PROMISES) {
      await Promise.all(promises)
      count += promises.length
      console.log(`${count} / ${TOTAL}`)
      promises = []
    }
  }
  await Promise.all(promises)
  console.log(`${count} / ${TOTAL}`)
}

migrate().catch(console.error)

