import express, { Request, response, Response } from 'express'
import { db } from '../config/db'

const record = db.collection('sample')

const add = async (req: Request, res: Response) => {
  try {
    console.log('body:', req.body)
    let resp
    // Checking for multi records or single record
    if (req.body && Array.isArray(req.body)) {
      resp = await record.insertMany(req.body) // DB Insertion
    } else if (req.body) {
      resp = await record.insertOne(req.body) // DB Insertion
    }
    res.status(201).json({
      response: resp,
      message: 'Record created successfully.'
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      response: null,
      message: 'failed'
    })
  }
}

const find = async (req: Request, res: Response) => {
  try {
    let resp
    if (req.body && Array.isArray(req.body)) {
      resp = await record.find().toArray()

      res.json({
        message: 'all records fetched successfully'
      })
    } else {
      resp = await record.find(req.body).toArray()
    }

    res.json({
      message: 'based on request body data fetched successfully',

      resp: resp
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      response: err,
      message: 'Error finding record.'
    })
  }
}
const updateRecord = async (req: Request, res: Response) => {
  try {
    const resp = await record.updateOne(
      { name: req.body.name },

      { $set: req.body }
    )

    res.json({
      message: 'updated successfully',
      resp: resp
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: err,
      message: 'Error finding record.'
    })
  }
}
const deleteRecord = async (req: Request, res: Response) => {
  try {
    let resp
    if (req.body && Array.isArray(req.body)) {
      resp = await record.deleteMany(req.body).toArray()

      res.json({
        message: 'all records fetched successfully'
      })
    } else {
      resp = await record.deleteOne(req.body).toArray()
    }

    res.json({
      message: 'based on request body data fetched successfully',

      resp: resp
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      response: err,
      message: 'Error finding record.'
    })
  }
}

export { add, find, updateRecord, deleteRecord }
