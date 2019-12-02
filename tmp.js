let promises = [];
let p1= new Promise((resolve, reject) => {
    let start = Date.now();
    setTimeout(() => {
        resolve("p1 resolved at "+ (Date.now()-start));
    }, 9000);
})

let p2= new Promise((resolve, reject) => {
    let start = Date.now();
    setTimeout(() => {
        resolve("p2 resolved at at "+ (Date.now()-start));
    }, 3000);
})

let p3= new Promise((resolve, reject) => {
    let start = Date.now();
    setTimeout(() => {
        resolve("p3 resolved at "+(Date.now()-start));
    }, 3000);
})

promises.push(...[p1, p2, p3]);
//p1.then(e => console.log(e));

Promise.all(promises).then(e => console.log(e)).catch(e => console.log("error"));