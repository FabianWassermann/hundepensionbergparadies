document.addEventListener("DOMContentLoaded", holidays, true);

async function holidays() {
  // Check if popup was already shown today
  const today = new Date().toDateString();
  const lastShown = localStorage.getItem("holidayPopupLastShown");
  
  if (lastShown === today) {
    return; // Already shown today, don't show again
  }

  let doc;
  try {
    doc = await getDoc();
  } catch (error) {
    console.error("Holiday data could not be loaded:", error);
    return;
  }

  if (!doc || !Array.isArray(doc.values)) {
    return;
  }

  const currentDate = new Date();

  if (!document.getElementById("holidayPopup")) {
    document.body.insertAdjacentHTML("beforeend", popup);
  }

  const popupEl = document.getElementById("holidayPopup");
  const rangesDiv = document.getElementById("holidayRanges");
  if (!popupEl || !rangesDiv) {
    return;
  }
  rangesDiv.innerHTML = "";

  let hasUpcomingHolidays = false;

  for (const row of doc.values) {
    const startDate = new Date(row[0]);
    const endDate = row[1] ? new Date(row[1]) : null;

    if (endDate && endDate.getTime() < currentDate.getTime()) {
      continue; // holiday range is in past
    } else if (!endDate && startDate.getTime() < currentDate.getTime()) {
      continue; // single day holiday is in past
    }

    hasUpcomingHolidays = true;

    if (!endDate || startDate.getTime() === endDate.getTime()) {
      const rangeItem = document.createElement("div");
      rangeItem.textContent = startDate.toLocaleString("de-DE", {
        dateStyle: "medium",
      });
      rangesDiv.appendChild(rangeItem);
    } else {
      const rangeItem = document.createElement("div");
      rangeItem.textContent = `${startDate.toLocaleString("de-DE", {
        dateStyle: "medium",
      })} - ${endDate.toLocaleString("de-DE", {
        dateStyle: "medium",
      })}`;
      rangesDiv.appendChild(rangeItem);
    }
  }

  if (!hasUpcomingHolidays || rangesDiv.children.length === 0) {
    closeHoliday();
    return;
  }

  popupEl.style.display = "block";
}

function getDoc() {
  return new Promise((resolve, reject) => {
    const url =
      "https://sheets.googleapis.com/v4/spreadsheets/" +
      "1jwl626rTkL6CL0mGvreGBbVh-6ajFwN21_HG7UMaQH4/values/Tabellenblatt1!A:B" +
      "?key=" +
      "AIzaSyBClRUPSR66kIuGZeDK9fWvZ7NS14Kdxi0";

    fetch(url, { method: "GET" })
      .then((response) => {
        return response.json().then((data) => {
          if (response.ok) {
            resolve(data);
          } else {
            console.error("Google API Fehler:", data.error.message);
            reject(data.error);
          }
        });
      })
      .catch((error) => {
        console.error("Netzwerk oder Parsing Fehler:", error);
        reject(error);
      });
  });
}

function closeHoliday() {
  const today = new Date().toDateString();
  localStorage.setItem("holidayPopupLastShown", today);
  const popupEl = document.getElementById("holidayPopup");
  if (popupEl) {
    popupEl.style.display = "none";
  }
}

const popup = `
<div id="holidayPopup" style="
  position: fixed; 
  z-index: 9999;
  right: 20px;
  left: auto; 
  bottom: 20px; 
  max-width: 400px;
  pointer-events: auto; 
  font-family: Verdana, sans-serif;
">
  <div style="
    padding: 1.5rem; 
    border-radius: 0.75rem; 
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1); 
    background-color: #ffffff; 
    border-left: 4px solid #588c3a;
  ">
    <p style="
      font-size: 0.95rem;
      line-height: 1.5rem; 
      color: #111827; 
      margin: 0 0 0.75rem 0;
      font-weight: 600;
    ">
      ⚠️ Achtung, bitte beachten!
    </p>
    <p style="
      font-size: 0.875rem;
      line-height: 1.4rem; 
      color: #374151; 
      margin: 0 0 0.5rem 0;
    ">
      In folgenden Zeiträumen ist die Hundepension geschlossen:
    </p>
    <div id="holidayRanges" style="
      font-size: 0.875rem;
      line-height: 1.5rem; 
      color: #111827;
      font-weight: 500;
      margin-bottom: 1rem;
    ">
    </div>
    <div style="
      display: flex; 
      justify-content: flex-end;
    ">
      <button type="button" style="
        padding: 0.5rem 1rem;
        border-radius: 0.375rem; 
        font-size: 0.875rem;
        font-weight: 600; 
        color: #ffffff; 
        background-color: #588c3a; 
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease;
      "
      onmouseover="this.style.backgroundColor='#40632b'"
      onmouseout="this.style.backgroundColor='#588c3a'"
      onclick="closeHoliday()"
      >
        Verstanden
      </button>
    </div>
  </div>
</div>
`;
