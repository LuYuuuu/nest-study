import * as mongoose from 'mongoose';

export const ChatsSchema = new mongoose.Schema({
    // 里面数据必须和数据库表里面对应
    account_a: String,
    account_b: String,
    date: String,
    history:Array,
});