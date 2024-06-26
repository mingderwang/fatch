const { Parser } = require("htmlparser2");
const { DomHandler } = require("domhandler");
const { getJSONFromDOMElement } = require("./helper");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

(async () => {
const response = await fetch(process.env.URL);
const html = await response.text(); // HTML string

const dom = new JSDOM(html);
const document = dom.window.document;
const XPathResult_FIRST_ORDERED_NODE_TYPE = 9;

// you can use any document function
//console.log(dom.window.document.querySelector("p").textContent); 

// or use document.evaluate() with XPATH, you can find the full XPATH for an element in devtools from a Inspection Element copy
const result = document.evaluate(process.env.XPATH, document, null, XPathResult_FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
const obj = getJSONFromDOMElement(result);

// if you want to see your current element in JSON
//console.log(JSON.stringify(obj.childNodes, null, 2));

// to print a list of text
for (const element of obj.childNodes) {
  console.log(element.childNodes[0].childNodes[1].text);
}
})()
