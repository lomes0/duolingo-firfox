(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
        if (window.hasRun) {
                return;
        }
        window.hasRun = true;
        console.log('Extension: Init')

        let answers = [];
        let mode = false;

        window.addEventListener('keyup', function(e) { 

                console.log(e)

                if (e.key == 'Enter') {

                        // insert
                        if (!mode) {
                                let an = document.getElementsByClassName('_1UqAr')[0].firstChild
                                if (an != null) {
                                        console.log('push ' + an.data)
                                        answers.push(an.data);
                                }
                        }
                }
        });

        window.addEventListener('keydown', function(e) { 

                if (e.key === '1') {
                        mode = !mode;
                        console.log(mode);
                }

                if (e.key === ' ') {

                        let an = answers.shift()
                        console.log('pop ' + an)
                        document.getElementsByTagName('textarea')[0].value = an
                }
        });

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertBeast(beastURL) {
    removeExistingBeasts();
    let beastImage = document.createElement("img");
    beastImage.setAttribute("src", beastURL);
    beastImage.style.height = "100vh";
    beastImage.className = "beastify-image";
    document.body.appendChild(beastImage);
  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingBeasts() {
    let existingBeasts = document.querySelectorAll(".beastify-image");
    for (let beast of existingBeasts) {
      beast.remove();
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
    } else if (message.command === "reset") {
      removeExistingBeasts();
    }
  });
})();
