const validator = require('validator')
const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./notes')

// Customize yargs version
yargs.version('1.0.1')

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Creating the read command
yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title: {
            describe: 'Read a note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

// Creating the list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes()
    }
})

yargs.parse()
// console.log(yargs.argv)

