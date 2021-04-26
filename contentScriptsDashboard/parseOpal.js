chrome.storage.local.get(['isEnabled', 'seenInOpalAfterDashbaordUpdate', "removedOpalBanner", "saved_click_counter", "mostLiklySubmittedReview", "removedReviewBanner", "neverShowedReviewBanner"], function (result) {

    //decide whether to show dashbaord banner
    let showDashboardBanner = false
    if (result.seenInOpalAfterDashbaordUpdate < 5 && !result.removedOpalBanner) { showDashboardBanner = true }
    chrome.storage.local.set({ seenInOpalAfterDashbaordUpdate: result.seenInOpalAfterDashbaordUpdate + 1 }, function () { })


    //wait until full page is loaded
    window.addEventListener("load", async function (e) {

        let oldLocationHref = location.href
        let parsedCourses = false

        // show banner
        if (showDashboardBanner) { showDashboardBannerFunc() }
        // 

        //if all courses loaded --> parse
        if (!document.getElementsByClassName("pager-showall")[0]) {
            chrome.runtime.sendMessage({ cmd: "save_courses", course_list: parseCoursesFromWebPage() })
            parsedCourses = true
            //if not --> load all courses
        } else {
            document.getElementsByClassName("pager-showall")[0].click()
            chrome.runtime.sendMessage({ cmd: "save_clicks", click_count: 1 })
            parsedCourses = false
        }

        //close banner buttons
        if (this.document.getElementById("closeOpalBanner")) {
            this.document.getElementById("closeOpalBanner").onclick = closeOpalBanner
        }

        //use mutation observer to detect page changes
        const config = { attributes: true, childList: true, subtree: true }
        const callback = function (mutationsList, observer) {

            //detect new page
            if (location.href != oldLocationHref) {
                oldLocationHref = location.href
                //all courses loaded already --> parse directly
                if (!document.getElementsByClassName("pager-showall")[0]) {
                    let course_list = parseCoursesFromWebPage()
                    chrome.runtime.sendMessage({ cmd: "save_courses", course_list: course_list })
                    parsedCourses = true
                }
                //not all courses loaded already --> load all courses
                if (document.getElementsByClassName("pager-showall")[0].innerText === "alle anzeigen") {
                    document.getElementsByClassName("pager-showall")[0].click()
                    chrome.runtime.sendMessage({ cmd: "save_clicks", click_count: 1 })
                    parsedCourses = false
                }
            }

            //parse courses
            if (document.getElementsByClassName("pager-showall")[0]) {
                if (document.getElementsByClassName("pager-showall")[0].innerText === "Seiten" && !parsedCourses) {
                    chrome.runtime.sendMessage({ cmd: "save_courses", course_list: parseCoursesFromWebPage() })
                    parsedCourses = true
                }
            }
        }
        const observer = new MutationObserver(callback);
        observer.observe(document.body, config);
    }, true)
})

function closeOpalBanner() {
    if (document.getElementById("opalBanner")) {
        document.getElementById("opalBanner").remove()
        chrome.storage.local.set({ removedOpalBanner: true }, function () { })
    }
}

function showDashboardBannerFunc() {
    let banner = this.document.createElement("div")
    let imgUrl = chrome.runtime.getURL("../images/OpalBanner3.png")
    banner.id = "opalBanner"
    banner.style.height = "50px"
    banner.style.margin = "auto"
    //add remove button -->
    banner.innerHTML = '<img src=' + imgUrl + ' style=" -webkit-filter: drop-shadow(2px 2px 2px #aaa);filter: drop-shadow(2px 2px 2px #aaa); height: 55px; right: 30px; z-index: 999; position:fixed;"> <span id="closeOpalBanner" style="-webkit-filter: drop-shadow(2px 2px 2px #aaa);filter: drop-shadow(2px 2px 2px #aaa);font-size: 18px; z-index: 999; cursor: pointer; position: fixed; top: 14.1px; right: 13px; padding: 5.8px 7px; background-color: #ddd">x</span>'
    this.document.body.insertBefore(banner, document.body.childNodes[0])
}

function parseCoursesFromWebPage() {
    let course_list = { type: "", list: [] }
    if (location.pathname === "/opal/auth/resource/courses") { course_list.type = "meine_kurse" }
    if (location.pathname === "/opal/auth/resource/favorites") { course_list.type = "favoriten" }
    //there are two options, how the coursse-overview table can be build.
    //They are simply tried out
    try {
        let tableEntries = document.getElementsByClassName("table-panel")[0].getElementsByTagName("tbody")[0].children
        for (let item of tableEntries) {
            let name = item.children[2].children[0].getAttribute("title")
            let link = item.children[2].children[0].getAttribute("href")
            course_list.list.push({ name: name, link: link })
        }
        //There is a reported case, where no error is thrown and course_list has entries, but all of them are empty
        //Of course this is not wanted. So in this case, also throw an error
        let getAllNullEntries = course_list.list.filter(el => !el.link && !el.name) //this contains all entries, where link and name is false (i.e. null)
        if (getAllNullEntries.length > 2) { //when more than two null-entries: most likely unwanted case
            course_list = { type: "", list: [] } //reset course list
            throw 'most likely parsing error'; //throw error
        }
    } catch {
        let tableEntries = document.getElementsByClassName("table-panel")[0].getElementsByClassName("content-preview-container")[0].getElementsByClassName("list-unstyled")[0].getElementsByClassName("content-preview content-preview-horizontal")
        for (let item of tableEntries) {
            try {
                let name = item.getElementsByClassName("content-preview-title")[0].innerHTML
                let link = item.children[3].getAttribute("href")
                course_list.list.push({ name: name, link: link })
            }
            catch (e) {console.log("Error in parsing course list. Could not parse course list: " + e) }
        }
    }
    
    //alert, if still null-entries found
    let getAllNullEntriesFinal = course_list.list.filter(el => !el.link && !el.name)
    if(getAllNullEntriesFinal.length > 0) {console.log("Possible Error in parsing courses. Found null entries.")}
    //if present, remove all null entries
    course_list = course_list.list.filter(el => !(!el.link && !el.name))
    
    return course_list
}
