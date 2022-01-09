const cheerio = require('cheerio')
const { default: Axios } = require('axios')

function herolist(){
            return new Promise((resolve, reject) => {
                  Axios.get('https://mobile-legends.fandom.com/wiki/Mobile_Legends:_Bang_Bang_Wiki')
                  .then(({ data }) => {
                       const $ = cheerio.load(data)
                       let data_hero = []
                       let role_hero = []
                       let url = []
                       $('div > div > span > span > a').get().map((result) => {
                            const name = decodeURIComponent($(result).attr('href').replace('/wiki/',''))
                            const role = decodeURIComponent($(result).attr('href').replace('/wiki/',''))
                            const urln = 'https://mobile-legends.fandom.com' + $(result).attr('href')
                            data_hero.push(name)
                            role_hero.push(role)
                            url.push(urln)
                       })
                       resolve({ status: 200, hero: data_hero , role: role_hero })
                  }).catch((e) => reject({ status: 404, message: e.message }))
             })
        }
        
exports.herolist = herolist
