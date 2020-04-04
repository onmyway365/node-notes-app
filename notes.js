const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'))
    } else {
        console.log(chalk.red.inverse('No Note Found!'))
    }
    saveNotes(notesToKeep)
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.white.inverse.bold('Your Notes'))

    notes.forEach(note => {
        console.log(chalk.blue.inverse(note.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()

    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.blue.inverse.bold(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}