const fs = require("fs");

let wordsMap = new Map();
let excludeWordsMap = new Map();

function getExcludeWords(){
    try {
        const data = fs.readFileSync("exclude-words.txt","utf-8");
        const excludeWords = data.split("\n");
            excludeWords.forEach((word)=>{
                word = word.toLowerCase();
                excludeWordsMap.set(word,1);
            });
        return excludeWordsMap;    
      } catch (err) {
        console.error(err);
      }
}

function getFileContent(i){
    try{
        const data = fs.readFileSync(`Page${i}.txt`,"utf-8");
        wordsArr =  data.split(" ");
        wordsArr.forEach((word)=>{
            word = word.toLowerCase();
            for(let i = 0;i<word.length;i++){
                if(word.charAt(i) === '.' || word.charAt(i) === '(' || word.charAt(i) === ')' || word.charAt(i) === ',' || word.charAt(i) === '"' || word.charAt(i) === '/' || word.charAt(i) === "-" || word.charAt(i) === ':')
                   word =  word.replaceAll(word.charAt(i),"");
            }

            if(isNaN(word)){
                if(word.includes("\r\n")){
                    word =  word.replaceAll("\r\n"," ");
                    word.split(" ").forEach((word)=>{
                        if(!excludeWordsMap.has(word) && isNaN(word)){
                            wordIndexArr =  wordsMap.get(word);
                            if(wordsMap.has(word)){
                                if(wordIndexArr[wordIndexArr.length - 1] != i)
                                    wordsMap.set(word,[...wordIndexArr,i]);
                            }else
                                wordsMap.set(word,[i]);   
                        }
                    })
                }else{
                    if(!excludeWordsMap.has(word) && isNaN(word)){
                        wordIndexArr =  wordsMap.get(word);
                        if(wordsMap.has(word)){
                            if(wordIndexArr[wordIndexArr.length - 1] != i)
                                wordsMap.set(word,[...wordIndexArr,i]);
                        }else
                            wordsMap.set(word,[i]);   
                    }
                }
            }
        });
    
        return wordsMap;
    }catch(err){
        console.log(err);
    }
}


function main(){
    excludeWordsMap = getExcludeWords();
    for(let i =1 ;i<=3;i++){
        wordsMap = getFileContent(i);
    }
}

function displayIndexWords(){
    let words = new Map([...wordsMap.entries()].sort());
    console.log("Word : Page Numbers");
    console.log("-------------------");
    words.forEach(function(value, key) {
        console.log(key + " : " + value);
    })
}

main();
displayIndexWords();