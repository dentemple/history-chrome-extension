document.addEventListener("DOMContentLoaded", function() {
  var port = chrome.extension.connect({
    name: "Sample Communication"
  })
  port.onMessage.addListener(function(msg) {
    const listString = msg.reduce((string, site) => {
      string += `<li class="list-item__site">${site.url.substring(0, 30)}</li>`
      return string
    }, "")

    window.document.querySelector("#site-list").innerHTML = listString
  })

  document.querySelector("#form-buttons").addEventListener(
    "click",
    function(event) {
      event.preventDefault()
    },
    false
  )

  //working-counter, working-minus
  document.querySelector("#working-minus").addEventListener("click", function() {
    updateSelection("#working-counter", +this.value)
  })
  document.querySelector("#working-plus").addEventListener("click", function() {
    updateSelection("#working-counter", +this.value)
  })
  document.querySelector("#break-minus").addEventListener("click", function() {
    updateSelection("#break-counter", +this.value)
  })
  document.querySelector("#break-plus").addEventListener("click", function() {
    updateSelection("#break-counter", +this.value)
  })

  let isCounting = false
  const resetButton = document.querySelector("#current-counter")
  resetButton.addEventListener("click", function() {
    isCounting = false
    if (masterButton.value === "work") {
      masterButton.innerHTML = document.querySelector("#working-counter").innerHTML
    } else {
      masterButton.innerHTML = document.querySelector("#break-counter").innerHTML
    }
  })

  const masterButton = document.querySelector("#current-counter")

  masterButton.addEventListener("click", function() {
    isCounting = true
    runCounter(+masterButton.innerHTML)
  })

  updateClock()

  function runCounter(duration) {
    console.log({ value: masterButton.value, duration, isCounting })
    // var date = new Date();
    // var seconds = date.getTime() / 1000; //1440516958
    // var end = seconds + duration

    let x = setInterval(function() {
      if ((isCounting = false)) {
        clearInterval(x)
      }

      if (duration < 0) {
        if (masterButton.value === "work") {
          masterButton.value === "break"
          duration = masterButton.innerHTML = +document.querySelector("#break-counter").innerHTML
        } else {
          masterButton.value === "work"
          duration = masterButton.innerHTML = +document.querySelector("#working-counter").innerHTML
        }
      } else {
        duration -= 1
        masterButton.innerHTML = duration
        console.log({ duration })
      }
    }, 950)
  }

  function updateSelection(counterId, value) {
    let element = document.querySelector(counterId)
    let previousValue = +element.innerHTML
    console.log({ counterId, value, previousValue })
    element.innerHTML = previousValue + value
  }

  function updateClock() {
    let currentTime = new Date()

    var currentHours = currentTime.getHours()
    var currentMinutes = currentTime.getMinutes()
    var currentSeconds = currentTime.getSeconds()

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes
    currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds

    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = currentHours < 12 ? "AM" : "PM"

    // Convert the hours component to 12-hour format if needed
    currentHours = currentHours > 12 ? currentHours - 12 : currentHours

    // Convert an hours component of "0" to "12"
    currentHours = currentHours == 0 ? 12 : currentHours

    // Compose the string for display
    var currentTimeString =
      currentHours + ":" + currentMinutes + ":" + currentSeconds + "&nbsp;" + timeOfDay

    document.querySelector("#current-time").innerHTML = currentTimeString

    setInterval(() => updateClock(), 1000)
  }
})
