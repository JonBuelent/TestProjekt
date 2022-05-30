let titles = [];
let notes = [];
let titleArchives = [];
let noteArchives = [];
let titleTrashs = [];
let noteTrashs = [];
load();

function save() {
    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem('titles',titlesAsText);
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes',notesAsText);

    let titleArchivesAsText = JSON.stringify(titleArchives);
    localStorage.setItem('titleArchives',titleArchivesAsText);
    let noteArchivesAsText = JSON.stringify(noteArchives);
    localStorage.setItem('noteArchives',noteArchivesAsText);

    let titleTrashsAsText = JSON.stringify(titleTrashs);
    localStorage.setItem('titleTrashs',titleTrashsAsText);
    let noteTrashsAsText = JSON.stringify(noteTrashs);
    localStorage.setItem('noteTrashs',noteTrashsAsText);
}

function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    if (titlesAsText && notesAsText) { 
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }
    let titleArchivesAsText = localStorage.getItem('titleArchives');
    let noteArchivesAsText = localStorage.getItem('noteArchives');
    if (titleArchivesAsText && noteArchivesAsText) {
        titleArchives = JSON.parse(titleArchivesAsText);
        noteArchives = JSON.parse(noteArchivesAsText);
    }
    let titleTrashsAsText = localStorage.getItem('titleTrashs');
    let noteTrashsAsText = localStorage.getItem('noteTrashs');
    if (titleTrashsAsText && noteTrashsAsText) {
        titleTrashs = JSON.parse(titleTrashsAsText);
        noteTrashs = JSON.parse(noteTrashsAsText);
    }
}

function counter() {
    let note = titles.length;
    let trash = titleTrashs.length;
    let archiv = titleArchives.length;
    let counter = document. getElementById('counter');
    
    counter.innerHTML ='';
    counter.innerHTML = `
    <a href="index.html">Notizen: ${note}</a>
    <a href="archiv.html">Archiv: ${archiv}</a>
    <a href="trash.html">Papierkorb: ${trash}</a>
    `
    }
//FIRST RENDER
function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < titles.length; i++) {
    content.innerHTML += `
        <div>
            <div id="new-note" class="new-note">
                <h2>${titles[i]}</h2>
                <textarea>${notes[i]}</textarea>
                <div class="user-btn" >
                    <button onclick="addTrash(${i})" title="Papierkorb" class="btn"><img src="img/Delete_btn.png"></button>
                    <button onclick="addArchiv(${i})" title="Archiv" class="btn"><img src="img/Save-btn.png"></button>
                    <button onclick="addFinalTrash(${i})" title="Löschen" class="btn"><img src="img/FinalTrash.png"></button>
                </div>
            </div>
        </div>
        `;
        }
        counter();
    }
function addNote() {
    let title = document.getElementById('title');
    let note = document.getElementById('note');

    if(title.value == '' || note.value == '') {
    alert('Bitte füge einen Title und eine Notiz hinzu');
    } else {
    titles.push(title.value);
    notes.push(note.value);
    
    render();
    save();
    }
}
function addTrash(i) {
    titleTrashs.push(titles[i]);
    noteTrashs.push(notes[i]);

    titles.splice([i],1);
    notes.splice([i],1);

    render();
    save();
}
function addArchiv(i) {
    titleArchives.push(titles[i]);
    noteArchives.push(notes[i]);

    titles.splice([i],1);
    notes.splice([i],1);

    render();
    save();
}
function addFinalTrash(i) {

    titles.splice([i],1);
    notes.splice([i],1);

    render();
    save();
}

// ARCHIV RENDER
function renderArchiv() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < titleArchives.length; i++) {
        content.innerHTML +=`
        <div class="add-content">
            <div id="new-note" class="new-note">
                <h2>${titleArchives[i]}</h2>
                <textarea>${noteArchives[i]}</textarea>
                <div class="user-btn" >
                <button onclick="trashFromArchiv(${i})" title="archivieren" class="btn"><img src="img/Delete_btn.png"></button>
                <button onclick="noteFromArchiv(${i})" title="notiz" class="btn"><img src="img/Add_btn.png"></button>
                <button onclick="finalTrashFromArchiv(${i})" title="löschen" class="btn"><img src="img/FinalTrash.png"></button>
                </div>
            </div>
        </div>
        `;
        }
        counter();
    }
function trashFromArchiv(i) {
        titleTrashs.push(titleArchives[i]);
        noteTrashs.push(noteArchives[i]);

        titleArchives.splice([i],1);
        noteArchives.splice([i],1);

        renderArchiv();
        save();
    }
function noteFromArchiv(i) {
        titles.push(titleArchives[i]);
        notes.push(noteArchives[i]);

        titleArchives.splice([i],1);
        noteArchives.splice([i],1);

        renderArchiv();
        save();
    }
function finalTrashFromArchiv(i) {
        titleArchives.splice([i],1);
        noteArchives.splice([i],1);

        renderArchiv();
        save();
    }

// ARCHIV TRASH
function renderTrash() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < titleTrashs.length; i++) {
        content.innerHTML +=`
        <div class="add-content">
            <div id="new-note" class="new-note">
                <h2>${titleTrashs[i]}</h2>
                <textarea>${noteTrashs[i]}</textarea>
                <div class="user-btn" >
                <button onclick="archivFromTrash(${i})" title="Papierkorb" class="btn"><img src="img/Save-btn.png"></button>
                <button onclick="noteFromTrash(${i})" title="notiz" class="btn"><img src="img/Add_btn.png"></button>
                <button onclick="finalTrashFromTrash(${i})" title="löschen" class="btn"><img src="img/FinalTrash.png"></button>
                </div>
            </div>
        </div>
        `;
        }
        counter();
    }
function archivFromTrash(i) {
        titleArchives.push(titleTrashs[i]);
        noteArchives.push(noteTrashs[i]);

        titleArchives.splice([i],1);
        noteArchives.splice([i],1);

        renderTrash();
        save();
    }

function noteFromTrash(i) {
        titles.push(titleTrashs[i]);
        notes.push(noteTrashs[i]);

        titleTrashs.splice([i],1);
        noteTrashs.splice([i],1);

        renderTrash();
        save();
    }

function finalTrashFromTrash(i) {
        titleTrashs.splice([i],1);
        noteTrashs.splice([i],1);

        renderTrash();
        save();
    }