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
  console.log('body:', req.body)
  req.body = req.body ? req.body : {}
  try {
    let resp = await record.find(req.body).toArray()
    console.log('response:', resp)

    res.status(200).json({
      response: resp,
      message: 'fetched successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: null,
      message: 'unable to fetch'
    })
  }
}
const updateRecord = async (req: Request, res: Response) => {
  try {
    let records = await record.find(req.body.where).toArray()
    console.log(records)
    for (const rec of records) {
      console.log(record)
      await record.findOneAndUpdate(
        { Designation: rec.Designation },
        { $set: req.body.data }
      )
      res.status(200).json({
        message: 'updated successfully'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: null,
      message: 'Error finding record.'
    })
  }
}
const deleteRecord = async (req: Request, res: Response) => {
  try {
    let resp = await record.deleteMany(req.body.where)
    console.log('resp: ', resp)
    res.json({
      response: resp,
      message: 'record deleted successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: null,
      message: 'Failed to delete the record'
    })
  }
}

export { add, find, updateRecord, deleteRecord }
