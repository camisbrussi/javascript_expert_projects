import DraftLog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readline from 'readline';
import Person from './person.js';

 class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database, language);
  }

  initializeTable(database, language) {
    const data = database.map((item) => new Person(item).formattedVehicles(language));
    const table = chalkTable(this.getTableOptions(), data);
    this.print = console.draft(table);
    this.data = data;
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions(), this.data));
  }

  question(msg = '') {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.blue('Vehicles') },
        { field: 'kmTraveled', name: chalk.yellow('Km Traveled') },
        { field: 'from', name: chalk.gray('From') },
        { field: 'to', name: chalk.red('To') },
      ],
    };
  }
}

export default TerminalController