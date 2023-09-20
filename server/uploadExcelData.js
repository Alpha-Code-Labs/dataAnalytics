import express from "express";
import readXlsxFile from "read-excel-file/node";
import doetenv from "dotenv";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  indianAndFusionWear: [Object],
  westernWear: [Object],
  lingerie: [Object],
  miscellaneous: [Object],
});

const Model = new mongoose.model("myntra_data", schema);

doetenv.config();
const app = express();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

async function uploadToMongoDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");


let indianAndFusionWear = []
let westernWear = []
let lingerie = []
let miscellaneous = []

let readCount, writeCount = 0

//upload excel to database
readXlsxFile("./data/final/brandData2.xlsx").then((rows) => { 
  console.log('rowCount:', rows.length)
  readCount = rows.length
  rows.map(row=>{
    const brandName = row[0]
    const categoryHeader = row[1]
    const categoryName = row[2]
    const tags = [row[3], row[4], row[5]]
    const subCategory = row[6]
    const minPrice = row[7]
    const maxPrice = row[8]  

    const rowObj = {brandName, categoryHeader, categoryName, tags, subCategory, minPrice, maxPrice}

    if(categoryHeader == 'Indian & Fusion Wear'){
      indianAndFusionWear.push(rowObj)
      writeCount++
    }

    if(categoryHeader == 'Western Wear'){
      westernWear.push(rowObj)
      writeCount++
    }

    if(categoryHeader == 'Lingerie & Sleepwear'){
      lingerie.push(rowObj)
      writeCount++
    }

  })

readXlsxFile("./data/final/miscellaneousData.xlsx").then((rows) => { 
  console.log('rowCount:', rows.length)
  readCount+=rows.length
  rows.map((row, index) =>{
    if(index>0){
      const brandName = row[0]
      const categoryHeader = row[1]
      const categoryName = row[2]
      const tags = [row[3], row[4], row[5]]
      const subCategory = row[6]
      const minPrice = row[7]
      const maxPrice = row[8]  

      const rowObj = {brandName, categoryHeader, categoryName, tags, subCategory, minPrice, maxPrice}

      miscellaneous.push(rowObj)
      writeCount++
    }
  })

})

  //save to database
  const newFinalData = new Model({
    indianAndFusionWear,
    westernWear,
    lingerie,
    miscellaneous,
  });
  newFinalData.save()

  console.log(`read count : ${readCount}  write count : ${writeCount} `)
  

})
  

} catch (error) {
  console.error(`${error} did not connect`);
}
}


uploadToMongoDB()