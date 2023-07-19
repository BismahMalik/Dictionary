
const urlParams = new URLSearchParams(window.location.search);
const word = urlParams.get("word");
const enteredWordElement = document.getElementById("words");
enteredWordElement.textContent = word;

let currentUrl = `https://api.example.com/api/users?word=${encodeURIComponent(word)}`;
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
                Word: ${data[0].word.toUpperCase()}
                <br>Meanings:
                <br>
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
                            Word: ${data[0].word.toUpperCase()}
                            <br>Meanings:
                            <br>
                            <ul>
                                ${meaningsHtml}
                            </ul>`;

            result.innerHTML = htmlstr;
          } else {
            result.innerHTML = "Meanings not found.";
          }
        })
        .catch((error) => {
          result.innerHTML = "Word Not Found";
        });
    }
  })
  .catch((error) => {
    result.innerHTML = "Word Not Found";
  });


