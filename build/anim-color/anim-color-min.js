YUI.add("anim-color",function(b){var a=Number;b.Anim.getUpdatedColorValue=function(d,f,c,g,e){d=b.Color.re_RGB.exec(b.Color.toRGB(d));f=b.Color.re_RGB.exec(b.Color.toRGB(f));if(!d||d.length<3||!f||f.length<3){b.error("invalid from or to passed to color behavior");}return"rgb("+[Math.floor(e(c,a(d[1]),a(f[1])-a(d[1]),g)),Math.floor(e(c,a(d[2]),a(f[2])-a(d[2]),g)),Math.floor(e(c,a(d[3]),a(f[3])-a(d[3]),g))].join(", ")+")";};b.Anim.behaviors.color={set:function(f,d,i,h,c,g,e){f._node.setStyle(d,b.Anim.getUpdatedColorValue(i,h,c,g,e));},get:function(d,c){var e=d._node.getComputedStyle(c);e=(e==="transparent")?"rgb(255, 255, 255)":e;return e;}};b.each(["backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"],function(c,d){b.Anim.behaviors[c]=b.Anim.behaviors.color;});},"@VERSION@",{requires:["anim-base"]});