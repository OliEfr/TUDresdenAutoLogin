console.log("pimping table ... maybe :)")

//this needs to be done first
let oldTable = document.getElementsByTagName('table')[2]
let changeTableLink = document.getElementById("changeTableLink")

//insert pimped table with style display:none
getGradesFromTable()
let pimpedTable = document.getElementById('pimpedTable')

//check if hisqisPimpedTable is activated
chrome.storage.local.get(['hisqisPimpedTable'], function (result) {
    result.hisqisPimpedTable ? setPimpedTable() : setOldTable()
})

//listen for event for switching table
changeTableLink.onclick = function () {
    let pimpedTableActivated = pimpedTable.style.display == "none" ? false : true

    //switch table
    pimpedTableActivated ? setOldTable() : setPimpedTable()
    //store permanently
    chrome.storage.local.set({ hisqisPimpedTable: !pimpedTableActivated }, function () { })
}

function setPimpedTable() {
    oldTable.style.display = "none"
    pimpedTable.style.display = "block"
    changeTableLink.innerHTML = "langweiligen, alten Tabelle"
}

function setOldTable() {
    oldTable.style.display = "block"
    pimpedTable.style.display = "none"
    changeTableLink.innerHTML = "neuen, coolen TUfast-Tabelle 🔥"
}

function getGradesFromTable() {
    // create container for vuejs table
    const container = document.createElement('div')
    container.id = 'container'
    const atable = document.getElementsByTagName('table')[2]
    // console.log(atable);
    atable.insertAdjacentElement('afterend', container)
    container.innerHTML = table_html

    let table = []
    // second table is the grade table
    // first table row index with useful information: 2
    const tableRows = [...document.getElementsByTagName('tbody')[2].getElementsByTagName('tr')]

    // collect all data from the table
    tableRows.forEach((row) => {
        let new_row = [];
        [...row.cells].forEach((table_data) => {
            if (table_data.lastElementChild === null) {
                new_row.push(table_data.innerHTML.trim().replace(/&.*;/, ''))
            } else {
                new_row.push(table_data.lastElementChild.innerHTML.trim().replace(/&.*;/, ''))
            }
        })
        table.push(new_row)
    })

    // remove that ugly table from the page
    oldTable.style.display = 'none'

    let levels = {
        mainLevel: [],
        moduleLevel: [],
        examLevel: []
    }

    // Logic to figure out which row is a section, module or exam
    table.filter((row, index) => row[0][1] === '0' || parseInt(row[0]) < 1000 ? levels.mainLevel.push(index) : [])
    table.filter((row, index) => row[0][3] === '0' && levels.mainLevel.indexOf(index) < 0 ? levels.moduleLevel.push(index) : [])
    table.filter((row, index) => levels.mainLevel.indexOf(index) < 0 && levels.moduleLevel.indexOf(index) < 0 && index > 2 ? levels.examLevel.push(index) : [])

    runVue(table, levels)
}

// Vue.js logic, attaches Vue to the new container under the old table and draws the new table
function runVue(table, levels) {
    new Vue({
        el: '#container',
        mounted() {
            console.log('Hello World from Vue!')
        },
        data: {
            table,
            levels,
        },
        methods: {
            getColour(row_index, row) {
                row_index += 2
                const passedText = row[5]
                return this.levels.mainLevel.indexOf(row_index) > -1 ? 'dark' :
                    this.levels.moduleLevel.indexOf(row_index) > -1 ? 'primary' :
                        passedText === '' ? 'dark' : passedText === 'bestanden' ? 'success' : 'danger'
            }
        }
    })
}

undefined