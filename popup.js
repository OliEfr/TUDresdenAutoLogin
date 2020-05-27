//this need to be done here since manifest v2
window.onload = async function(){

    //get and display course list
    chrome.storage.local.get(['dashboardDisplay'], async function(result) {
        let dashboardDisplay = result.dashboardDisplay
        let courseList = await loadCourses(dashboardDisplay)
        let htmlList = document.getElementsByClassName("list")[0]
        displayCourseList(courseList, htmlList, dashboardDisplay)
    })

    //assign switch function
    document.getElementById('switch').addEventListener('change', () => {
        saveEnabled()
    })
    displayEnabled()
}

function displayCourseList(courseList, htmlList, type) {
    let link = ""
    let name = ""
    let imgSrc =""
    switch(type) {
        case "favoriten":
            link = "https://bildungsportal.sachsen.de/opal/auth/resource/favorites"
            name = "Klicke, um alle deine Favoriten hier zu sehen!"
            imgSrc = "./icons/star.png"
            break
        case "meine_kurse":
            link = "https://bildungsportal.sachsen.de/opal/auth/resource/courses"
            name = "Klicke, um alle deine Kurse hier zu sehen!"
            imgSrc = "./icons/CoursesOpalIcon.png"
            break
        default:
            break
    }
    if(courseList.length === 0) {
        courseList.push({"name": name, "link": link})
    } else {
        courseList.push({"name": "Kliche hier, um manuell zu aktualisieren ...", "link": link, "img": false})

    }
    
    courseList.forEach(element => {
        let listEntry = document.createElement("a")
        let listImg = document.createElement("div")
        let listText = document.createElement("div")
        let img = document.createElement("img")
        listEntry.className = "list-entry"
        listImg.className = "list-entry-img"
        listEntry.href = element.link
        listEntry.target = "_blank"
        listText.className = "list-entry-text"
        listText.innerHTML = element.name
        img.className = "list-img"
        img.src = imgSrc
        if((element.img === false)) {img.style="display:none" }
        
        listImg.appendChild(img)
        listEntry.appendChild(listImg)
        listEntry.appendChild(listText)

        htmlList.appendChild(listEntry)
    })

}


//changeIsEnabledState
function saveEnabled() {
    //only save, if user data is available. Else forward to settings page
    chrome.storage.local.get(['isEnabled'], function(result) {
        chrome.runtime.sendMessage({cmd: 'get_user_data'}, function(result) {
            if(!(result.asdf === undefined || result.fdsa === undefined)) {
                chrome.storage.local.set({isEnabled: !(result.isEnabled)}, function() {})
            } else {
                chrome.runtime.sendMessage({cmd: 'open_settings_page', params: 'auto_login_settings'}, function(result) {})
            }
        })
    })
    
}

//set switch
function displayEnabled() {
    chrome.storage.local.get(['isEnabled'], function(result) {
        this.document.getElementById('switch').checked = result.isEnabled
    })
}

//return course_list = [{link:link, name: name}, ...]
function loadCourses(type) {
    return new Promise((resolve, reject) => {
        switch(type) {
            case "favoriten":
                chrome.storage.local.get(['favoriten'], function(result) {
                    resolve(JSON.parse(result.favoriten))
                })
                break
            case "meine_kurse":
                chrome.storage.local.get(['meine_kurse'], function(result) {
                    resolve(JSON.parse(result.meine_kurse))
                })
                break
            default:
                resolve(false)
                break
        }
    })
}