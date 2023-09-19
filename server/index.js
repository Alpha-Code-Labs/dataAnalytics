import express from "express"
import readXlsxFile from "read-excel-file/node"
import doetenv from 'dotenv'
import mongoose from "mongoose"
import fs from 'fs'


const schema = new mongoose.Schema({
  indianAndFusionWear:[Object],
  westernWear:[Object],
  lingerie:[Object],
  miscellaneous:[Object]
})

const Model = new mongoose.model('myntra_data', schema)

const finalData = []
const miscelenous = []

doetenv.config()
const app = express()

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;


async function connectToMongoDB() {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
      app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    } catch (error) {
      console.error(`${error} did not connect`);
    }
  }
  connectToMongoDB();


const brandItems = []

let lastBrand = 'Aaheli'
let lastBrandIndex = 0
let lastCategoryHeader = 'Indian & Fusion Wear'  //can only be 'Indian & Fusion Wear', 'Western Wear', 'Lingerie & Sleepwear'
let lastCategoryHeaderIndex = 0



readXlsxFile('./data.xlsx').then((rows) => {
  console.log(rows.length)

  rows.map(async (row, index)=>{
    if(index>0){
        const brandName = row[0]
        const categoryHeader = row[1]
        const categoryName = row[2]
        const identifiers = [row[3], row[4], row[5]]

        let col=5;
        let obj = {categoryHeader, categoryName, identifiers}
        let items = []

        for(let i=0; i<6; i++){
            const subCategory = row[++col]
            const minPrice = row[++col]
            const maxPrice = row[++col]
            if(subCategory!=null){
              let push = true
              
              if(push){

               if(categoryHeader == 'Plus Size' || categoryHeader == 'Maternity'){
                let modified = false
                for(let i=lastBrandIndex; i<finalData.length; i++){
                  if(finalData[i].subCategory.toLowerCase() == subCategory.toLowerCase()){
                  //  console.log(`${lastBrand} modified by-${index} modified-${i} from-subCategory: ${finalData[i].subCategory} to-subCategory: ${subCategory} subCategory-${subCategory}`)
                    if(minPrice < finalData[i].minPrice) finalData[i].minPrice = minPrice;
                    if(maxPrice > finalData[i].maxPrice) finalData[i].maxPrice = maxPrice;

                    categoryHeader == 'Plus Size'? finalData[i].identifiers[0] = 'Plus Size' : finalData[i].identifiers[2]='Maternity'
                    modified = true
                    
                   // console.log(finalData[i])
                  }
                }

                if(!modified){
                  miscelenous.push({brandName, categoryHeader, categoryName, identifiers, subCategory, minPrice, maxPrice})
                }

               }

               else{
                
                if(categoryName == 'Sports Wear')
                identifiers[1] = 'Sports Wear'
                //categoryName = ''
                finalData.push({brandName, categoryHeader, categoryName, identifiers, subCategory, minPrice, maxPrice})
               // console.log({brandName, categoryHeader, categoryName, identifiers, subCategory, minPrice, maxPrice})

                if(brandName != lastBrand){
                  lastBrand = brandName
                  lastBrandIndex = index
                  lastCategoryHeader = categoryHeader
                  lastCategoryHeaderIndex = index
                }

                else if(categoryHeader != lastCategoryHeader){
                  lastCategoryHeader = categoryHeader
                  lastCategoryHeaderIndex = index
                }

                //console.log(lastBrand, lastBrandIndex)
               }
              }

            }
                //items.push({name: subCategory, minPrice, maxPrice})
        }
        //brandItems.push[obj]
        //console.log(obj)
    }
  })

  //console.log(finalData)
  //console.log(miscelenous)

  let indianAndFusionWear=[]
  let westernWear=[]
  let lingerie=[]

  let insertCount = 0;

  for(let k=0; k<finalData.length; k++){
    if(finalData[k].categoryHeader == 'Indian & Fusion Wear'){
      indianAndFusionWear.push(finalData[k])
      insertCount++
    }
    if(finalData[k].categoryHeader == 'Western Wear'){
      westernWear.push(finalData[k])
      insertCount++
    }
    if(finalData[k].categoryHeader == 'Lingerie & Sleep Wear'){
      lingerie.push(finalData[k])
      insertCount++
    }
  }

  console.log(finalData.length)
  console.log(miscelenous.length)
  console.log('inserted', insertCount)

  //save to database
  const newFinalData = new Model({indianAndFusionWear, westernWear, lingerie, miscellaneous: miscelenous})
  newFinalData.save()

  let writestream = fs.createWriteStream('./test.xls');
  
  writestream.write("Brand"+"\t"+"Category Header"+"\t"+"Category"+"\t"+"Tag-1"+"\t"+"Tag-2"+"\t"+"Tag-3"+"\t"+"Sub Category"+"\t"+"Min Price"+"\t"+"Max Price"+ "\n")
  for(let i=0; i<finalData.length; i++){
    const brand = finalData[i].brandName
    const header = finalData[i].categoryHeader
    const category = finalData[i].categoryName ? finalData[i].categoryName : ''
    const tag1 = finalData[i].identifiers[0] ? finalData[i].identifiers[0] : ''
    const tag2 = finalData[i].identifiers[1] ? finalData[i].identifiers[1] : ''
    const tag3 = finalData[i].identifiers[2] ? finalData[i].identifiers[2] : ''
    const subCategory = finalData[i].subCategory
    const min = finalData[i].minPrice
    const max = finalData[i].maxPrice

    const row = brand+"\t"+header+"\t"+category+"\t"+tag1+"\t"+tag2+"\t"+tag3+"\t"+subCategory+"\t"+min+"\t"+max + "\n"

    writestream.write(row)
  }

  writestream.close()
})








