(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),s=t.n(o),u=t(2),c=t(3),l=t.n(c),m="/api/persons",i=function(){var e=l.a.get(m);return console.log(e),e},d=function(e){return l.a.post(m,e)},b=function(e,n){return l.a.put("".concat(m,"/").concat(e),n)},p=function(e){return l.a.delete("".concat(m,"/").concat(e))},f=function(e){return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:e.search,onChange:e.handler}))},h=t(14),g=function(e){var n=Object(h.a)(e.persons);return r.a.createElement("form",{onSubmit:function(t){if(t.preventDefault(),e.newName.trim()&&e.newNumber.trim()){var a={name:e.newName,number:e.newNumber};if(n.some((function(n){return n.name===e.newName}))){if(console.log(n.findIndex((function(n){return n.name===e.newName}))),window.confirm("".concat(e.newName," already exists in the phonebook. Replace old number with new?"))){var r=n[n.findIndex((function(n){return n.name===e.newName}))].id;b(r,a).then(e.updateList())}}else if(n.some((function(n){return n.number===e.newNumber})))window.alert("".concat(e.newNumber," already exists in the phonebook. Please add a different number"));else{var o={type:"success",msg:"Added ".concat(e.newName)};d(a).then((function(n){e.setPersons(e.persons.concat(n.data)),e.setNewName(""),e.setNewNumber(""),e.message(o),setTimeout((function(){e.message(null)}),5e3)}))}}else window.alert("Text boxes cannot be empty")}},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),r.a.createElement("div",null,"number:"," ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},w=function(e){return r.a.createElement("li",null,e.person.name," ",e.person.number," ",r.a.createElement("button",{onClick:function(){var n={type:"error",msg:"".concat(e.person.name," was already been removed from database")};window.confirm("Delete ".concat(e.person.name,"?"))&&p(e.person.id).then(i()).then(e.updateList()).catch((function(t){e.message(n),setTimeout((function(){e.message(null)}),5e3),e.updateList()}))}},"Delete"))},v=function(e){console.log("props persons",e.persons);var n=e.showAll?e.persons:e.persons.filter((function(n){return n.name.toLowerCase().trim().includes(e.search.toLowerCase())||n.number.toLowerCase().trim().includes(e.search.toLowerCase())}));return r.a.createElement("div",null,n.map((function(n){return r.a.createElement(w,{key:n.name,person:n,updateList:e.updateList,message:e.message})})))},N=function(e){var n=e.message;return null===n?null:"error"===n.type?r.a.createElement("div",{style:{color:"red",background:"lightgrey",borderStyle:"solid",borderRadius:5,borderColor:"red",padding:10,marginBottom:10}},n.msg):"success"===n.type?r.a.createElement("div",{style:{color:"green",background:"lightgrey",borderStyle:"solid",borderColor:"green",borderRadius:5,padding:10,marginBottom:10}},n.msg):void 0},E=(t(37),function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],s=Object(a.useState)(""),c=Object(u.a)(s,2),l=c[0],m=c[1],d=Object(a.useState)(""),b=Object(u.a)(d,2),p=b[0],h=b[1],w=Object(a.useState)(""),E=Object(u.a)(w,2),y=E[0],j=E[1],C=Object(a.useState)(!0),O=Object(u.a)(C,2),k=O[0],L=O[1],S=Object(a.useState)(null),x=Object(u.a)(S,2),A=x[0],P=x[1];Object(a.useEffect)((function(){i().then((function(e){o(e.data)}))}),[]);var B=function(){i().then((function(e){o(e.data)}))};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(N,{message:A}),r.a.createElement(f,{search:y,handler:function(e){e.target.value.trim()?L(!1):L(!0),j(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(g,{persons:t,newName:l,newNumber:p,setPersons:o,setNewName:m,setNewNumber:h,handleNameChange:function(e){m(e.target.value)},handleNumChange:function(e){h(e.target.value)},updateList:B,message:P}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(v,{persons:t,search:y,showAll:k,updateList:B,message:P}))});s.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.16f53475.chunk.js.map