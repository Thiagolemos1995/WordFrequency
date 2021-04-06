const getUserInput = () => document.getElementById("inputString").value;
const printInput = input =>
  (document.getElementById("output").innerHTML = input);
const cleanInput = str =>
  str
     .replace(/[?.!,"\(\)]/g, "")
     .replace(/[ ]{2,}/g, "")
     .trim()
     .toLowerCase();

//Função para verificar a frequência das palvras no texto inserido
const wordFreq = string =>
  string
    .split(/\s/)
    .reduce(
      (output, word) =>
        Object.assign(output, { [word]: output[word] ? output[word] + 1 : 1 }),
      {}
    );

//Função para ordenar a tabela de acordo com a frequencia das palavras
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
     var count = wordFreq(cleanInput(getUserInput()));
     window.console.log(count);
};

 function pieChat(){
   var data = wordFreq(cleanInput(getUserInput()));
   var data = d3.entries(data);

   var width = 360;
   var height = 360;
   var radius = Math.min(width, height) / 2;

   var color = d3.scaleOrdinal(d3.schemeCategory20b);

   var svg = d3.select('body')
     .append('svg')
       .attr('width', width)
       .attr('height', height)
     .append('g')
       .attr('transform', 'translate(' + (width / 2) +
       ',' + (height / 2) + ')');

   var arc = d3.arc()
     .innerRadius(0)
     .outerRadius(radius);

   var pie = d3.pie()
     .value(function(d) {
       return d.value;
     })
     .sort(null);
   var data_ready = pie(d3.entries(data))

   var path = svg.selectAll('path')
     .data(pie(data))
     .enter()
     .append('path')
     .attr('d', arc)
     .attr('fill', function(d, i) {
       return color(d.data.key);
     });
 }

function extracounts(divcaraccount, divparcount, divsentcount) {
  document.getElementById(divcaraccount).innerHTML = (document.getElementById('inputString').value.length);
  document.getElementById(divparcount).innerHTML = (document.getElementById('inputString').value.replace(/\n$/gm, '').split(/\n/).length);
  document.getElementById(divsentcount).innerHTML = (document.getElementById('inputString').value.split(/[.|!|?]+/g).length);
}

// função para adicionar um evento ao click do botão translate, para verificar se há algum texto escrito, caso positivo, realiza o processamento acima
document.getElementById("translate").onclick = function(){
  var textvalue = document.getElementById("inputString").value
  var textlength = document.getElementById("inputString").value
  window.console.log(textlength.length);
     if(textvalue < 1){
        alert("Please enter the text that you want to count words!"); 
     }else{
        processData();
        extracounts("caraccount","paragraphcount", "sentencecount");
        document.getElementById("characters").style.visibility = "visible";
        document.getElementById("paragraphs").style.visibility = "visible";
        document.getElementById("sentences").style.visibility = "visible";
        d3.select("svg").remove();
        pieChat();
      }
 };
