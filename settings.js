//global vars
var isFirefox = navigator.userAgent.includes("Firefox/")  //attention: no failsave browser detection
if (isFirefox) {
  webstorelink = "https://addons.mozilla.org/de/firefox/addon/tufast/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search"
} else {
  webstorelink = "https://chrome.google.com/webstore/detail/tufast-tu-dresden/aheogihliekaafikeepfjngfegbnimbk?hl=de"
}

function saveUserData() {
  var asdf = document.getElementById('username_field').value
  var fdsa = document.getElementById('password_field').value
  if (asdf === '' || fdsa === '') {
    document.getElementById('status_msg').innerHTML = '<span class="red-text">Die Felder d&uuml;rfen nicht leer sein!</span>'
    return false
  } else {
    chrome.storage.local.set({ isEnabled: true }, function () { }) //need to activate auto login feature
    chrome.runtime.sendMessage({ cmd: "clear_badge" })
    chrome.runtime.sendMessage({ cmd: "set_user_data", userData: { asdf: asdf, fdsa: fdsa } })
    document.getElementById('status_msg').innerHTML = ""
    document.getElementById("save_data").innerHTML = '<span>Gespeichert!</span>'
    document.getElementById("save_data").disabled = true
    document.getElementById("username_field").value = ""
    document.getElementById("password_field").value = ""
    document.getElementById('status_msg').innerHTML = '<span class="green-text">Du bist angemeldet und wirst automatisch in Opal & Co. eingeloggt.</span>'
    setTimeout(() => {
      document.getElementById("save_data").innerHTML = 'Speichern'
      document.getElementById("save_data").disabled = false
    }, 2000)
  }
}


function deleteUserData() {
  chrome.runtime.sendMessage({ cmd: "clear_badge" })
  chrome.storage.local.set({ Data: "undefined" }, function () { }) //this is how to delete user data!
  chrome.storage.local.set({ isEnabled: false }, function () { }) //need to deactivate auto login feature
  // -- also delete courses in dashboard
  chrome.storage.local.set({ meine_kurse: false }, function () { })
  chrome.storage.local.set({ favoriten: false }, function () { })
  // --
  // -- also deactivate owa fetch
  document.getElementById('owa_mail_fetch').checked = false
  chrome.runtime.sendMessage({ cmd: 'disable_owa_fetch' })
  chrome.storage.local.set({ "enabledOWAFetch": false })
  chrome.storage.local.set({ additionalNotificationOnNewMail: false })
  document.getElementById("additionalNotification").checked = false
  // --
  document.getElementById('status_msg').innerHTML = ""
  document.getElementById("delete_data").innerHTML = '<span>Gel&ouml;scht!</span>'
  document.getElementById("delete_data").setAttribute("class", "button-accept")
  document.getElementById("delete_data").disabled = true
  document.getElementById("username_field").value = ""
  document.getElementById("password_field").value = ""
  document.getElementById('status_msg').innerHTML = '<span class="grey-text">Du bist nicht angemeldet.</span>'
  setTimeout(() => {
    document.getElementById("delete_data").innerHTML = 'Alle Daten l&ouml;schen'
    document.getElementById("delete_data").setAttribute("class", "button-deny")
    document.getElementById("delete_data").disabled = false
    chrome.storage.local.get(['Data'], function (result) {
    })
  }, 2000)

}
function fwdGoogleSearch() {
  chrome.storage.local.get(['fwdEnabled'], function (result) {
    chrome.storage.local.set({ fwdEnabled: !(result.fwdEnabled) }, function () { })
  })
}

function checkSelectedRocket() {
  chrome.storage.local.get(['selectedRocketIcon'], (res) => {
    let icon = JSON.parse(res.selectedRocketIcon)
    document.getElementById(icon.id).checked = true
  })
}

//set switches and other elements
function displayEnabled() {
  chrome.storage.local.get(['fwdEnabled'], function (result) {
    this.document.getElementById('switch_fwd').checked = result.fwdEnabled
  })
  chrome.storage.local.get(['enabledOWAFetch'], function (result) {
    this.document.getElementById('owa_mail_fetch').checked = result.enabledOWAFetch
  })
  chrome.storage.local.get(['additionalNotificationOnNewMail'], function (result) {
    document.getElementById("additionalNotification").checked = result.additionalNotificationOnNewMail
  })
  chrome.storage.local.get(['studiengang', 'openSettingsPageParam'], function (result) {
    if (result.openSettingsPageParam === "add_studiengang") {
      document.getElementById("studiengangSelect").value = "add"
      document.getElementById("addStudiengang").style.display = "block"
    }
    else if (result.studiengang == null || result.studiengang == undefined || result.studiengang == "general") {
      document.getElementById("studiengangSelect").value = "general"
    } else {
      document.getElementById("studiengangSelect").value = result.studiengang
    }
  })

  chrome.storage.local.get(['pdfInInline'], function (result) {
    this.document.getElementById('switch_pdf_inline').checked = result.pdfInInline
    if (!result.pdfInInline) {
      document.getElementById("switch_pdf_newtab_block").style.visibility = "hidden"
    }
  })

  chrome.storage.local.get(['pdfInNewTab'], function (result) {
    this.document.getElementById('switch_pdf_newtab').checked = result.pdfInNewTab
  })
  /*chrome.storage.local.get(['dashboardDisplay'], function(result) {
    if(result.dashboardDisplay === "favoriten") {document.getElementById('fav').checked = true}
    if(result.dashboardDisplay === "meine_kurse") {document.getElementById('crs').checked = true}
  })*/
}

//handle dashboard course select customization
/*function dashboardCourseSelect () {
  if(document.getElementById('fav').checked) {
    chrome.storage.local.set({dashboardDisplay: "favoriten"}, function() {})
  }else if(document.getElementById('crs').checked) {
    chrome.storage.local.set({dashboardDisplay: "meine_kurse"}, function() {})
  }
}*/


function clicksToTime(clicks) {
  let clicks_calc = clicks * 3
  let secs = clicks_calc % 60
  let mins = Math.floor(clicks_calc / 60)
  return "<strong>" + clicks + " Klicks &#x1F5B1</strong> und <strong>" + mins + "min " + secs + "s</strong> &#9202; gespart!"
}

function clicksToTimeNoIcon(clicks) {
  let clicks_calc = clicks * 3
  let secs = clicks_calc % 60
  let mins = Math.floor(clicks_calc / 60)
  return "<strong>" + clicks + " Klicks </strong> und <strong>" + mins + "min " + secs + "s</strong> gespart!"
}

function openKeyboardSettings() {
  chrome.runtime.sendMessage({ cmd: 'open_shortcut_settings' }, function (result) { })
}

async function toggleOWAfetch() {
  //NOTE: not required to check for permission. Browser will only ask for permission, if not given yet!
  //check for optional tabs permission
  //await chrome.permissions.contains({
  //  permissions: ['tabs'],
  //}, async function(gotPermission) {
  //    if (gotPermission) {
  //      enableOWAFetch()
  //    }
  //    else {
  //request permission
  chrome.permissions.request({
    permissions: ['tabs']
  }, function (granted) {
    if (granted) {
      enableOWAFetch()
    }
    else {
      chrome.storage.local.set({ "enabledOWAFetch": false })
      this.document.getElementById('owa_mail_fetch').checked = false
      alert("TUfast braucht diese Berechtigung, um regelmaessig alle Mails abzurufen. Bitte druecke auf 'Erlauben'.")
      return
    }
  })
  //    }
  //  } 
  //);
}

function enableOWAFetch() {
  chrome.storage.local.get(['enabledOWAFetch'], (resp) => {
    if (resp.enabledOWAFetch) {
      //disable
      chrome.runtime.sendMessage({ cmd: 'disable_owa_fetch' })
      chrome.storage.local.set({ "enabledOWAFetch": false })
      chrome.storage.local.set({ additionalNotificationOnNewMail: false })
      document.getElementById("additionalNotification").checked = false
    } else {
      chrome.runtime.sendMessage({ cmd: 'get_user_data' }, function (result) {
        //check if user data is saved
        if (!(result.asdf === undefined || result.fdsa === undefined)) {
          document.getElementById("owa_fetch_msg").innerHTML = ""
          chrome.runtime.sendMessage({ cmd: 'enable_owa_fetch' }, function (result) { })
          chrome.storage.local.set({ "enabledOWAFetch": true })
          //reload chrome extension is necessary
          alert("Perfekt! Bitte starte den Browser einmal neu, damit die Einstellungen uebernommen werden!")
          chrome.storage.local.set({ openSettingsPageParam: "mailFetchSettings", openSettingsOnReload: true }, function () { })
          chrome.runtime.sendMessage({ cmd: 'reload_extension' }, function (result) { })
        } else {
          document.getElementById("owa_fetch_msg").innerHTML = '<span class="red-text">Speichere deine Login-Daten im Punkt \'Automatisches Anmelden in Opal, Selma & Co.\' um diese Funktion zu nutzen!</span>'
          this.document.getElementById('owa_mail_fetch').checked = false
        }
      })
    }
  })
}

function denyHostPermissionS() {
  alert("Okay, das ist schade. Beachte bitte, dass diese TUfast sich bei dir bald automatisch deaktivieren wird und du die Erweiterung wieder manuell aktivieren musst. Wir empfehlen dir, die Berechtigung zu akzeptieren!")
}

function requestHostPermissionS() {
  chrome.permissions.request({
    origins: ["*://*/*"]
  }, function (granted) {
    if (granted) {
      alert("Perfekt! TUfast hat jetzt maximale Funktionen! Entdecke auf dieser Seite jetzt alle Optionen von TUfast!")
      chrome.runtime.sendMessage({ cmd: 'register_addition_content_scripts' }, function (result) { })
      document.getElementById("addition_host_permissions").remove()

    } else {
      alert("Okay, das ist schade. Beachte bitte, dass TUfast sich bei dir bald automatisch deaktivieren wird und du die Erweiterung wieder manuell aktivieren musst. Wir empfehlen dir, die Berechtigung zu akzeptieren!")
    }
  })
}

async function getAvailableRockets() {
  return new Promise((res, rej) => {
    chrome.storage.local.get(["availableRockets"], (resp) => {
      res(resp.availableRockets)
    })
  })
}

let rocketIconsConfig = {

  "RI4": {
    IconPathEnabled: "RocketIcons/4_103px.png",
    IconPathDisabled: "RocketIcons/4_grey_103px.png",
    innerHTMLToEnable: "&nbsp;&nbsp;Spare mehr als 250 Klicks.",
    innerHTMLEnabled: "&nbsp;&nbsp;Mehr als 250 Klicks gespart. TUfast scheint n&uuml;tzlich!",
    id: "RI4"
  },
  "RI5": {
    IconPathEnabled: "RocketIcons/13_128px.png",
    IconPathDisabled: "RocketIcons/13_grey_128px.png",
    innerHTMLToEnable: "&nbsp;&nbsp;Spare mehr als 2500 Klicks. Du bist Profi!",
    innerHTMLEnabled: "&nbsp;&nbsp;Mehr als 2500 Klicks gespart. TUfast ist n&uuml;tzlich!",
    id: "RI5"
  },
  "RI3": {
    IconPathEnabled: "RocketIcons/7_128px.png",
    IconPathDisabled: "RocketIcons/7_grey_128px.png",
    innerHTMLToEnable: "&nbsp;&nbsp;Finde das Easteregg!",
    innerHTMLEnabled: "&nbsp;&nbsp;Easteregg gefunden :)",
    id: "RI3"
  },
  "RI2": {
    IconPathEnabled: "RocketIcons/2_128px.png",
    IconPathDisabled: "RocketIcons/2_grey_128px.png",
    innerHTMLToEnable: "&nbsp;&nbsp;Du findest TUfast n&uuml;tzlich? Erz&auml;hle es zwei Leuten mit &#128073;<a target='_blank' href='mailto:?subject=Probiere%20mal%20TUfast!%20%F0%9F%9A%80&body=Hey%20%3A)%0A%0Akennst%20du%20schon%20TUfast%3F%0A%0ATUfast%20hilft%20beim%20t%C3%A4glichen%20Arbeiten%20mit%20den%20Online-Portalen%20der%20TU%20Dresden.%0ADamit%20spare%20ich%20viel%20Zeit%20und%20nervige%20Klicks.%0A%0ATUfast%20ist%20eine%20Erweiterung%20f%C3%BCr%20den%20Browser%20und%20wurde%20von%20Studenten%20entwickelt.%0AProbiere%20es%20jetzt%20auf%20www.tu-fast.de%20!%0A%0ALiebe%20Gr%C3%BC%C3%9Fe%C2%A0%F0%9F%96%90'>E-Mail</a>, um diese schicke Rakete freizuschalten!",
    innerHTMLEnabled: "&nbsp;&nbsp;Diese Rakete hast du dir verdient! Mit <a target='_blank' href='mailto:?subject=Probiere%20mal%20TUfast!%20%F0%9F%9A%80&body=Hey%20%3A)%0A%0Akennst%20du%20schon%20TUfast%3F%0A%0ATUfast%20hilft%20beim%20t%C3%A4glichen%20Arbeiten%20mit%20den%20Online-Portalen%20der%20TU%20Dresden.%0ADamit%20spare%20ich%20viel%20Zeit%20und%20nervige%20Klicks.%0A%0ATUfast%20ist%20eine%20Erweiterung%20f%C3%BCr%20den%20Browser%20und%20wurde%20von%20Studenten%20entwickelt.%0AProbiere%20es%20jetzt%20auf%20www.tu-fast.de%20!%0A%0ALiebe%20Gr%C3%BC%C3%9Fe%C2%A0%F0%9F%96%90'>E-Mail</a> empfohlen.",
    id: "RI2"
  },
  "RI6": {
    IconPathEnabled: "RocketIcons/6_128px.png",
    IconPathDisabled: "RocketIcons/6_grey_128px.png",
    innerHTMLToEnable: "&nbsp;&nbsp;Gef&auml;llt dir TUfast? Oder hast du Anmerkdungen? Dann hinterlasse eine Bewertung im &#128073;<a target='_blank' href=" + webstorelink + ">Webstore</a>!",
    innerHTMLEnabled: "&nbsp;&nbsp;Danke f&uuml;r deine Bewertung im Webstore!",
    id: "RI6"
  },
  "RI1": {
    IconPathEnabled: "RocketIcons/1_128px.png",
    IconPathDisabled: "RocketIcons/1_grey_128px.png",
    innerHTMLToEnable: "&nbsp;&nbsp;Coole Dinge Teilen ist dein Ding? Teile TUfast mit zwei Freunden auf &#128073;<a href='https://api.whatsapp.com/send?text=Hey%2C%20kennst%20du%20schon%20TUfast%3F%20%F0%9F%9A%80%0A%0AMacht%20das%20arbeiten%20mit%20allen%20Online-Portalen%20der%20TU%20Dresden%20produktiver%20und%20hat%20mir%20schon%20viel%20Zeit%20und%20nervige%20Klicks%20gespart.%20Eine%20richtig%20n%C3%BCtzliche%20Browsererweiterung%20f%C3%BCr%20Studenten!%0A%0AProbiers%20gleich%20mal%20aus%3A%20www.tu-fast.de%20%F0%9F%96%90' data-action='share/whatsapp/share' target='_blank'>WhatsApp</a> und sammle diese tolle Rakete!",
    innerHTMLEnabled: "&nbsp;&nbsp;Danke f&uuml;r deine Unterst&uuml;tzung! Mit <a href='https://api.whatsapp.com/send?text=Hey%2C%20kennst%20du%20schon%20TUfast%3F%20%F0%9F%9A%80%0A%0AMacht%20das%20arbeiten%20mit%20allen%20Online-Portalen%20der%20TU%20Dresden%20produktiver%20und%20hat%20mir%20schon%20viel%20Zeit%20und%20nervige%20Klicks%20gespart.%20Eine%20richtig%20n%C3%BCtzliche%20Browsererweiterung%20f%C3%BCr%20Studenten!%0A%0AProbiers%20gleich%20mal%20aus%3A%20www.tu-fast.de%20%F0%9F%96%90' data-action='share/whatsapp/share' target='_blank'>WhatsApp</a> empfohlen.",
    id: "RI1"
  },
}

async function insertAllRocketIcons() {

  var availableRockets = await getAvailableRockets()

  Object.keys(rocketIconsConfig).forEach((key) => {
    let p = document.createElement("p")
    let input = document.createElement("input")
    let span = document.createElement("span")
    let image = document.createElement("img")
    let label = document.createElement("label")
    let text = document.createElement("text")

    input.type = "radio"
    input.id = rocketIconsConfig[key]["id"]
    input.name = "Rockets"
    input.value = rocketIconsConfig[key]["id"]
    span.className = "helper"
    label.htmlFor = rocketIconsConfig[key]["id"]
    image.style = "height: 50px;"

    if (availableRockets.includes(rocketIconsConfig[key]["id"])) {
      image.src = rocketIconsConfig[key]["IconPathEnabled"]
      text.innerHTML = rocketIconsConfig[key]["innerHTMLEnabled"]
    } else {
      image.src = rocketIconsConfig[key]["IconPathDisabled"]
      input.disabled = "true"
      text.innerHTML = rocketIconsConfig[key]["innerHTMLToEnable"]
    }

    span.appendChild(image)
    span.appendChild(text)
    p.appendChild(input)
    p.appendChild(label)
    p.appendChild(span)

    document.getElementById("RocketForm").appendChild(p)
  })

  checkSelectedRocket()

  //attach on click handlers
  document.querySelectorAll("#RocketForm a").forEach((el) => {
    el.onclick = enableRocketIcon
  })

  //attach form change handler
  document.querySelectorAll("input[name=Rockets]").forEach((el) => {
    el.onclick = rocketIconSelectionChange
  })

}

function rocketIconSelectionChange() {
  let rocketNode = this.parentElement
  let rocketID = this.id
  let imgSrc = "RocketIcons" + rocketNode.querySelectorAll("img")[0].src.split("RocketIcons")[1]
  chrome.storage.local.set({ selectedRocketIcon: '{"id": "' + rocketID + '", "link": "' + imgSrc + '"}' }, function () { })
  chrome.browserAction.setIcon({
    path: imgSrc
  })
}

async function enableRocketIcon() {
  let el = this.parentElement.parentElement.parentElement
  let rocketID = el.querySelectorAll("input")[0].id

  //save in storage
  chrome.storage.local.get(["availableRockets"], (resp) => {
    let avRockets = resp.availableRockets
    //only add rocketID, if is not in there already
    if (!resp.availableRockets.includes(rocketID)) {
      avRockets.push(rocketID)
      chrome.storage.local.set({ "availableRockets": avRockets })
    }
  })

  await new Promise(r => setTimeout(r, 7000))

  //change picture and text and enable radio button
  let timestamp = new Date().getTime()
  let rocketNode = document.querySelectorAll("#" + rocketID)[0]
  let rocketImage = rocketNode.parentElement.querySelectorAll("img")[0]
  let rocketText = rocketNode.parentElement.querySelectorAll("text")[0]
  let rocketInput = rocketNode.parentElement.querySelectorAll("input")[0]
  rocketImage.src = rocketIconsConfig[rocketID]["IconPathEnabled"] + "?t =" + timestamp
  rocketText.innerHTML = rocketIconsConfig[rocketID]["innerHTMLEnabled"]
  rocketInput.removeAttribute("disabled")

}

//this need to be done here since manifest v2
window.onload = async function () {

  //only display additionNotificationSection in chrome, because it doesnt work in ff
  if (isFirefox) {
    document.getElementById("additionNotificationSection").style.display = "none"
  }

  insertAllRocketIcons()

  //assign functions
  document.getElementById('save_data').onclick = saveUserData
  document.getElementById('delete_data').onclick = deleteUserData
  document.getElementById('switch_fwd').onclick = fwdGoogleSearch
  document.getElementById('open_shortcut_settings').onclick = openKeyboardSettings
  document.getElementById('open_shortcut_settings1').onclick = openKeyboardSettings
  document.getElementById("owa_mail_fetch").addEventListener('click', toggleOWAfetch)

  //document.getElementById('fav').onclick = dashboardCourseSelect
  //document.getElementById('crs').onclick = dashboardCourseSelect

  //add additional notification checkbox listener
  var checkbox = document.getElementById("additionalNotification")
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      //only if owa fetch enables
      chrome.storage.local.get(['enabledOWAFetch'], (resp) => {
        if (resp.enabledOWAFetch) {
          chrome.storage.local.set({ additionalNotificationOnNewMail: true })
        } else {
          document.getElementById("owa_fetch_msg").innerHTML = '<span class="red-text">F&uuml;r dieses Feature musst der Button auf \'Ein\' stehen.</span>'
          document.getElementById('additionalNotification').checked = false
        }
      })
    } else {
      chrome.storage.local.set({ additionalNotificationOnNewMail: false })
    }
  })

  //add studiengang-select listener
  document.getElementById("studiengangSelect").addEventListener("change", function () {
    let value = document.getElementById("studiengangSelect").value
    if (value == "add") {
      document.getElementById("addStudiengang").style.display = "block"
    } else {
      document.getElementById("addStudiengang").style.display = "none"
      chrome.storage.local.set({ studiengang: value }, function () { })
    }
  })

  //add storage listener for autologin
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
      if (key === "openSettingsPageParam" && changes[key].newValue === "auto_login_settings") {
        if (!document.getElementById("auto_login_settings").classList.contains("active")) {
          document.getElementById("auto_login_settings").click()
        }
        chrome.storage.local.set({ openSettingsPageParam: false }, function () { })
        document.getElementById("settings_comment").innerHTML = "<strong>F&uuml;r dieses Feature gib hier deine Zugangsdaten ein.</strong>"
      }
      if (key === "openSettingsPageParam" && changes[key].newValue === "add_studiengang") {
        document.getElementById("studiengangSelect").value = "add"
        document.getElementById("addStudiengang").style.display = "block"
        chrome.storage.local.set({ openSettingsPageParam: false }, function () { })
      }
    }
  })

  document.getElementById("switch_pdf_inline").addEventListener("click", function () {
    chrome.storage.local.set({ pdfInInline: this.checked }, function () { })
    document.getElementById("switch_pdf_newtab_block").style.visibility = this.checked ? "visible" : "hidden"

    if (this.checked) {
      //request necessary permissions
      chrome.permissions.request({ permissions: ["webRequest", "webRequestBlocking"], origins: ["https://bildungsportal.sachsen.de/opal/*"] },
        function (granted) {
          if (granted) {
            chrome.runtime.sendMessage({ cmd: "toggle_pdf_inline_setting", enabled: true })
            if (isFirefox) {
              alert("Perfekt! Bitte starte den Browser einmal neu, damit die Einstellungen uebernommen werden!")
              chrome.storage.local.set({ openSettingsPageParam: "opalCustomize", openSettingsOnReload: true }, function () { })
              chrome.runtime.sendMessage({ cmd: 'reload_extension' }, function (result) { })
            }
          } else {
            //permission granting failed :( -> revert checkbox settings
            chrome.storage.local.set({ pdfInInline: false })
            this.document.getElementById("switch_pdf_inline").checked = false
            alert("TUfast braucht diese Berechtigung, um die PDFs im Browser anzeigen zu koennen. Versuche es erneut.")
            document.getElementById("switch_pdf_newtab_block").style.visibility = "hidden"
          }
        }
      )
    } else {
      //disable "pdf in new tab" setting since it doesn't make any sense without inline pdf
      chrome.storage.local.set({ pdfInNewTab: false })
      document.getElementById("switch_pdf_newtab").checked = false
      chrome.runtime.sendMessage({ cmd: "toggle_pdf_inline_setting", enabled: false })
    }
  })

  document.getElementById("switch_pdf_newtab").addEventListener("click", function () {
    chrome.storage.local.set({ pdfInNewTab: this.checked }, function () { })
  })

  //set all switches and elements
  displayEnabled()


  //get things from storage
  chrome.storage.local.get(['saved_click_counter', "openSettingsPageParam", "isEnabled"], (result) => {
    //set text on isEnabled
    if (result.isEnabled) {
      document.getElementById('status_msg').innerHTML = '<span class="green-text">Du bist angemeldet und wirst automatisch in Opal & Co. eingeloggt.</span>'
    }
    else {
      document.getElementById('status_msg').innerHTML = '<span class="grey-text">Du bist nicht angemeldet.</span>'
    }
    //update saved clicks  
    //see if any params are available
    if (result.openSettingsPageParam === "auto_login_settings") { setTimeout(function () { this.document.getElementById("auto_login_settings").click() }, 200) }
    else if (result.openSettingsPageParam === "time_settings") {
      setTimeout(function () { this.document.getElementById("time_settings").click() }, 200)
      setTimeout(function () {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }, 500)
    }
    else if (result.openSettingsPageParam === "mailFetchSettings") { setTimeout(function () { this.document.getElementById("owa_mail_settings").click() }, 200) }
    else if (result.openSettingsPageParam === "opalCustomize") { setTimeout(function () { this.document.getElementById("opal_modifications").click() }, 200) }
    else if (result.openSettingsPageParam === "rocket_icons_settings") {
      setTimeout(function () {
        this.document.getElementById("rocket_icons").click()
      }, 200)
      setTimeout(function () {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }, 500)
    }



    if (result.saved_click_counter === undefined) { result.saved_click_counter = 0 }
    this.document.getElementById("settings_comment").innerHTML = "Bereits " + clicksToTimeNoIcon(result.saved_click_counter)
    chrome.storage.local.set({ openSettingsPageParam: false }, function () { })
  })

  //prep accordion
  let acc = document.getElementsByClassName("accordion")
  let i
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      //--only open one accordions section at a time
      let acc = document.getElementsByClassName("accordion")
      let i
      for (i = 0; i < acc.length; i++) {
        if (acc[i] === this) continue //skip actual clicked element
        let pan = acc[i].nextElementSibling
        if (pan.style.maxHeight) {
          pan.style.maxHeight = null
          acc[i].classList.toggle("active")
        }
      }
      //--
      //open clicked accordion section and set active
      this.classList.toggle("active")
      var panel = this.nextElementSibling
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px"
      }
    })
  }


  //additional host permissions: all urls
  //show, if dont have permission for all acceptDomainschrome.permissions.contains({
  chrome.permissions.contains({
    origins: ["*://*/*"]
  }, async function (hasPermission) {
    if (hasPermission) {
      // Everything alright.
    } else {
      // Show options to grant permission.
      let hpDiv = document.getElementById("addition_host_permissions")
      hpDiv.innerHTML = '<p><b>TUfast braucht eine zus&auml;tzliche Berechtigung, um zu funktionieren &#10071;&#10071;</b> <br> Dr&uuml;cke jetzt auf "Akzeptieren", um die Berechtigung anzufordern. Akzeptierst du die Berechtigung nicht, deaktiviert sich TUfast bei dir demn&auml;chst automatisch. Eine ausf&uuml;hrliche Erkl&auml;rung zum Thema findest du <a target="_blank" href="https://docs.google.com/document/d/1B3E6X5-Yy4UryxzS7CD-4m-Xfs0GKmWbFWfRPEB6Zz0/edit?usp=sharing">hier</a>. TUfast funktioniert weiterhin ausschlie&szlig;lich lokal auf deinem PC und sammelt keine Nutzerdaten. Wir entwickeln TUfast f&uuml;r euch &#128153; und hoffen, euer Leben damit ein bisschen einfacher zu machen.</p > <button class="button-deny" id="refuseDomains">Ablehnen</button><button id="acceptDomains" style="margin-left:30px;" class="button-accept">Akzeptieren</button><br>'
      await new Promise(r => setTimeout(r, 500))
      document.getElementById("refuseDomains").addEventListener('click', denyHostPermissionS) //innerHTML is not async. However, it takes time to render, so lets wait 500ms
      document.getElementById("acceptDomains").addEventListener('click', requestHostPermissionS)
    }
  })
}

