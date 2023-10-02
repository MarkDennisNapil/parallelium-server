let filename = "d38e05d00c22ebbc062a27f7f438309b-Jarico - Landscape [NCS BEST OF](MP3_128K).mp3";
console.log(filename.length);

let myfilename = filename.split(" ").toString();
let finalname = myfilename.toString();
let thisName = finalname.replace(",", "_");
console.log(myfilename);
/*for(let i = 0; i < myfilename.length; i++) {
    finalname[i] = myfilename[i];
}*/
//console.log(finalname.toString().replace(",", "_"));
console.log(thisName);
//let repstr = myfilename.replace(" ", "_");
//console.log(repstr);
let thisFile = "dance.mp3";
console.log("http://localhost:8000/resources/" + thisFile);
