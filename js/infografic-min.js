Raphael.fn.pieChart=function(d,e,a,c,b,r,N,w,x,O,y,s,z,A,B){for(var k=this,f=Math.PI/180,t=this.set(),m=0,u=0,g=0,n=r.length;g<n;g++)u+=r[g];for(var P=function(b){var g=360*r[b]/u,n=m+g/2,p,h=m,j=m+g,q={fill:"90-"+x[b]+"-"+x[b],stroke:B,"stroke-width":0},s=w[b]?w[b]:"",C=d+a*Math.cos(-h*f),D=e+a*Math.sin(-h*f),E=d+a*Math.cos(-j*f),F=e+a*Math.sin(-j*f),G=d+(a-c)*Math.cos(-h*f),H=e+(a-c)*Math.sin(-h*f),I=d+(a-c)*Math.cos(-j*f),J=e+(a-c)*Math.sin(-j*f);k.path(["M",d,e,"M",G,H,"A",a-c,a-c,0,+(180<j-h), 0,I,J,"L",E,F,"A",a,a,0,+(180<j-h),1,C,D,"z"]).attr(q).toBack();for(var K=q=0,L,M,l=100*h/360;l<100*j/360;l++)q=d+a*Math.cos(-3.6*l*f),K=e+a*Math.sin(-3.6*l*f),L=d+(a-c)*Math.cos(-3.6*l*f),M=e+(a-c)*Math.sin(-3.6*l*f),k.path(["M",d,e,"M",L,M,"L",q,K,"z"]).attr({stroke:O});var v;$.browser.msie&&9>$.browser.version?v=0:v=1;p=k.path(["M",d,e,"M",G,H,"A",a-c,a-c,0,+(180<j-h),0,I,J,"L",E,F,"A",a,a,0,+(180<j-h),1,C,D,"z"]).attr({fill:"rgba(255,255,255,0)",opacity:v,stroke:B,"stroke-opacity":0,"stroke-width":1, title:s});b=k.text(d+(a+y)*Math.cos(-n*f),e+(a+y-10)*Math.sin(-n*f),N[b]).attr({fill:z,stroke:"none",opacity:1,"font-size":A});b.mouseover(function(){p.stop().animate({"stroke-opacity":1},300,"linear")}).mouseout(function(){p.stop().animate({"stroke-opacity":0},300,"linear")});m+=g;t.push(p);t.push(b)},g=0;g<n;g++)P(g);b&&k.path(["M",d,e,"M",d+(a-c-b.indent),e,"A",a-c-b.indent,a-c-b.indent,0,0,0,d-(a-c-b.indent),e,"L",d-(a-c-b.width-b.indent),e,"A",a-c-b.width-b.indent,a-c-b.width-b.indent,0,0,1, d+(a-c-b.width-b.indent),e,"M",d+(a-c-b.indent),e,"A",a-c-b.indent,a-c-b.indent,0,0,1,d-(a-c-b.indent),e,"L",d-(a-c-b.width-b.indent),e,"A",a-c-b.width-b.indent,a-c-b.width-b.indent,0,0,0,d+(a-c-b.width-b.indent),e,"z"]).attr({fill:b.color,"stroke-width":0,opacity:b.opacity});k.text(d,e,s).attr({"font-size":A,fill:z});return t}; (function(d){d.fn.infografic=function(e){var a={width:200,height:200,left:100,top:100,radius:57,thickness:15,innerGlow:{width:3,indent:1,color:"#fff",opacity:0.2},values:[20,15,25,5,20,15],labels:"10-15 15-20 20-25 25-30 30-40 40+".split(" "),titles:[],colors:"#90d477 #93e490 #71d2a7 #9ef4f5 #95993D #93e490".split(" "),separatorcolor:"#5dc499",labelsDistance:25,innerText:"inner\ntext",txtcolor:"#124F25",txtsize:11,stroke:""};this.each(function(){e&&d.extend(a,e);Raphael(this,a.width,a.height).pieChart(a.left, a.top,a.radius,a.thickness,a.innerGlow,a.values,a.labels,a.titles,a.colors,a.separatorcolor,a.labelsDistance,a.innerText,a.txtcolor,a.txtsize,a.stroke)})}})(jQuery);