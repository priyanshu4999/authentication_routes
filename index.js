import express from 'express'
import AuthRoutes from './routes/authRoutes.js'
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use('/', AuthRoutes);



app.listen(PORT)
