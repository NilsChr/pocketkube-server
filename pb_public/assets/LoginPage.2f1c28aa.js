import{z as w,a1 as f,af as h,ag as g,r,A as _,E as y,F as c,a4 as e,G as n,ah as u,aa as v}from"./index.29a68900.js";import{Q as x,_ as b}from"./pocketkubelogo.9833cf42.js";const V={class:"column col-xs-10 col-sm-4 col-md-3 col-lg-2 items-center"},k=e("div",{class:"row full-width justify-center q-ma-xl"},[e("img",{src:b,style:{width:"200px"}})],-1),q={class:"row justify-center"},C=w({__name:"LoginPage",setup(B){const d=f(),{pb:i}=h(d),m=g(),l=r(""),a=r(""),p=async()=>{try{const s=await i.value.admins.authWithPassword(l.value,a.value);console.log(s),m.push("/")}catch(s){console.log(s)}};return(s,o)=>(_(),y(x,{class:"row items-center justify-center q-pa-lg full-width"},{default:c(()=>[e("div",V,[k,e("form",q,[n(u,{class:"q-mb-lg full-width",dense:"",modelValue:l.value,"onUpdate:modelValue":o[0]||(o[0]=t=>l.value=t),placeholder:"username",outlined:"",rounded:"","bg-color":"white","input-style":{color:"black"}},null,8,["modelValue"]),n(u,{class:"q-mb-lg full-width",dense:"",modelValue:a.value,"onUpdate:modelValue":o[1]||(o[1]=t=>a.value=t),placeholder:"password",outlined:"",rounded:"","bg-color":"white","input-style":{color:"black"},type:"password"},null,8,["modelValue"]),n(v,{style:{"max-width":"120px"},color:"cyan-2",push:""},{default:c(()=>[e("div",{class:"row items-center no-wrap"},[e("label",{class:"q-ml-sm text-grey-10",onClick:p},"Login")])]),_:1})])])]),_:1}))}});export{C as default};