let DB_type;
let input = "post";
const postDBModel = "Hi! I'm Post";
const poetryDBModel = "Hi! I'm Poetry";

if(input === "post") {
    DB_type = postDBModel;
}
else if(input === "poetry") {
    DB_type = poetryDBModel;
}
else {
    console.log("No DB");
}
console.log(DB_type);