const { json } = require("express");
const fs = require("fs");
const { stringify } = require("querystring");

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("creating a repository requires a filename.");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, { encoding: "utf8" })
    );
  }

  async create(attrs) {
    const recordes = await this.getAll();
    recordes.push(attrs);
    await this.writeAll(recordes);
  }

  async writeAll(recordes) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(recordes, null, 2)
    );
  }
}

const test = async () => {
  const repo = new UsersRepository("users.json");
  await repo.create({ email: "mohamed2", password: "1234" });
  const users = await repo.getAll();

  console.log(users);
};

test();
