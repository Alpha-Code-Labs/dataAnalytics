import readXlsxFile from "read-excel-file/node";
import fs from "fs";

const excelFilePath = './data.xlsx'

readXlsxFile(excelFilePath).then((rows) => {
  console.log(rows.length);
  let bdrows = [];
  rows.map(async (row, index) => {
    if (index > 0) {
      const brandName = row[0];
      const categoryHeader = row[1];
      let categoryName = row[2];
      let identifiers = [row[3], row[4], row[5]];

      let col = 5;

      for (let i = 0; i < 6; i++) {
        const subCategory = row[++col];
        const minPrice = row[++col];
        const maxPrice = row[++col];

        if (subCategory != null) {
          bdrows.push({
            brandName,
            categoryHeader,
            categoryName,
            identifiers,
            subCategory,
            minPrice,
            maxPrice,
          });
        }
      }
    }
  });

  let ws = fs.createWriteStream("./os.xls");
  for (let i = 0; i < bdrows.length; i++) {
    const brand = bdrows[i].brandName;
    const header = bdrows[i].categoryHeader;
    const category = bdrows[i].categoryName ? bdrows[i].categoryName : "";
    const tag1 = bdrows[i].identifiers[0] ? bdrows[i].identifiers[0] : "";
    const tag2 = bdrows[i].identifiers[1] ? bdrows[i].identifiers[1] : "";
    const tag3 = bdrows[i].identifiers[2] ? bdrows[i].identifiers[2] : "";
    let subCategory = bdrows[i].subCategory;
    if(subCategory.toLowerCase() == 'jumpsuit') subCategory = 'Jumpsuits'
    const min = bdrows[i].minPrice;
    const max = bdrows[i].maxPrice;

    const row =
      brand +
      "\t" +
      header +
      "\t" +
      category +
      "\t" +
      tag1 +
      "\t" +
      tag2 +
      "\t" +
      tag3 +
      "\t" +
      subCategory +
      "\t" +
      min +
      "\t" +
      max +
      "\n";
    ws.write(row);
  }
  ws.close()
});


//check output file os.xls



