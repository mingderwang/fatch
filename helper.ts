export function getJSONFromDOMElement(element){
    if (!element || typeof element !== 'object') {
        return null;
    }
    const json = {};
    let a = element.nodeType;
    json.nodeType = a;
    if(a === 3){
        let e = element.textContent;
        if(e && e.trim().length > 0) json.text = e;
        else return null;
    }else if (a === 1) {
        json.nodeName = element.nodeName;
        let b = element.attributes;
        if (b && b.length>0) {
            let attributes = {};
            for (let i = 0; i < b.length; i++) {
                const attribute = b[i];
                attributes[attribute.name] = attribute.value;
            }
            json.attributes = attributes;
        }
        if (json.nodeName === "svg") {
            json.innerHTML = element.innerHTML;
        }else{
            let c = element.childNodes;
            if (c && c.length>0) {
                let childNodes = [];
                c.forEach((child)=>{
                    let r = getJSONFromDOMElement(child);
                    if(r) childNodes.push(r);
                });
                json.childNodes = childNodes;
            }
        }
    }else return null;
    return json;
}
