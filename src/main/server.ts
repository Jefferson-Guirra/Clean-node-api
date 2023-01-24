import express from 'express'
const app = express()
// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
app.listen(5050, () => {
  function test (): void {
    console.log('testando tsx')
  }
  test()
})
