document.addEventListener("DOMContentLoaded", holidays, true);

async function holidays() {
  const doc = await getDoc();
  console.log(doc.values);
  if (!doc.values) {
    return;
  }

  const today = new Date();

  document.body.innerHTML += popup;
  const rangesDiv = document.getElementById("holidayRanges");
  rangesDiv.innerHTML = "";

  for (const row of doc.values) {
    const startDate = new Date(row[0]);
    const endDate = row[1] ? new Date(row[1]) : null;

    if (endDate && endDate.getTime() < today.getTime()) {
      continue; // holiday range is in past
    } else if (startDate.getTime() < today.getTime()) {
      continue; // holiday range is in past
    }

    if (startDate.getTime() == endDate.getTime()) {
      rangesDiv.innerHTML += `<div>${startDate.toLocaleString("de-DE", {
        dateStyle: "medium",
      })}</div>`;
    } else {
      rangesDiv.innerHTML += `<div>${startDate.toLocaleString("de-DE", {
        dateStyle: "medium",
      })} - ${endDate.toLocaleString("de-DE", {
        dateStyle: "medium",
      })}</div>`;
    }
  }

  if (rangesDiv.innerHTML == "") closeHoliday();
}

function getDoc() {
  return new Promise((resolve, reject) => {
    const url =
      "https://sheets.googleapis.com/v4/spreadsheets/" +
      "1aGQS4ytZh40Wzaj8tkzW_5Ea46OsclTDPg7HxYBqsmE/values/Tabellenblatt1!A:B" +
      "?key=" +
      "AIzaSyAhgBCd442mj_J9HdHGytM7Mi9PUXWgvxo";

    let setOptions = {
      method: "GET",
    };
    fetch(url, setOptions)
      .then((response) => {
        if (response.ok) {
          let reader = response.body.getReader();
          let decoder = new TextDecoder();
          reader.read().then(function (result) {
            let data = {};
            data = decoder.decode(result.value, { stream: !result.done });
            resolve(JSON.parse(data));
          });
        } else {
          console.log(response);
          console.log("Response wast not ok");
          reject(response);
        }
      })
      .catch((error) => {
        console.log("There is an error " + error.message);
        reject(error);
      });
  });
}

function closeHoliday() {
  document.getElementById("holidayPopup").style.display = "none";
}

const popup = `
<div id="holidayPopup" style="
  position: fixed; 
  z-index: 1000;
  right: 0;
  left: 0; 
  bottom: 0; 
  padding-left: 1.5rem;
  padding-right: 1.5rem; 
  padding-bottom: 1.5rem; 
  pointer-events: none; 
  font-family: Verdana, sans-serif;
">
  <div style="padding: 1.5rem; 
    border-radius: 0.75rem; 
    box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color); 
    max-width: 36rem; 
    background-color: #ffffff; 
    pointer-events: auto; 
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); 
  ">
    <p style="font-size: 0.875rem;
      line-height: 1.25rem; 
      line-height: 1.5rem; 
      color: #111827; 
      margin-bottom: 0.5rem;
    ">
      Achtung, bitte beachten! In folgenden Zeiträumen ist die Hundepension geschlossen:
    </p>
    <div id="holidayRanges" style="font-size: 0.875rem;
      line-height: 1.25rem; 
      line-height: 1.5rem; 
      color: #111827; 
    ">
    </div>
    <div style="display: flex; 
      margin-top: 1rem; 
      column-gap: 1.25rem; 
      align-items: center; 
    ">
      <button type="button" style="padding-top: 0.5rem;
        padding-bottom: 0.5rem; 
        padding-left: 0.75rem;
        padding-right: 0.75rem; 
        border-radius: 0.375rem; 
        font-size: 0.875rem;
        line-height: 1.25rem; 
        font-weight: 600; 
        color: #ffffff; 
        background-color: #111827; 
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 
        
        :hover {
        background-color: #374151; 
      }"
      onclick="closeHoliday()"
      >
        Schließen
      </button>
    </div>
  </div>
</div>
`;
