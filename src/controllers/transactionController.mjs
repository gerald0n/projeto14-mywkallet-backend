import Joi from 'joi'
import dayjs from 'dayjs'
import { db } from '../db/database.mjs'

export const addTransaction = async (req, res) => {
   const { value, description } = req.body
   let { authorization } = req.headers
   authorization = authorization?.replace('Bearer ', '')
   const { tipo: transactionType } = req.params

   if (!authorization) return res.sendStatus(401)

   const transaction = {
      date: dayjs().format('DD/MM'),
      value: Number.parseFloat(value.replace(',', '.')).toFixed(2),
      description,
      transactionType
   }

   const schemaTransaction = Joi.object({
      value: Joi.number().positive(),
      description: Joi.string().required()
   })

   const validate = schemaTransaction.validate(
      { value: transaction.value, description: transaction.description },
      { abortEarly: false }
   )

   if (value == 0) return res.status(422).send('Digite um valor maior que R$ 0.')

   if (validate.error) {
      const errors = validate.error.details.map((detail) => detail.message)
      return res.status(422).send(errors)
   }

   try {
      const user = await db.collection('sessions').findOne({ token: authorization })
      if (!user) return res.sendStatus(422)

      transaction.userID = user.userID
      await db.collection('transactions').insertOne(transaction)

      res.status(200).send(transaction)
   } catch (error) {
      res.status(500).send(error.message)
   }
}

export const getTransactions = async (req, res) => {
   let { authorization } = req.headers
   authorization = authorization?.replace('Bearer ', '')

   if (!authorization) return res.sendStatus(401)

   try {
      const user = await db.collection('sessions').findOne({ token: authorization })
      if (!user) return res.sendStatus(422)

      const transactionsUser = await db
         .collection('transactions')
         .find({ userID: user.userID })
         .toArray()

      const { name } = await db.collection('users').findOne({ _id: user.userID })

      res.status(200).send({ name, transactionsUser })
   } catch (error) {
      res.status(500).send(error.message)
   }
}