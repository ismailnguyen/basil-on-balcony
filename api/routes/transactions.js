const { Router } = require('express')
const fs = require('fs');
const path = require('path');
const router = Router()
import environmentConfiguration from '../../config'

function excelDateToJSDate(serial) {
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
 
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate());
 }

router.get('/transactions', async function (req, res) {
    let sheet = [];
    var xlsx = require('node-xlsx').default;

    for (const file of fs.readdirSync(path.resolve(__dirname, '../' + environmentConfiguration.transactionsFolderPath))) {
        const rows = xlsx.parse(path.resolve(__dirname, '../' + environmentConfiguration.transactionsFolderPath + '/' + file));
        for (var i=0; i<rows.length; i++) {
            const nonEmptyDatas = rows[i].data.filter(d => d.length > 0)
            for (var j=0; j<nonEmptyDatas.length; j++) {
                const amount = nonEmptyDatas[j][4].replace(',', '.').replace(/\s+/g, '') || '';

                // Ignore headers and lines with no amount
                if (j == 0 && isNaN(amount))
                    continue;

                sheet.push({
                    date: excelDateToJSDate(nonEmptyDatas[j][0]) || '',
                    category: nonEmptyDatas[j][1] || '',
                    fundSource: nonEmptyDatas[j][2] || '',
                    label: nonEmptyDatas[j][3] || '',
                    amount: amount
                });
            }
            
        }
    }

    res.json(sheet)
})

module.exports = router
