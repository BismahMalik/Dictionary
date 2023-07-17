const urlParams = new URLSearchParams(window.location.search);
const word = urlParams.get("word");
const enteredWordElement = document.getElementById("words");
enteredWordElement.textContent = word;

let currentUrl = `http://localhost:3000/searchword?word=${encodeURIComponent(word)}`;
let currentRequest = fetch(currentUrl);
let fallBackUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
let fallBackRequest = fetch(fallBackUrl);

currentRequest
  .then((response) => {
    return response.json();
  })
  .then((data) => {

    if (data.length > 0) {
      let meaningsHtml = data[0].meanings
        .slice(0, 2) // Extract the first two meanings
        .map((meaning) => `<li>${meaning.definitions[0].definition}</li>`)
        .join("");

      let htmlstr = `
                You searched for a word: ${data[0].word}
                <br> Here are the meanings:
                <ul>
                    ${meaningsHtml}
                </ul>`;

      result.innerHTML = htmlstr;
    } else {
      fallBackRequest
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            let meaningsHtml = data[0].meanings
              .slice(0, 2) // Extract the first two meanings
              .map((meaning) => `<li>${meaning.definitions[0].definition}</li>`)
              .join("");

            let htmlstr = `
                            You searched for a word: ${data[0].word}
                            <br> Here are the meanings:
                            <ul>
                                ${meaningsHtml}
                            </ul>`;

            result.innerHTML = htmlstr;
          } else {
            result.innerHTML = "Meanings not found.";
          }
        })
        .catch((error) => {
          result.innerHTML = "An error occurred while retrieving data from the fallback URL.";
        });
    }
  })
  .catch((error) => {
    result.innerHTML = "An error occurred while retrieving data from the current URL.";
  });


