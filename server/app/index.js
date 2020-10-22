const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Item = require('./model')
const router = express.Router()
const app = new express();

mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })


// list = ['吃饭', '睡觉', '打豆豆']

router.get('/', async (req, res) => {
    const list = await Item.find()
    res.send(list)
})

// 添加数据
// router.get('/addItem/:text', (req, res) => {
//     console.log(req.params);
//     list.push(req.params.text)
//     res.send(list)
// })
router.post('/addItem', async (req, res) => {
    console.log('in')
    await new Item({ text: req.body.text }).save()
    const list = await Item.find()
    res.send(list)
})

// 删除数据
router.delete('/deleteItem/:id', async (req, res) => {
    console.log(req.params.id)
    await Item.findByIdAndDelete(req.params.id)
    const list = await Item.find()
    res.send(list)
})

app.use(cors()); // cors必须放在router前面
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router);

app.listen(3000, () => {
    console.log('server listen on 3000');
});