import { Query } from "./index";

const all = async()=> Query('SELECT * FROM chirps ');
const one = async(id)=> Query('SELECT * FROM chirps  where chirps.id=?',[id]);

const post = async(userid,content,location)=> Query(`INSERT INTO chirps(userid,content,location) VALUES(${userid},'${content}','${location}')`);

const update = async(id,content,location)=> Query(`UPDATE chirps SET content = '${content}', location ='${location}' where chirps.id=${id}`);

const remove= async(id)=> Query(`DELETE FROM chirps WHERE chirps.id=${id}`)

export default {
    all,
    one,
    post,
    update,
    remove
};

