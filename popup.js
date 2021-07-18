const shareHTML = '<div style=height:450px;width:510px;overflow:hidden><div class=the-middle style=white-space:nowrap;display:inline><div class=tufast_text><span class=tufasst_name>Hilf deinen Mitstudierenden</span></div><div class="tufast_text" style=position:relative;top:6px><img class="imgicon huge invert" src=/images/tufast48.png style=position:relative;top:-7px;left:0px><span class="tufasst_name huge" style=position:relative;top:-7px;left:3px>TUfast</span><span class=tufasst_name> &nbsp;zu entdecken</span></div><div class=grey><span class=tufasst_name>und <a class=grey_a id=rewards_link href=javascript:void(0)>sammle coole Raketen</a>!</span></div><div id=download-section><div>Teilen mit</div><div class=download-link><img class=imgicon src=icons/gmail.png> <span class=browser_name><a href="mailto:?subject=Probiere%20mal%20TUfast!%20%F0%9F%9A%80&body=Hey%20%3A)%0A%0Akennst%20du%20schon%20TUfast%3F%0A%0ATUfast%20hilft%20beim%20t%C3%A4glichen%20Arbeiten%20mit%20den%20Online-Portalen%20der%20TU%20Dresden.%0ADamit%20spare%20ich%20viel%20Zeit%20und%20nervige%20Klicks.%0A%0ATUfast%20ist%20eine%20Erweiterung%20f%C3%BCr%20den%20Browser%20und%20wurde%20von%20Studenten%20entwickelt.%0AProbiere%20es%20jetzt%20auf%20www.tu-fast.de%20!%0A%0ALiebe%20Gr%C3%BC%C3%9Fe%C2%A0%F0%9F%96%90"target=_blank>E-Mail</a></span></div><div class=download-link><img class=imgicon src=icons/wa2.png style=height:1.4em><span class=browser_name> <a href="https://api.whatsapp.com/send?text=Hey%2C%20kennst%20du%20schon%20TUfast%3F%20%F0%9F%9A%80%0A%0AMacht%20das%20arbeiten%20mit%20allen%20Online-Portalen%20der%20TU%20Dresden%20produktiver%20und%20hat%20mir%20schon%20viel%20Zeit%20und%20nervige%20Klicks%20gespart.%20Eine%20richtig%20n%C3%BCtzliche%20Browsererweiterung%20f%C3%BCr%20Studenten!%0A%0AProbiers%20gleich%20mal%20aus%20auf%20www.tu-fast.de%20%F0%9F%96%90"target=_blank>WhatsApp</a></span></div><div class=download-link><span class=browser_name>oder <a href=https://www.tu-fast.de target=_blank>www.tu-fast.de</a></span></div></div></div><div class=the-bottom><p>Gemacht mit 🖤 von Studenten | <a href=https://github.com/TUfast-TUD/TUfast_TUD target=_blank>GitHub</a> | <a href="mailto:frage@tu-fast.de?subject=Feedback%20TUfast"target=_blank>Kontakt</a></div></div>'
const bananaHTML = '<a href="https://www.buymeacoffee.com/olihausdoerfer" target="_blank"style = "position: fixed; bottom: 68px; right: -66px; width:240px; height: auto;" > <img style="width: 170px;"src="https://img.buymeacoffee.com/button-api/?text=Buy me a banana&emoji=🍌&slug=olihausdoerfer&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"></a>'

//this config is used to customize TUfast for a course of study
//it overrides the default setting from popup.html
//if you want to add an footer icon for your course of study, you need to add it to popup.html and set footer_icons_display property in this config
const studiengang_config = {
    "geowissenschaften": {
        "name": "Geowissenschaften",
        "fsr_icon": "./OfficialIcons/fsr_geo.png",
        "fsr_link": "https://tu-dresden.de/bu/umwelt/geo/fsr",
        "fsr_icon_2": "./icons/OPAL.png",
        "fsr_link_2": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/15833497605",
        "fsr_icon_dashboard_style": "",
        "fsr_icon_dashboard_style_2": "max-height: 20px; margin-top: 10px; padding-right:10px",
        "footer_icons_display": ["selma", "opal", "qis", "matrix", "msx", "cloud", "swdd", "geoportal"],
        "footer_icons_links": {
            "swdd": "https://www.studentenwerk-dresden.de/mensen/speiseplan/mensa-siedepunkt.html",
        }
    },
    "maschinenbau": {
        "name": "Maschinenwesen",
        "fsr_icon": "./OfficialIcons/fsr_mw.png",
        "fsr_icon_dashboard_style": "max-height: 32px;",
        "fsr_link": "https://tu-dresden.de/ing/maschinenwesen/fsr",
        "footer_icons_display": ["selma", "opal", "qis", "matrix", "msx", "cloud", "swdd"],
        "footer_icons_links": {
            "swdd": "https://www.studentenwerk-dresden.de/mensen/speiseplan/",
        }
    },
    "mathematik": {
        "name": "Mathematik",
        "fsr_icon": "./OfficialIcons/fsr_mathe.png",
        "fsr_icon_dashboard_style": "max-height: 32px;",
        "fsr_link": "https://myfsr.de/dokuwiki/doku.php?id=start",
        "footer_icons_display": ["selma", "opal", "matrix", "msx", "cloud", "gitlab", "je", "swdd"],
        "footer_icons_links": {
            "swdd": "https://www.studentenwerk-dresden.de/mensen/speiseplan/",
        }
    },
    "medizin": {
        "name": "Medizin",
        "fsr_icon": "./OfficialIcons/fsr_medi_small.png",
        "fsr_link": "https://www.medforum-dresden.de/",
        "fsr_icon_dashboard_style": "",
        "footer_icons_display": ["selma", "opal", "moodle", "eportal", "msx", "cloud", "swdd"],
        "footer_icons_links": {
            "swdd": "https://www.studentenwerk-dresden.de/mensen/speiseplan/mensologie.html",
        }
    },
    "psychologie": {
        "name": "Psychologie",
        "fsr_icon": "./OfficialIcons/fsr_psy.png",
        "fsr_link": "https://tu-dresden.de/mn/psychologie/fsrpsy",
        "fsr_icon_dashboard_style": "",
        "footer_icons_display": ["selma", "opal", "qis", "matrix", "msx", "cloud", "swdd", "orsee"],
        "footer_icons_links": {
            "swdd": "https://www.studentenwerk-dresden.de/mensen/speiseplan/mensa-siedepunkt.html",
        }
    },
    "general": {
        "name": "Standardeinstellungen",
        "fsr_icon": "",
        "fsr_link": "javascript: void(0)",
        "footer_icons_display": ["selma", "opal", "qis", "matrix", "msx", "cloud", "je", "swdd"],
        "footer_icons_links": {
            "swdd": "https://www.studentenwerk-dresden.de/mensen/speiseplan/",
        }
    },
    "addStudiengang": {
        "name": "&#65291; Studiengang hinzufügen...",
    },
}

var starRatingSettings = {

    // initial rating value
    "rating": "0.0",

    // max rating value
    "maxRating": "5",

    // min rating value
    "minRating": "0.0",

    // readonly mode?
    "readOnly": "no",

    // custom rating symbols here
    "starImage": "./icons/starRate.png",
    "emptyStarImage": "./icons/starbackground.png",

    // symbol size
    "starSize": "18",

    // step size for fractional rating
    "step": "0.5"

}

//change this, if you want to highlight the dropdown arrow for the studiengang selection
//this can be used e.g. if a new studiengang was added
//settings this to false (bool-value) will cause no action
//dropdown_update_id is a random string
const dropdown_update_id = "56tzoguhjk"

window.onload = async function () {

    //get things from storage
    chrome.storage.local.get(['dashboardDisplay', "ratingEnabledFlag", "saved_click_counter", "studiengang", "closedIntro1", "ratedCourses", "closedOutro1"], async function (result) {
        //display courses
        let dashboardDisplay = result.dashboardDisplay
        let courseList = await loadCourses(dashboardDisplay)
        let htmlList = document.getElementsByClassName("list")[0]
        displayCourseList(courseList, htmlList, dashboardDisplay, result.closedIntro1, result.ratedCourses, result.closedOutro1, result.ratingEnabledFlag)
        if (document.getElementById("intro")) {
            document.getElementById("intro").onclick = remove_intro
        }
        if (document.getElementById("outro")) {
            document.getElementById("outro").onclick = remove_outro
        }

        //filter list
        listSearchFunction()

        //display saved clicks
        if (result.saved_click_counter === undefined) { result.saved_click_counter = 0 }
        let time = clicksToTime(result.saved_click_counter)
        document.getElementById("saved_clicks").innerHTML = "<text><font color='green'>" + result.saved_click_counter + " Klicks</font> gespart: <a href='javascript:void(0)' id='time' target='_blank'>" + time + "</a></text>"
        this.document.getElementById('time').onclick = openSettingsTimeSection

        //display banana
        // if (result.saved_click_counter > 100) {
        //     document.getElementById("banana").innerHTML = bananaHTML
        // }

        //exclusive style adjustments
        customizeForStudiengang(result.studiengang)

    })

    //assign switch function
    document.getElementById('switch').addEventListener('change', () => {
        saveEnabled()
    })

    //asign input search fct
    //onkeydown?
    this.document.getElementById("searchListInput").onkeyup = listSearchFunction

    this.document.getElementById("settings").onclick = this.openSettings
    this.document.getElementById("share").onclick = this.openShare

    displayEnabled()

    //bind enter key --> when enter key is pressed the first course in list is clicked
    document.getElementById("list").addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            //Cancel the default action, if needed
            //event.preventDefault();
            //Click the first element which is visible
            let list_entries = document.getElementsByClassName("list-entry")
            for (let i = 0; i < list_entries.length; i++) {
                if (!(list_entries[i].style.display === "none")) {
                    list_entries[i].click()
                    break
                }
            }
        }
    })

    //set custom dropdown styles and js for studiengang selection
    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.select_studiengang_btn')) {
            var dropdowns = document.getElementsByClassName("select_studiengang_dropdown_content")
            var i
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i]
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show')
                }
            }
        }
    }

    //studiengang selection drop-down
    document.getElementById("select_studiengang_btn").onclick = selectStudiengangDropdown
    addDropdownOptions()

    //highlight studiengang selection (only once)
    chrome.storage.local.get(['updateCustomizeStudiengang', "saved_click_counter"], function (result) {
        if (result.updateCustomizeStudiengang != dropdown_update_id && dropdown_update_id != false && result.saved_click_counter > -1) {
            document.getElementById("select_studiengang_dropdown_id").style.border = "2px solid red"
        }
    })

    //we need to set dropdown selection max-height, in case the dashboard is small
    //before wait XXXms because everything needs to be loaded first
    await new Promise(r => setTimeout(r, 200))
    document.getElementById("select_studiengang_dropdown_content").style.maxHeight = (document.body.offsetHeight - 45).toString() + "px"

    //show star rating
    rateSystem("myRatingClassName", starRatingSettings, function (rating, ratingTargetElement) {
        //callback for clicking on star rating. We dont do anything here.
    })
}

function changeStudiengangSelection() {
    studiengang = this.getAttribute('studiengang')

    if (studiengang === "addStudiengang") {
        chrome.runtime.sendMessage({ cmd: 'open_settings_page', params: 'add_studiengang' }, function (result) { })
        return
    }

    chrome.storage.local.set({ studiengang: studiengang }, function () { })
    customizeForStudiengang(studiengang)
}

function addDropdownOptions() {
    let dropdown_content = document.getElementById("select_studiengang_dropdown_content")

    //set footer icons
    Object.keys(studiengang_config).forEach(function (key) {

        let listEntry = document.createElement("p")
        listEntry.style = "display:flex;align-items: center; min-height: 36px; padding-left: 10px; padding-right: 5px; border-radius: 3px;"
        listEntry.onclick = changeStudiengangSelection
        listEntry.setAttribute('studiengang', key)

        let listTxt = document.createElement("text")
        listTxt.style = "flex:10"
        listTxt.innerHTML = studiengang_config[key].name

        listEntry.appendChild(listTxt)

        if (studiengang_config[key].fsr_icon) {
            let listImg = document.createElement("img")
            listImg.style = "flex: 1;height: 30px; width: auto; vertical-align:middle"
            listImg.src = studiengang_config[key].fsr_icon
            listEntry.appendChild(listImg)
        }

        dropdown_content.appendChild(listEntry)
    })

}

//dashboard adjustments for studiengang
function customizeForStudiengang(studiengang) {

    //set footer icons
    if (studiengang_config[studiengang].footer_icons_display) {
        //set visibility for all icons to none
        icons = document.getElementById("settings-footer-bar-icons").children
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.display = "none"
        }

        //set visible icons
        studiengang_config[studiengang].footer_icons_display.forEach(element => {
            document.getElementById(element).style.display = "flex"
        })
    }

    //set footer icon links
    if (studiengang_config[studiengang].footer_icons_links) {
        Object.keys(studiengang_config[studiengang].footer_icons_links).forEach(function (key) {
            document.getElementById(key).href = studiengang_config[studiengang].footer_icons_links[key]
        })
    }

    //set fsr icon
    if (studiengang_config[studiengang].fsr_icon) {
        document.getElementById("fsr_icon").src = studiengang_config[studiengang].fsr_icon
        document.getElementById("fsr_icon").style = studiengang_config[studiengang].fsr_icon_dashboard_style
    } else {
        document.getElementById("fsr_icon").style.display = "none"
    }

    //set fsr icon 2
    if (studiengang_config[studiengang].fsr_icon_2) {
        document.getElementById("fsr_icon_2").src = studiengang_config[studiengang].fsr_icon_2
        document.getElementById("fsr_icon_2").style = studiengang_config[studiengang].fsr_icon_dashboard_style_2
    } else {
        document.getElementById("fsr_icon_2").style.display = "none"
    }

    //set fsr link
    if (studiengang_config[studiengang].fsr_link) {
        document.getElementById("fsr_link").href = studiengang_config[studiengang].fsr_link
    }

    //set fsr link 2
    if (studiengang_config[studiengang].fsr_link_2) {
        document.getElementById("fsr_link_2").href = studiengang_config[studiengang].fsr_link_2
    }
}


function clicksToTime(clicks) {
    clicks = clicks * 3
    let secs = clicks % 60
    let mins = Math.floor(clicks / 60)
    return mins + "min " + secs + "s"
}


function openSettings() {
    chrome.runtime.sendMessage({ cmd: 'open_settings_page', param: "" }, function (result) { }) //for some reason I need to pass empty param - else it wont work in ff
    let isFirefox = navigator.userAgent.includes("Firefox/")  //attention: no failsave browser detection
    if (isFirefox) window.close()
    return false //Required for ff
}

async function openShare() {
    document.getElementById("list").innerHTML = shareHTML   //it needs to be injected this way, else click doesnt work
    await new Promise(r => setTimeout(r, 500))
    document.getElementById("rewards_link").addEventListener("click", function () {   //click handler needs to be set this way
        chrome.runtime.sendMessage({ cmd: 'open_settings_page', params: 'rocket_icons_settings' }, function (result) { }) //for some reason I need to pass empty param - else it wont work in ff
        let isFirefox = navigator.userAgent.includes("Firefox/")  //attention: no failsave browser detection
        if (isFirefox) window.close()
        return false //Required for ff
    })

}

function openSettingsTimeSection() {
    chrome.runtime.sendMessage({ cmd: 'open_settings_page', params: 'time_settings' }, function (result) { })
    let isFirefox = navigator.userAgent.includes("Firefox/")  //attention: no failsave browser detection
    if (isFirefox) window.close()
    return false //Required for ff
}

function listSearchFunction() {
    let input, filter, list, listEntries, i

    input = document.getElementById("searchListInput")
    filter = input.value.toLowerCase()
    list = document.getElementById("list")
    listEntries = list.getElementsByClassName("list-entry-wrapper")

    for (i = 0; i < listEntries.length; i++) {
        try {
            let txtValue = listEntries[i].firstChild.text.toLowerCase()
            if (!txtValue.includes(filter)) {
                listEntries[i].style.display = "none"
            } else {
                listEntries[i].style.display = ""
            }
        }
        catch (e) {
            console.log("Could not set visibility of item. Does not necessarily need to be an error.")
        }
        
    }

    //always show "Klicke hier, um die Kursliste manuell zu aktualisieren..."
    if (listEntries[listEntries.length - 1].innerHTML.includes("aktualisieren")) { listEntries[listEntries.length - 1].style.display = "" }
}

function displayCourseList(courseList, htmlList, type, closedIntro1, ratedCourses, closedOutro1, ratingEnabledFlag) {
    let link = ""
    let name = ""
    let imgSrc = ""
    switch (type) {
        case "favoriten":
            link = "https://bildungsportal.sachsen.de/opal/auth/resource/favorites"
            name = "Klicke, um deine Opal-Kurse zu importieren"
            imgSrc = "./icons/star.png"
            break
        case "meine_kurse":
            link = "https://bildungsportal.sachsen.de/opal/auth/resource/courses"
            name = "Klicke, um deine Opal-Kurse zu importieren"
            imgSrc = "./icons/CoursesOpalIcon.png"
            break
        default:
            break
    }

    if (courseList.length === 0 || courseList === undefined || courseList === false) {
        courseList = []
        courseList.push({ "name": name, "link": link, "img": "./icons/reload.png" })
    } else {
        courseList.push({ "name": "Diese Kursliste jetzt aktualisieren...", "link": link, "img": "./icons/reload.png" })
    }

    //determine when to show outro and intro for course rating
    //THIS NEEDS TO BE ADAPTED FOR EACH SEMESTER because ratedCourses is never purged for now - its only expanded. However, courses which are not longer in courseList shouldnt be in ratedCourses either!
    if (ratedCourses == undefined) ratedCourses = []
    showIntro = (ratingEnabledFlag && !closedIntro1 && courseList.length > 1 && !(courseList.length - 2 < ratedCourses.length))
    showOutro = (ratingEnabledFlag && !closedOutro1 && courseList.length > 1 && !showIntro && (courseList.length - 2 < ratedCourses.length))



    //add introduction to course Rating element
    if (showIntro) {
        let introRating = document.createElement("div")
        introRating.id = "intro_rating"
        let introRatingText = document.createElement("p")
        introRating.classList.add("list-entry-wrapper")
        introRatingText.classList.add("list-intro")

        introRatingText.innerHTML = "<b>Wir suchen den besten Kurs an der TU Dresden. Bewerte jetzt deine Kurse mit 1-5 Sternen!</b> Deine Bewertung ist zu 100% völlig anonym. Die Ergebnisse der Abstimmung veröffentlichen wir anschließend. Details und die Erweiterung zur Datenschutzerklärung gibts <a target='_blank' href='https://docs.google.com/document/d/1CIt2Q16gtzsuopXZxxMcC1BU1urpJF6FCQ8d77-um1U/edit?usp=sharing'>hier</a>. <a id='intro' href='#'>Schließen</a>."
        introRating.appendChild(introRatingText)
        htmlList.appendChild(introRating)
    }

    //add outro to course Rating element
    if (showOutro) {
        let outroRating = document.createElement("div")
        outroRating.id = "outro_rating"
        let outroRatingText = document.createElement("p")
        outroRating.classList.add("list-entry-wrapper")
        outroRatingText.classList.add("list-outro")

        outroRatingText.innerHTML = "<b>Danke für's Abstimmen. Über die Ergebnisse wirst du benachrichtigt!</b> Teile <a target='_blank' href='https://www.tu-fast.de'>www.tu-fast.de</a> jetzt mit deinen Freunden, damit auch sie die Kurse bewerten. Damit k&ouml;nnen wir die Lehre an der TU verbessern! Danke &#x1f499;<br><a id='outro' href='#'>Schließen</a>."
        outroRating.appendChild(outroRatingText)
        htmlList.appendChild(outroRating)
    }


    courseList.forEach(element => {
        let listEntrywrapper = document.createElement("div")
        let listEntry = document.createElement("a")
        let listImg = document.createElement("div")
        let listText = document.createElement("div")
        let img = document.createElement("img")
        let rateEntryWrapper = document.createElement("div")
        let rateEntry = document.createElement("div")
        let confirmEntry = document.createElement("div")
        let confirmEntryLink = document.createElement("a")

        listEntrywrapper.className = "list-entry-wrapper"

        rateEntryWrapper.style.display = "flex"
        rateEntryWrapper.style.alignItems = "center"
        rateEntryWrapper.style.marginBottom = "7px"
        rateEntryWrapper.id = element.name + " Wrapper"
        rateEntry.style.flex = 1
        rateEntry.style.marginLeft = "150px"
        confirmEntry.style.flex = 2

        confirmEntryLink.setAttribute("courseRef", element.name)
        confirmEntryLink.style.fontSize = "15px"
        confirmEntryLink.href = "#"
        confirmEntryLink.innerHTML = "Fertig <text style='font-size:14px'>✅</text>"
        confirmEntryLink.onclick = sendRating
        confirmEntry.appendChild(confirmEntryLink)

        //this is the structure required by starRating.js
        let rateEntryInner1 = document.createElement("div")
        let rateEntryInner2 = document.createElement("div")
        rateEntryInner1.className = "starRatingContainer"
        rateEntryInner2.className = "myRatingClassName"
        rateEntryInner2.id = element.name
        rateEntryInner1.appendChild(rateEntryInner2)
        rateEntry.appendChild(rateEntryInner1)



        listEntry.className = "list-entry"
        listEntry.href = element.link
        listEntry.target = "_blank"
        listEntry.onclick = save__two_clicks

        listImg.className = "list-entry-img"

        listText.className = "list-entry-text"
        listText.innerHTML = element.name

        img.className = "list-img"
        img.src = imgSrc

        if (element.img === "./icons/reload.png") {
            img.src = "./icons/reload.png"
            img.className += " invert"
        }

        listImg.appendChild(img)
        if (!(element.img === false)) { listEntry.appendChild(listImg) }
        listEntry.appendChild(listText)
        listEntrywrapper.appendChild(listEntry)
        rateEntryWrapper.appendChild(rateEntry)
        rateEntryWrapper.appendChild(confirmEntry)
        let isRated = false
        if (ratedCourses == undefined) {
            isRated = false
        } else {
            isRated = ratedCourses.includes(element.name)
        }
        if (!(element.name == "Diese Kursliste jetzt aktualisieren..." || element.name == "Klicke, um deine Opal-Kurse zu importieren" || isRated) && ratingEnabledFlag) listEntrywrapper.appendChild(rateEntryWrapper)
        htmlList.appendChild(listEntrywrapper)
    })

    //Create button so switch courses <> favorites
    let listEntry = document.createElement("a")
    let listImg = document.createElement("div")
    let listText = document.createElement("div")
    let img = document.createElement("img")

    listImg.className = "list-entry-img"

    listEntry.className = "list-entry"
    listEntry.href = "javascript:void(0)"
    listEntry.onclick = switch_courses_to_show

    listText.className = "list-entry-text"

    img.className = "list-img"

    if (type === "favoriten") img.src = "./icons/CoursesOpalIcon.png"
    if (type === "meine_kurse") img.src = "./icons/star.png"

    listImg.appendChild(img)
    listEntry.appendChild(listImg)

    if (type === "favoriten") listText.innerHTML = 'Wechsel zu "Meine Kurse" ... '
    if (type === "meine_kurse") listText.innerHTML = 'Wechsel zu "Meine Favoriten" ...'

    listEntry.appendChild(listText)
    htmlList.appendChild(listEntry)

}

function switch_courses_to_show() {
    chrome.storage.local.get(['dashboardDisplay'], async function (result) {
        if (result.dashboardDisplay === "meine_kurse") chrome.storage.local.set({ dashboardDisplay: "favoriten" }, function () { })
        if (result.dashboardDisplay === "favoriten") chrome.storage.local.set({ dashboardDisplay: "meine_kurse" }, function () { })
        location.reload()
    })
}

function save__two_clicks() {
    chrome.runtime.sendMessage({ cmd: "save_clicks", click_count: 2 })
}

//changeIsEnabledState
function saveEnabled() {
    //only save, if user data is available. Else forward to settings page
    chrome.storage.local.get(['isEnabled'], function (resp) {
        chrome.runtime.sendMessage({ cmd: 'get_user_data' }, function (result) {
            if (!(result.asdf === undefined || result.fdsa === undefined)) {
                chrome.storage.local.set({ isEnabled: !(resp.isEnabled) }, function () { })
            } else {
                chrome.runtime.sendMessage({ cmd: 'open_settings_page', params: 'auto_login_settings' }, function (result) { })
                window.close()

            }
        })
    })

}

//set switch
function displayEnabled() {
    chrome.storage.local.get(['isEnabled'], function (result) {
        this.document.getElementById('switch').checked = result.isEnabled
    })
}

//return course_list = [{link:link, name: name}, ...]
function loadCourses(type) {
    return new Promise((resolve, reject) => {
        switch (type) {
            case "favoriten":
                chrome.storage.local.get(['favoriten'], function (result) {
                    try {
                        resolve(JSON.parse(result.favoriten))
                    } catch {
                        resolve(false)
                    }
                })
                break
            case "meine_kurse":
                chrome.storage.local.get(['meine_kurse'], function (result) {
                    try {
                        resolve(JSON.parse(result.meine_kurse))
                    } catch {
                        resolve(false)
                    }
                })
                break
            default:
                resolve(false)
                break
        }
    })
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function selectStudiengangDropdown() {
    document.getElementById("select_studiengang_dropdown_content").classList.toggle("show")
    chrome.storage.local.set({ updateCustomizeStudiengang: dropdown_update_id }, function () { })
    document.getElementById("select_studiengang_dropdown_id").style.border = "none"
}

function sendRating() {
    let course = this.getAttribute("courseref")
    let rating = document.getElementById(course).dataset.rating

    console.log("GOT THE FOLLOWING RATING:")
    console.log(course)
    console.log(rating)

    //rating cannot be zero
    if (rating == "0.0") {
        alert("Bitte bewerte den Kurs mit Sternen, bevor du dein Rating abgibst!")
        return
    }

    //add to rated list
    chrome.storage.local.get(['ratedCourses'], async function (result) {
        let updatedCourseList = []
        if (result.ratedCourses == undefined) {
            updatedCourseList = []
        } else {
            updatedCourseList = result.ratedCourses
        }
        updatedCourseList.push(course)
        chrome.storage.local.set({ ratedCourses: updatedCourseList }, function () { })
    })

    //remove the rating div
    document.getElementById(course + " Wrapper").remove()

    //send rating
    let courseURI = course.replaceAll("/", "") //very important, as it is interpreted as documents and collections in the db
    courseURI = encodeURIComponent(courseURI)
    courseURI = courseURI.replaceAll("!", "%21").replaceAll("'", "%27").replaceAll("(", "%28").replaceAll(")", "%29").replaceAll("~", "%7E")
    let ratingURI = rating.replace(".", ",")
    console.log(courseURI)


    //IF YOU ARE TRYING TO HACK please use the following domain instead: https://us-central1-tufastcourseratinghack.cloudfunctions.net/setRatingHACK . It has the same services running. Let me know if you find any security issues - thanks! - oli
    url = "https://us-central1-tufastcourserating2.cloudfunctions.net/setRating?rating=" + ratingURI + "&course=" + courseURI
    console.log(url)

    fetch(url)
        .then((resp) => resp.text())
        .then((resp => console.log(resp)))
}

function remove_intro() {
    document.getElementById("intro_rating").remove()
    chrome.storage.local.set({ closedIntro1: true }, function () { })
}


function remove_outro() {
    document.getElementById("outro_rating").remove()
    chrome.storage.local.set({ closedOutro1: true }, function () { })
}

