//Purpose: Transforms the excel data into frontend needs
// Input: brandData4.xlsx
// Output: data.json
//output stucture: check data.json

import readXlsxFile from "read-excel-file/node";
import fs from 'fs'

const excelFilePath = './data/final/brandData4.xlsx'
const data = []


let startTime = Date.now()

readXlsxFile(excelFilePath).then((rows) => {
  console.log(rows.length);
  
  console.log('read File..... time: ', Date.now()-startTime)
  startTime=Date.now()

  rows.map(async (row, index) => {
    if (index > 0) {
        const brandName = row[0];
        const categoryHeader = row[1];
        const categoryName = row[2]
        const tags = [row[3], row[4], row[5]]
        const subCategory = row[6]
        const minPrice = row[7]
        const maxPrice = row[8]
        data.push({brandName, categoryHeader, categoryName, tags, subCategory, minPrice, maxPrice})
      }
    }
  );


  console.log(data.length)

    let final = {}

  console.log(data[2].categoryName, data[1].categoryName)

  let steps = 200

  for (let i = 0; i < data.length; i++) {
    let categoryHeader = final[data[i].categoryHeader];

    if (categoryHeader) {
        let category = categoryHeader[data[i].categoryName];

        if (category) {
            let subCategory = category[data[i].subCategory];

            if (subCategory) {
                // Subcategory exists, so push the data
                subCategory.brands.push({
                    brandName: data[i].brandName,
                    avg: (data[i].minPrice + data[i].maxPrice) / 2,
                    min: data[i].minPrice,
                    max: data[i].maxPrice
                });
                
                // Update brandCount 
                subCategory.brandCount = new Set(subCategory.brands.map(brand => brand.brandName)).size;
                subCategory.minPrice = Math.min(data[i].minPrice, subCategory.minPrice)
                subCategory.maxPrice = Math.max(data[i].maxPrice, subCategory.maxPrice)
                let sum = 0
                subCategory.brands.forEach(brand=>{
                    sum+=brand.avg
                })
                subCategory.avg = sum/subCategory.brands.length
            } else {
                // Subcategory does not exist, create it and then push the data
                category[data[i].subCategory] = {
                    brands: [
                        {
                            brandName: data[i].brandName,
                            avg: (data[i].minPrice + data[i].maxPrice) / 2,
                            min: data[i].minPrice,
                            max: data[i].maxPrice
                        },
                    ],
                    minPrice: data[i].minPrice,
                    maxPrice: data[i].maxPrice,
                    brandCount: 1,
                    avg: (data[i].minPrice + data[i].maxPrice)/2,
                    mass: ((data[i].minPrice + data[i].maxPrice)/2 >= data[i].minPrice)? {
                        brands: [
                            {
                                brandName: data[i].brandName,
                                avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                min: data[i].minPrice,
                                max: data[i].maxPrice
                            },
                        ],
                        minPrice: data[i].minPrice,
                        maxPrice: data[i].maxPrice,
                        brandCount: 1,
                        graphData: [{average:(data[i].minPrice + data[i].maxPrice) / 2, brands: 1 }],
                    } : {brands: [] , brandCount: 0, minPrice:1000000, maxPrice:0, avg:0,  graphData:[]},

                    lux: ((data[i].minPrice + data[i].maxPrice)/2 < data[i].minPrice)? {
                        brands: [
                            {
                                brandName: data[i].brandName,
                                avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                min: data[i].minPrice,
                                max: data[i].maxPrice
                            },
                        ],
                        minPrice: data[i].minPrice,
                        maxPrice: data[i].maxPrice,
                        brandCount: 1,
                        graphData: [{average:(data[i].minPrice + data[i].maxPrice) / 2, brands: 1 }],
                    } : {brands: [] , brandCount: 0, minPrice:1000000, maxPrice:0, avg:0,  graphData:[]}
                }
            }
        } else {
            // Category does not exist, create it, create subcategory, and push the data
            if (data[i].categoryName != undefined) {
                categoryHeader[data[i].categoryName] = {
                    [data[i].subCategory]: {
                        brands: [
                            {
                                brandName: data[i].brandName,
                                avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                min: data[i].minPrice,
                                max: data[i].maxPrice
                            },
                        ],
                        minPrice: data[i].minPrice,
                        maxPrice: data[i].maxPrice,
                        brandCount: 1,
                        avg: (data[i].minPrice + data[i].maxPrice)/2,
                        mass: ((data[i].minPrice + data[i].maxPrice)/2 >= data[i].minPrice)? {
                            brands: [
                                {
                                    brandName: data[i].brandName,
                                    avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                    min: data[i].minPrice,
                                    max: data[i].maxPrice
                                },
                            ],
                            minPrice: data[i].minPrice,
                            maxPrice: data[i].maxPrice,
                            brandCount: 1,
                            graphData: [{average:(data[i].minPrice + data[i].maxPrice) / 2, brands: 1 }],
                        } : {brands: [] , brandCount: 0, minPrice:1000000, maxPrice:0, avg:0,  graphData:[]},

                        lux: ((data[i].minPrice + data[i].maxPrice)/2 < data[i].minPrice)? {
                            brands: [
                                {
                                    brandName: data[i].brandName,
                                    avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                    min: data[i].minPrice,
                                    max: data[i].maxPrice
                                },
                            ],
                            minPrice: data[i].minPrice,
                            maxPrice: data[i].maxPrice,
                            brandCount: 1,
                            graphData: [{average:(data[i].minPrice + data[i].maxPrice) / 2, brands: 1 }],
                        } : {brands: [] , brandCount: 0, minPrice:1000000, maxPrice:0, avg:0,  graphData:[]}
                    },
                };
            } else {
                if (!categoryHeader[data[i].subCategory]) {
                    categoryHeader[data[i].subCategory] = {
                        brands: [
                            {
                                brandName: data[i].brandName,
                                avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                min: data[i].minPrice,
                                max: data[i].maxPrice
                            },
                        ],
                        minPrice: data[i].minPrice,
                        maxPrice: data[i].maxPrice,
                        brandCount: 1,
                        avg: (data[i].minPrice + data[i].maxPrice)/2,
                        mass: ((data[i].minPrice + data[i].maxPrice)/2 >= data[i].minPrice)? {
                            brands: [
                                {
                                    brandName: data[i].brandName,
                                    avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                    min: data[i].minPrice,
                                    max: data[i].maxPrice
                                },
                            ],
                            minPrice: data[i].minPrice,
                            maxPrice: data[i].maxPrice,
                            brandCount: 1,
                            graphData: [{average:(data[i].minPrice + data[i].maxPrice) / 2, brands: 1 }],
                        } : {brands: [] , brandCount: 0, minPrice:1000000, maxPrice:0, avg:0,  graphData:[]},

                        lux: ((data[i].minPrice + data[i].maxPrice)/2 < data[i].minPrice)? {
                            brands: [
                                {
                                    brandName: data[i].brandName,
                                    avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                    min: data[i].minPrice,
                                    max: data[i].maxPrice
                                },
                            ],
                            minPrice: data[i].minPrice,
                            maxPrice: data[i].maxPrice,
                            brandCount: 1,
                            graphData: [{average:(data[i].minPrice + data[i].maxPrice) / 2, brands: 1 }],
                        } : {brands: [] , brandCount: 0, minPrice:1000000, maxPrice:0, avg:0,  graphData:[]}

                    }
                } else {
                    categoryHeader[data[i].subCategory].brands.push(
                        {
                            brandName: data[i].brandName,
                            avg: (data[i].minPrice + data[i].maxPrice) / 2,
                            min: data[i].minPrice,
                            max: data[i].maxPrice
                        },
                    );
                    
                    // Update brandCount for the subcategory
                    const subCategory = categoryHeader[data[i].subCategory]
                    subCategory.brandCount = new Set(categoryHeader[data[i].subCategory].brands.map(brand => brand.brandName)).size;
                    subCategory.minPrice = Math.min(data[i].minPrice, subCategory.minPrice)
                    subCategory.maxPrice = Math.max(data[i].maxPrice, subCategory.maxPrice)
                    let sum = 0
                    subCategory.brands.forEach(brand=>{
                        sum+=brand.avg
                    })
                    subCategory.avg = sum/subCategory.brands.length

                }
            }
        }
    } else {
        // Category header does not exist, create it, create category, create subcategory, and push the data
        if (data[i].categoryName != undefined) {
            final[data[i].categoryHeader] = {
                [data[i].categoryName]: {
                    [data[i].subCategory]: {
                        brands: [
                            {
                                brandName: data[i].brandName,
                                avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                min: data[i].minPrice,
                                max: data[i].maxPrice
                            },
                        ],
                        minPrice: data[i].minPrice,
                        maxPrice: data[i].maxPrice,
                        brandCount: 1,
                        avg: (data[i].minPrice+data[i].maxPrice)/2,
                        mass: ((data[i].minPrice + data[i].maxPrice)/2 >= data[i].minPrice)? {
                            brands: [
                                {
                                    brandName: data[i].brandName,
                                    avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                    min: data[i].minPrice,
                                    max: data[i].maxPrice
                                },
                            ],
                            minPrice: data[i].minPrice,
                            maxPrice: data[i].maxPrice,
                            brandCount: 1,
                            graphData: [{average:(data[i].minPrice + data[i].maxPrice) / 2, brands: 1 }],
                        } : {brands: [] , brandCount: 0, minPrice:1000000, maxPrice:0, avg:0,  graphData:[]},

                        lux: ((data[i].minPrice + data[i].maxPrice)/2 < data[i].minPrice)? {
                            brands: [
                                {
                                    brandName: data[i].brandName,
                                    avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                    min: data[i].minPrice,
                                    max: data[i].maxPrice
                                },
                            ],
                            minPrice: data[i].minPrice,
                            maxPrice: data[i].maxPrice,
                            brandCount: 1,
                            graphData: [{average:(data[i].minPrice + data[i].maxPrice) / 2, brands: 1 }],
                        } : {brands: [] , brandCount: 0, minPrice:1000000, maxPrice:0, avg:0,  graphData:[]}
                    },
                },
            };
        } else {
            final[data[i].categoryHeader] = {
                [data[i].subCategory]: {
                    brands: [
                        {
                            brandName: data[i].brandName,
                            avg: (data[i].minPrice + data[i].maxPrice) / 2,
                            min: data[i].minPrice,
                            max: data[i].maxPrice
                        },
                    ],
                    minPrice: data[i].minPrice,
                    maxPrice: data[i].maxPrice,
                    brandCount: 1,
                    avg: (data[i].minPrice+data[i].maxPrice)/2,
                    mass: ((data[i].minPrice + data[i].maxPrice)/2 >= data[i].minPrice)? {
                        brands: [
                            {
                                brandName: data[i].brandName,
                                avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                min: data[i].minPrice,
                                max: data[i].maxPrice
                            },
                        ],
                        minPrice: data[i].minPrice,
                        maxPrice: data[i].maxPrice,
                        brandCount: 1,
                        graphData: [{average:(data[i].minPrice + data[i].maxPrice) / 2, brands: 1 }],
                    } : {brands: [] , brandCount: 0, minPrice:1000000, maxPrice:0, avg:0,  graphData:[]},

                    lux: ((data[i].minPrice + data[i].maxPrice)/2 < data[i].minPrice)? {
                        brands: [
                            {
                                brandName: data[i].brandName,
                                avg: (data[i].minPrice + data[i].maxPrice) / 2,
                                min: data[i].minPrice,
                                max: data[i].maxPrice
                            },
                        ],
                        minPrice: data[i].minPrice,
                        maxPrice: data[i].maxPrice,
                        brandCount: 1,
                        graphData: [{average:(data[i].minPrice + data[i].maxPrice) / 2, brands: 1 }],
                    } : {brands: [] , brandCount: 0, minPrice:1000000, maxPrice:0, avg:0,  graphData:[]}
                },
            };
        }
    }
}


let noMass = 0
let noLux = 0

let noMassArray = []
let noLuxArray = []

for(const categoryHeader in final){
    if(categoryHeader != ('Indian & Fusion Wear')){
        for(const subCat in final[categoryHeader]){
            const subCategory = final[categoryHeader][subCat]
           
            subCategory.mass.brands = []
                subCategory.lux.brands = []
                subCategory.brands.forEach(brand=>{
                    if(brand.min <= subCategory.avg ){
                        subCategory.mass.brands.push(brand)
                        subCategory.mass.brandCount = new Set(subCategory.mass.brands.map(brand => brand.brandName)).size;
                        subCategory.mass.minPrice = Math.min(brand.min, subCategory.mass.minPrice)
                        subCategory.mass.maxPrice = Math.max(brand.max, subCategory.mass.maxPrice)
                        let sum = 0
                        subCategory.mass.brands.forEach(brand=>{
                            sum+=brand.avg
                        })
                        subCategory.mass.avg = sum/subCategory.mass.brands.length
                        subCategory.mass.graphData = calculateGraphData(steps, subCategory.mass.brands)
                    }
                    else{
                        subCategory.lux.brands.push(brand)
                        subCategory.lux.brandCount = new Set(subCategory.lux.brands.map(brand => brand.brandName)).size;
                        subCategory.lux.minPrice = Math.min(brand.min, subCategory.lux.minPrice)
                        subCategory.lux.maxPrice = Math.max(brand.max, subCategory.lux.maxPrice)
                        let sum = 0
                        subCategory.lux.brands.forEach(brand=>{
                            sum+=brand.avg
                        })
                        subCategory.lux.avg = sum/subCategory.lux.brands.length
                        subCategory.lux.graphData = calculateGraphData(steps, subCategory.lux.brands)
                    }
                })
        }
    }
    else{
        for(const category in final[categoryHeader]){
            for(const subCat in final[categoryHeader][category]){
                const subCategory = final[categoryHeader][category][subCat]
                
                subCategory.mass.brands = []
                subCategory.lux.brands = []
                subCategory.brands.forEach(brand=>{
                    if(brand.min <= subCategory.avg ){
                        subCategory.mass.brands.push(brand)
                        subCategory.mass.brandCount = new Set(subCategory.mass.brands.map(brand => brand.brandName)).size;
                        subCategory.mass.minPrice = Math.min(brand.min, subCategory.mass.minPrice)
                        subCategory.mass.maxPrice = Math.max(brand.max, subCategory.mass.maxPrice)
                        let sum = 0
                        subCategory.mass.brands.forEach(brand=>{
                            sum+=brand.avg
                        })
                        subCategory.mass.avg = sum/subCategory.mass.brands.length
                        subCategory.mass.graphData = calculateGraphData(steps, subCategory.mass.brands)
                    }
                    else{
                        subCategory.lux.brands.push(brand)
                        subCategory.lux.brandCount = new Set(subCategory.lux.brands.map(brand => brand.brandName)).size;
                        subCategory.lux.minPrice = Math.min(brand.min, subCategory.lux.minPrice)
                        subCategory.lux.maxPrice = Math.max(brand.max, subCategory.lux.maxPrice)
                        let sum = 0
                        subCategory.lux.brands.forEach(brand=>{
                            sum+=brand.avg
                        })
                        subCategory.lux.avg = sum/subCategory.lux.brands.length
                        subCategory.lux.graphData = calculateGraphData(steps, subCategory.lux.brands)
                    }
                })
                
            }
        }
}
}

  let writeStream = fs.createWriteStream('./data.json')

  writeStream.write(JSON.stringify(final))
  
  writeStream.close()


  console.log('noMass ', noMass, ' noLux ', noLux)
 console.log(noMassArray)
 console.log(noLuxArray)
  console.log('done !')
  console.log('time taken: ', Date.now()-startTime)
  
  //console.log(JSON.stringify(final))

})

  

function calculateGraphData( step, brandsData ){
    let minAvg = 100000
    let maxAvg = 0
    brandsData.forEach(brand=>{
        if(minAvg > brand.avg) minAvg = brand.avg
        if(maxAvg < brand.avg) maxAvg = brand.avg
    })

    minAvg = Math.floor(minAvg/100)*100
    maxAvg = Math.ceil(maxAvg/100)*100

    let graphPoints = []
    
    for(let i=minAvg; i<=maxAvg; i+=step){
        let average = i
        let brands = 0
        graphPoints.push({average, brands})
    
        for(let j=0; j<brandsData.length; j++){
          const avgPrice = brandsData[j].avg
          if(avgPrice <= i ){
            graphPoints[graphPoints.length-1].brands++ 
          }
        }
     }

     return(graphPoints)
}