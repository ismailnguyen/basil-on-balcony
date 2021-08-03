const { Router } = require('express')
const path = require('path');
const router = Router()
import environmentConfiguration from '../../config'

router.get('/budgets', async function (req, res) {
    let sheet = [];
    var xlsx = require('node-xlsx').default;

    const rows = xlsx.parse(path.resolve(__dirname, '../' + environmentConfiguration.budgetsFilePath));
    for (var i=0; i<rows.length; i++) {
        const nonEmptyDatas = rows[i].data.filter(d => d.length > 0)
        for (var j=0; j<nonEmptyDatas.length; j++) {
            // Ignore headers
            if (j == 0)
                continue;

            sheet.push({
                type: nonEmptyDatas[j][0] || '',
                group: nonEmptyDatas[j][1] || '',
                category: nonEmptyDatas[j][2] || '',
                source: nonEmptyDatas[j][3] || '',
                destination: nonEmptyDatas[j][4] || '',
                amount: nonEmptyDatas[j][5] || '',
                notes: nonEmptyDatas[j][6] || ''
            });
        }
        
    }

    res.json(sheet)
})

module.exports = router
