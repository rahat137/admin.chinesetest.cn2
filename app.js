async function loadData() {
  const res = await fetch("data.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Cannot load data.json");
  return await res.json();
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? "-";
}

function setImage(id, src) {
  const el = document.getElementById(id);
  if (el) el.src = src || "photo.jpg";
}

function fillPage(item) {
  setText("name", item.name);
  setText("cnname", item.cnname);
  setText("nation", item.nation);
  setText("gender", item.gender);

  setText("center", item.center);
  setText("ticket", item.ticket);
  setText("certno", item.certno);
  setText("type", item.type);
  setText("time", item.time);

  setText("l", item.hsk.listening);
  setText("r", item.hsk.reading);
  setText("w", item.hsk.writing);
  setText("total", item.hsk.total);

  setText("speak", item.hskk.score);
  setText("speak_total", item.hskk.score);
  setText("status", item.hskk.status);

  setText("hskTitle", item.hsk.title);
  setText("hskkTitle", item.hskk.title);

  setImage("photo", item.photo);

  document.getElementById("resultCard").style.display = "block";
}

function showMsg(text) {
  document.getElementById("msg").textContent = text || "";
}

document.getElementById("searchBtn").addEventListener("click", async () => {
  try {
    showMsg("");
    const ticket = document.getElementById("ticketInput").value.trim();
    if (!ticket) return showMsg("Please enter a Ticket No.");

    const db = await loadData();
    const found = db.find(x => x.ticket.toLowerCase() === ticket.toLowerCase());

    if (!found) {
      document.getElementById("resultCard").style.display = "none";
      return showMsg("No record found in DEMO database. Try DEMO-HSK5-0001 or DEMO-HSK5-0002");
    }

    fillPage(found);
  } catch (e) {
    showMsg("Error loading demo data. Please check data.json file.");
  }
});
