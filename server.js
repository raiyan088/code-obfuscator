const JavaScriptObfuscator = require('javascript-obfuscator')
const express = require('express')
const request = require('request')

let app = express()

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000 ...')
})

app.get('/child', async function (req, res) {
    await obfuscator(1, res)
})

app.get('/subChild', async function (req, res) {
    await obfuscator(2, res)
})

app.get('/mining', async function (req, res) {
    await obfuscator(3, res)
})


async function obfuscator(type, res) {
    let mUrl = ''
    if(type == 1) {
        mUrl = 'https://raw.githubusercontent.com/raiyan088/public/main/nodejs/child/server.js'
    } else if(type == 2) {
        mUrl = 'https://raw.githubusercontent.com/raiyan088/public/main/nodejs/subChild/server.js'
    } else if(type == 3) {
        mUrl = 'https://raw.githubusercontent.com/raiyan088/public/main/nodejs/mining/server.js'
    } else {
        mUrl = 'https://raw.githubusercontent.com/raiyan088/public/main/mining/server.js'
    }

    request({
        url: mUrl
    }, function(error, responce, body) {
        if(error || body == null) {
            res.end('error')
        } else {
            let obfuscationResult = JavaScriptObfuscator.obfuscate(body, {
                    compact: false,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1,
                    numbersToExpressions: true,
                    simplify: true,
                    stringArrayShuffle: true,
                    splitStrings: true,
                    stringArrayThreshold: 1
                }
            )

            res.end(obfuscationResult.getObfuscatedCode())
        }
    })
}