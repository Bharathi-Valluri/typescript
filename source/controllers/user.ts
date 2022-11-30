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
  req.body = req.body ? req.body : ' '
  try {
    let resp
    let count
    if ((req.body.skip || req.body.skip === 0) && req.body.take) {
      resp = await record
        .find(req.body.where)
        .limit(req.body.take)
        .skip(req.body.skip)
        .toArray()
      count = await record.countDocuments()
      console.log(count)
      console.log('if block code is executing expectedly')
    } else if ((req.body.remove || req.body.remove === 0) && req.body.pages) {
      resp = await record
        .find({
          $or: [
            { Designation: { $regex: '.*' + req.body.Designation + '.*' } },
            { Name: { $regex: '.*' + req.body.Name + '.*' } }
          ]
        })
        .limit(req.body.pages)
        .skip(req.body.remove)
        .toArray()
      count = await record.countDocuments()
    } else {
      resp = await record.find(req.body).toArray()
    }
    console.log('response:', resp)
    res.status(201).json({
      response: resp,
      message: 'Data fetched from DB successfully',
      count: count
    })
  } catch (error) {
    res.status(400).json({
      error: error,
      message: 'unable to fetch the records from database'
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
        message: 'Records updated successfully'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({
      response: null,
      message: 'Error finding record.'
    })
  }
}
const deleteRecord = async (req: Request, res: Response) => {
  try {
    let resp = await record.deleteMany(req.body.where)
    console.log('resp: ', resp)
    res.status(202).json({
      response: resp,
      message: 'record deleted successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      response: null,
      message: 'Failed to delete the record'
    })
  }
}

export { add, find, updateRecord, deleteRecord }
