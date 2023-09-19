import express from "express"
import readXlsxFile from "read-excel-file/node"
import doetenv from 'dotenv'
import mongoose from "mongoose"
import fs from 'fs'

const finalData = []

doetenv.config()
const app = express()

const filePath = './data.xlsx'

readXlsxFile(filePath).then((rows) => {
  console.log(rows.length)

  rows.map(async (row, index)=>{
    if(index>0){
        const brandName = row[0]
        const categoryHeader = row[1]
        const categoryName = row[2]
        const identifiers = [row[3], row[4], row[5]]

        let col=5;

        for(let i=0; i<6; i++){
            const subCategory = row[++col]
            const minPrice = row[++col]
            const maxPrice = row[++col] 
            if(subCategory!=null)
                finalData.push({brandName, categoryHeader, categoryName, identifiers, subCategory, minPrice, maxPrice })
        }
    }

  })
})


for(let i=0; i<finalData.length; i++){

}







