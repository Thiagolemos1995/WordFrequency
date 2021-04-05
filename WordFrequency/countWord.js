const getUserInput = () => document.getElementById("inputString").value;
const printInput = input =>
  (document.getElementById("output").innerHTML = input);
const cleanInput = str =>
  str
     .replace(/[?.!,"\(\)]/g, "")
     .replace(/[ ]{2,}/g, "")
     .trim()
     .toLowerCase();
const wordFreq = string =>
  string
    .split(/\s/)
    .reduce(
      (output, word) =>
        Object.assign(output, { [word]: output[word] ? output[word] + 1 : 1 }),
      {}
    );
const sortByValue = obj =>
     Object.entries(obj)
     .map(currentValue => [currentValue[1], currentValue[0]])
     .sort((a, b) => parseInt(b) - parseInt(a))
     .map((currentValue, index) => [
      index + 1,
      currentValue[0],
      currentValue[1]
    ]);

// Definição das variaveis que serão parâmetros de entrada da função addTable abaixo
const tablediv = "div-table";
const tableheader = ["Rank", "Count", "Word"];

const addTable = (divId, headers, data) => {
     const myTableDiv = document.getElementById(divId);
     const table = document.createElement("table");

     //Definição do elemento tr com os valores do array de string que definem o header
     const tr = document.createElement("tr");
     table.appendChild(tr);
     headers.forEach(currentValue => {
         const th = document.createElement("th");
         th.appendChild(document.createTextNode(currentValue));
         tr.appendChild(th);
    });

    //Definição do conteudo da tabela td com os respectivos valores lidos no input data
    data.forEach(currentValue => {
         const tr = document.createElement("tr");
         currentValue.forEach(currentValue => {
             const td = document.createElement("td");
             td.appendChild(document.createTextNode(currentValue));
             tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    myTableDiv.appendChild(table);
};

// Função de processamento das demais anteriores, leitura, escrita e criação da tabela na página
const processData = () => {
     const wordFrequency = sortByValue(wordFreq(cleanInput(getUserInput())));
     document.getElementById("div-table").innerHTML = "";
     addTable(tablediv, tableheader, wordFrequency);
};

// função para adicionar um evento ao click do botão translate, para verificar se há algum texto escrito, caso positivo, realiza o processamento acima
document.getElementById("translate").onclick = function(){
  var textvalue = document.getElementById("inputString").value
     if(textvalue == ""){
       alert("Please enter the text that you want to count words!"); 
     }else{
      processData()
       }
 };
