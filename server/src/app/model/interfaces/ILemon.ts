import mongoose = require("mongoose");

interface ILemon extends mongoose.Document {
    name: string;
    color: string;
    level: number;
    source: string;
}

export = ILemon;