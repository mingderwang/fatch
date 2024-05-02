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

//console.log(dom.window.document.querySelector("p").textContent); 
const result = document.evaluate(process.env.XPATH, document, null, XPathResult_FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
const obj = getJSONFromDOMElement(result);
//console.log(JSON.stringify(obj.childNodes, null, 2));

for (const element of obj.childNodes) {
  console.log(element.childNodes[0].childNodes[1].text);
}
})()
