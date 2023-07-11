import { db } from '../db/database.js'

export const authSession = async (req, res) => {
   let { authorization } = req.headers
   authorization = authorization?.replace('Bearer ', '')

   if (!authorization) return res.sendStatus(401)

   try {
      const { userID } = await db.collection('sessions').findOne({ token: authorization })
      if (!userID) return res.sendStatus(422)

      res.sendStatus(200)
   } catch (error) {
      res.sendStatus(500)
   }
}
