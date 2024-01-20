(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8069],{46601:function(){},89214:function(){},85568:function(){},69386:function(){},31616:function(){},29120:function(){},46586:function(){},71156:function(){},88924:function(){},55024:function(){},88798:function(e,t,a){"use strict";var s=a(57437),n=a(2265),o=a(49598),r=a(61465),l=a(14977),i=a(7532),c=a(41154),d=a(16691),u=a.n(d),f=a(49080),g=a(23611),m=a(6940),h=a(16049),x=a(94858),p=a(6691),v=a(88216);t.Z=()=>{let{provider:e,safeSDKKit:t,selectedSafe:a}=(0,f.useAuth)(),[d,y]=(0,n.useState)(),[b,A]=(0,n.useState)(),handleBorrow=async()=>{if(!d){v.toast.error("Please fill Amount");return}if(!b){v.toast.error("Select Token");return}if(e&&t){var s;null==e||e.getSigner();let n=new m.D(e,{POOL:x.h0}),o=d.toString(),r=n.borrowTxBuilder.generateTxData({user:a||"",reserve:b.contractAddress,amount:(0,p.parseUnits)(o,b.decimal).toString(),interestRateMode:h.tk.Variable});console.log("Borrow Tx",r);let l={to:r.to,value:(0,p.parseUnits)("0",18).toString(),data:r.data,safeTxGas:null===(s=r.gasLimit)||void 0===s?void 0:s.toString()},i=await t.createTransaction({safeTransactionData:l});console.log("safeTransaction",i);let c=await t.signTransaction(i);console.log("tx",c);let u=await t.executeTransaction(c);console.log("txResult",u),v.toast.success(u.hash),u?v.toast.success("Successfully repayed ✅"):v.toast.error("Repayment Failed ❌")}};return(0,s.jsxs)(o.Zb,{className:"flex flex-col flex-1",children:[(0,s.jsxs)(o.Ol,{children:[(0,s.jsx)(o.ll,{children:"Borrow Asset"}),(0,s.jsx)(o.SZ,{children:"Borrow asset based on supply"})]}),(0,s.jsx)(o.aY,{children:(0,s.jsx)("form",{children:(0,s.jsxs)("div",{className:"grid w-full items-center gap-4",children:[(0,s.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[(0,s.jsx)(r._,{className:"text-lg font-[600] tracking-tight",htmlFor:"amount",children:"Amount"}),(0,s.jsx)(l.I,{className:"text-lg font-[400] tracking-tight",id:"amount",placeholder:"Enter Amount",value:d,onChange:e=>{let t=e.target.value;y(t)}})]}),(0,s.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[(0,s.jsx)(r._,{className:"text-lg font-[600] tracking-tight",htmlFor:"token",children:"Token"}),(0,s.jsxs)(i.Ph,{onValueChange:e=>{let t=c.FF.find(t=>t.name===e);A(t)},children:[(0,s.jsx)(i.i4,{id:"token",children:(0,s.jsx)(i.ki,{className:"text-lg font-[400] tracking-tight",placeholder:"Select Token"})}),(0,s.jsx)(i.Bw,{position:"popper",children:c.FF.map(e=>(0,s.jsx)(i.Ql,{value:e.name,children:(0,s.jsxs)("div",{className:"flex flex-row gap-2 justify-center",children:[(0,s.jsx)(u(),{src:e.logo,alt:e.name,height:24,width:24}),(0,s.jsx)("div",{className:"text-xl scroll-m-20 font-[500] tracking-tight",children:e.name})]})},e.id))})]})]})]})})}),(0,s.jsx)(o.eW,{children:(0,s.jsx)(g.z,{onClick:handleBorrow,className:"",children:"Borrow Token from AAVEV3 POOL"})})]})}},80969:function(e,t,a){"use strict";var s=a(57437),n=a(2265),o=a(49598),r=a(61465),l=a(14977),i=a(7532),c=a(49080),d=a(41154),u=a(88216),f=a(6940),g=a(16049),m=a(43977),h=a(94858),x=a(16691),p=a.n(x),v=a(23611);t.Z=()=>{let{provider:e,safeSDKKit:t,selectedSafe:a}=(0,c.useAuth)(),[x,y]=(0,n.useState)(),[b,A]=(0,n.useState)(),handleRepay=async()=>{if(!x){u.toast.error("Please fill Amount");return}if(!b){u.toast.error("Select Token");return}if(e&&t){var s;let n=new f.D(e,{POOL:h.h0}),o=x.toString(),r=await n.repayTxBuilder.generateTxData({user:a||"",reserve:b.contractAddress,amount:(0,m.v)(o,b.decimal).toString(),onBehalfOf:a,interestRateMode:g.tk.Variable});console.log("repay",r);let l={to:r.to,value:(0,m.v)("0",18).toString(),data:r.data,safeTxGas:(null===(s=r.gasLimit)||void 0===s?void 0:s.toString())||"0"},i=await (null==t?void 0:t.createTransaction({safeTransactionData:l}));console.log("safeTransaction",i);let c=await (null==t?void 0:t.signTransaction(i));console.log("tx",c);let d=await (null==t?void 0:t.executeTransaction(c));console.log("txResult",d),d?u.toast.success("Successfully repayed ✅"):u.toast.error("Repayment Failed ❌")}};return(0,s.jsxs)(o.Zb,{className:"flex flex-col flex-1",children:[(0,s.jsxs)(o.Ol,{children:[(0,s.jsx)(o.ll,{children:"Repay Token"}),(0,s.jsx)(o.SZ,{children:"Form to Repay Amount"})]}),(0,s.jsx)(o.aY,{children:(0,s.jsx)("form",{children:(0,s.jsxs)("div",{className:"grid w-full items-center gap-4",children:[(0,s.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[(0,s.jsx)(r._,{className:"text-lg font-[600] tracking-tight",htmlFor:"amount",children:"Amount"}),(0,s.jsx)(l.I,{className:"text-lg font-[400] tracking-tight",id:"amount",placeholder:"Enter Amount",value:x,onChange:e=>{let t=e.target.value;y(t)}})]}),(0,s.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[(0,s.jsx)(r._,{className:"text-lg font-[600] tracking-tight",htmlFor:"token",children:"Token"}),(0,s.jsxs)(i.Ph,{onValueChange:e=>{let t=d.FF.find(t=>t.name===e);A(t)},children:[(0,s.jsx)(i.i4,{id:"token",children:(0,s.jsx)(i.ki,{className:"text-lg font-[400] tracking-tight",placeholder:"Select Token"})}),(0,s.jsx)(i.Bw,{position:"popper",children:d.FF.map(e=>(0,s.jsx)(i.Ql,{value:e.name,children:(0,s.jsxs)("div",{className:"flex flex-row gap-2 justify-center",children:[(0,s.jsx)(p(),{src:e.logo,alt:e.name,height:24,width:24}),(0,s.jsx)("div",{className:"text-xl scroll-m-20 font-[500] tracking-tight",children:e.name})]})},e.id))})]})]})]})})}),(0,s.jsx)(o.eW,{children:(0,s.jsx)(v.z,{onClick:handleRepay,className:"",children:"Repay Token"})})]})}},20331:function(e,t,a){"use strict";var s=a(57437),n=a(2265),o=a(49598),r=a(61465),l=a(14977),i=a(7532),c=a(23611),d=a(49080),u=a(6940),f=a(94858),g=a(43977),m=a(88216),h=a(41154),x=a(16691),p=a.n(x),v=a(28410);t.Z=()=>{let{provider:e,safeSDKKit:t,selectedSafe:a}=(0,d.useAuth)();console.log(t,a,"signer");let[x,y]=(0,n.useState)(),[b,A]=(0,n.useState)(),handleSupply=async()=>{if(console.log("Input in func",x,b),!x){m.toast.error("Please fill Amount");return}if(!b){m.toast.error("Select Token");return}if(e&&t){let n=null==e?void 0:e.getSigner();console.log("Signer",n);try{var s;let n=new u.D(e,{POOL:f.h0}),o=x.toString(),r=await n.supplyTxBuilder.generateTxData({user:a||"",reserve:b.contractAddress,amount:(0,g.v)(o,b.decimal).toString(),onBehalfOf:a});console.log("Supply",r);let l={to:r.to,value:(0,g.v)("0",18).toString(),data:r.data,safeTxGas:null===(s=r.gasLimit)||void 0===s?void 0:s.toString()};console.log("Safe transaction data",l);let i=await (null==t?void 0:t.createTransaction({safeTransactionData:l}));console.log("safeTransaction",i);let c=await (null==t?void 0:t.signTransaction(i));console.log("tx",c);let d=await (null==t?void 0:t.executeTransaction(c));console.log("txResult",d),d?m.toast.success("Successfully supplied"):m.toast.error("Transaction Failed")}catch(e){console.log("Error in supplying",e),m.toast.error("Cannot supply. Check console for more reason")}}},handleApprove=async()=>{if(!x){m.toast.error("Please fill Amount");return}if(b&&t){let a=null==e?void 0:e.getSigner(),s=b.contractAddress,n=new v.Contract(s,["function approve(address spender, uint256 amount)"],a),o=null==x?void 0:x.toString(),r=n.interface.encodeFunctionData("approve",[f.h0,(0,g.v)(o,b.decimal).toString()]),l={to:s,data:r,value:(0,g.v)("0",18).toString()},i=await t.createTransaction({safeTransactionData:l});console.log("safeTransaction",i);let c=await t.signTransaction(i);console.log("tx",c);let d=await t.executeTransaction(c);console.log("txResult",d),d&&m.toast.success("Approved Successfully")}};return(0,s.jsxs)(o.Zb,{className:"flex flex-col flex-1",children:[(0,s.jsxs)(o.Ol,{children:[(0,s.jsx)(o.ll,{children:"Supply Asset"}),(0,s.jsx)(o.SZ,{children:"Supply the asset that you want to add in the reserve"})]}),(0,s.jsx)(o.aY,{children:(0,s.jsx)("form",{children:(0,s.jsxs)("div",{className:"grid w-full items-center gap-4",children:[(0,s.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[(0,s.jsx)(r._,{className:"text-lg font-[600] tracking-tight",htmlFor:"amount",children:"Amount"}),(0,s.jsx)(l.I,{className:"text-lg font-[400] tracking-tight",id:"amount",placeholder:"Enter Amount",value:x,onChange:e=>{let t=e.target.value,a=parseFloat(t);console.log("Input",t,a),isNaN(a)?console.log("Please enter a valid number"):y(a)}})]}),(0,s.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[(0,s.jsx)(r._,{className:"text-lg font-[600] tracking-tight",htmlFor:"token",children:"Token"}),(0,s.jsxs)(i.Ph,{onValueChange:e=>{let t=h.rO.find(t=>t.name===e);console.log("Selected Token",t),A(t)},children:[(0,s.jsx)(i.i4,{id:"token",children:(0,s.jsx)(i.ki,{className:"text-lg font-[400] tracking-tight",placeholder:"Select Token"})}),(0,s.jsx)(i.Bw,{position:"popper",children:h.rO.map(e=>(0,s.jsx)(i.Ql,{value:e.name,children:(0,s.jsxs)("div",{className:"flex flex-row gap-2 justify-center",children:[(0,s.jsx)(p(),{src:e.logo,alt:e.name,height:24,width:24}),(0,s.jsx)("div",{className:"text-xl scroll-m-20 font-[500] tracking-tight",children:e.name})]})},e.id))})]})]})]})})}),(0,s.jsxs)(o.eW,{className:"flex flex-col gap-4",children:[b&&(0,s.jsxs)("button",{className:(0,c.d)({variant:"outline"}),onClick:handleApprove,children:["Approve ",b.name]}),b?(0,s.jsxs)("button",{className:(0,c.d)(),onClick:handleSupply,children:["Supply ",b.name]}):(0,s.jsx)(c.z,{variant:"outline",disabled:!0,className:"",children:"Supply Token from AAVEV3 Pool"})]})]})}},14977:function(e,t,a){"use strict";a.d(t,{I:function(){return r}});var s=a(57437),n=a(2265),o=a(81628);let r=n.forwardRef((e,t)=>{let{className:a,type:n,...r}=e;return(0,s.jsx)("input",{type:n,className:(0,o.cn)("flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",a),ref:t,...r})});r.displayName="Input"},23611:function(e,t,a){"use strict";a.d(t,{d:function(){return i},z:function(){return c}});var s=a(57437),n=a(2265),o=a(67256),r=a(39213),l=a(81628);let i=(0,r.j)("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"underline-offset-4 hover:underline text-primary"},size:{default:"h-10 py-2 px-4",sm:"h-9 px-3 rounded-md",lg:"h-11 px-8 rounded-md",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),c=n.forwardRef((e,t)=>{let{className:a,variant:n,size:r,asChild:c=!1,...d}=e,u=c?o.g7:"button";return(0,s.jsx)(u,{className:(0,l.cn)(i({variant:n,size:r,className:a})),ref:t,...d})});c.displayName="Button"},49598:function(e,t,a){"use strict";a.d(t,{Ol:function(){return l},SZ:function(){return c},Zb:function(){return r},aY:function(){return d},eW:function(){return u},ll:function(){return i}});var s=a(57437),n=a(2265),o=a(81628);let r=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,s.jsx)("div",{ref:t,className:(0,o.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",a),...n})});r.displayName="Card";let l=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,s.jsx)("div",{ref:t,className:(0,o.cn)("flex flex-col space-y-1.5 p-6",a),...n})});l.displayName="CardHeader";let i=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,s.jsx)("h3",{ref:t,className:(0,o.cn)("text-2xl font-semibold leading-none tracking-tight",a),...n})});i.displayName="CardTitle";let c=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,s.jsx)("p",{ref:t,className:(0,o.cn)("text-sm text-muted-foreground",a),...n})});c.displayName="CardDescription";let d=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,s.jsx)("div",{ref:t,className:(0,o.cn)("p-6 pt-0",a),...n})});d.displayName="CardContent";let u=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,s.jsx)("div",{ref:t,className:(0,o.cn)("flex items-center p-6 pt-0",a),...n})});u.displayName="CardFooter"},61465:function(e,t,a){"use strict";a.d(t,{_:function(){return c}});var s=a(57437),n=a(2265),o=a(36743),r=a(39213),l=a(81628);let i=(0,r.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,s.jsx)(o.f,{ref:t,className:(0,l.cn)(i(),a),...n})});c.displayName=o.f.displayName},7532:function(e,t,a){"use strict";a.d(t,{Bw:function(){return h},Ph:function(){return d},Ql:function(){return p},i4:function(){return f},ki:function(){return u}});var s=a(57437),n=a(2265),o=a(20337),r=a(83523),l=a(9224),i=a(62442),c=a(81628);let d=o.fC;o.ZA;let u=o.B4,f=n.forwardRef((e,t)=>{let{className:a,children:n,...l}=e;return(0,s.jsxs)(o.xz,{ref:t,className:(0,c.cn)("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",a),...l,children:[n,(0,s.jsx)(o.JO,{asChild:!0,children:(0,s.jsx)(r.Z,{className:"h-4 w-4 opacity-50"})})]})});f.displayName=o.xz.displayName;let g=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,s.jsx)(o.u_,{ref:t,className:(0,c.cn)("flex cursor-default items-center justify-center py-1",a),...n,children:(0,s.jsx)(l.Z,{className:"h-4 w-4"})})});g.displayName=o.u_.displayName;let m=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,s.jsx)(o.$G,{ref:t,className:(0,c.cn)("flex cursor-default items-center justify-center py-1",a),...n,children:(0,s.jsx)(r.Z,{className:"h-4 w-4"})})});m.displayName=o.$G.displayName;let h=n.forwardRef((e,t)=>{let{className:a,children:n,position:r="popper",...l}=e;return(0,s.jsx)(o.h_,{children:(0,s.jsxs)(o.VY,{ref:t,className:(0,c.cn)("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2","popper"===r&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",a),position:r,...l,children:[(0,s.jsx)(g,{}),(0,s.jsx)(o.l_,{className:(0,c.cn)("p-1","popper"===r&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:n}),(0,s.jsx)(m,{})]})})});h.displayName=o.VY.displayName;let x=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,s.jsx)(o.__,{ref:t,className:(0,c.cn)("py-1.5 pl-8 pr-2 text-sm font-semibold",a),...n})});x.displayName=o.__.displayName;let p=n.forwardRef((e,t)=>{let{className:a,children:n,...r}=e;return(0,s.jsxs)(o.ck,{ref:t,className:(0,c.cn)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a),...r,children:[(0,s.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,s.jsx)(o.wU,{children:(0,s.jsx)(i.Z,{className:"h-4 w-4"})})}),(0,s.jsx)(o.eT,{children:n})]})});p.displayName=o.ck.displayName;let v=n.forwardRef((e,t)=>{let{className:a,...n}=e;return(0,s.jsx)(o.Z0,{ref:t,className:(0,c.cn)("-mx-1 my-1 h-px bg-muted",a),...n})});v.displayName=o.Z0.displayName},41154:function(e,t,a){"use strict";a.d(t,{FF:function(){return n},rO:function(){return s},zd:function(){return o}});let s=[{id:"1",logo:"https://gho.aave.com/icons/tokens/eth.svg",name:"ETH",contractAddress:"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",decimal:18},{id:"2",logo:"https://gho.aave.com/icons/tokens/dai.svg",name:"DAI",contractAddress:"0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",decimal:18},{id:"3",logo:"https://gho.aave.com/icons/tokens/aave.svg",name:"AAVE",contractAddress:"0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",decimal:18},{id:"4",logo:"https://gho.aave.com/icons/tokens/usdc.svg",name:"USDC",contractAddress:"0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",decimal:6},{id:"5",logo:"https://gho.aave.com/icons/tokens/usdt.svg",name:"USDT",contractAddress:"0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",decimal:6},{id:"6",logo:"https://gho.aave.com/icons/tokens/weth.svg",name:"WETH",contractAddress:"0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",decimal:18},{id:"7",logo:"https://gho.aave.com/icons/tokens/link.svg",name:"LINK",contractAddress:"0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5",decimal:18},{id:"8",logo:"https://gho.aave.com/icons/tokens/eurs.svg",name:"EURs",contractAddress:"0x6d906e526a4e2ca02097ba9d0caa3c382f52278e",decimal:2}],n=[{id:"1",logo:"https://gho.aave.com/icons/tokens/gho.svg",name:"GHO",contractAddress:"0xc4bF5CbDaBE595361438F8c6a187bDc330539c60 ",decimal:18},{id:"2",logo:"https://gho.aave.com/icons/tokens/dai.svg",name:"DAI",contractAddress:"0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",decimal:18},{id:"3",logo:"https://gho.aave.com/icons/tokens/usdc.svg",name:"USDC",contractAddress:"0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",decimal:6},{id:"4",logo:"https://gho.aave.com/icons/tokens/usdt.svg",name:"USDT",contractAddress:"0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",decimal:6},{id:"5",logo:"https://gho.aave.com/icons/tokens/link.svg",name:"LINK",contractAddress:"0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5",decimal:18},{id:"6",logo:"https://gho.aave.com/icons/tokens/wbtc.svg",name:"WBTC",contractAddress:"0x29f2D40B0605204364af54EC677bD022dA425d03",decimal:8},{id:"7",logo:"https://gho.aave.com/icons/tokens/weth.svg",name:"WETH",contractAddress:"0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",decimal:18},{id:"8",logo:"https://gho.aave.com/icons/tokens/eurs.svg",name:"EURs",contractAddress:"0x6d906e526a4e2ca02097ba9d0caa3c382f52278e",decimal:2}],o=[{id:"1",logo:"https://gho.aave.com/icons/tokens/gho.svg",name:"GHO",contractAddress:"0xc4bF5CbDaBE595361438F8c6a187bDc330539c60 ",decimal:18},{id:"2",logo:"https://gho.aave.com/icons/tokens/dai.svg",name:"DAI",contractAddress:"0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",decimal:18},{id:"3",logo:"https://gho.aave.com/icons/tokens/usdc.svg",name:"USDC",contractAddress:"0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",decimal:6},{id:"4",logo:"https://gho.aave.com/icons/tokens/usdt.svg",name:"USDT",contractAddress:"0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",decimal:6},{id:"5",logo:"https://gho.aave.com/icons/tokens/link.svg",name:"LINK",contractAddress:"0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5",decimal:18},{id:"6",logo:"https://gho.aave.com/icons/tokens/wbtc.svg",name:"WBTC",contractAddress:"0x29f2D40B0605204364af54EC677bD022dA425d03",decimal:8},{id:"7",logo:"https://gho.aave.com/icons/tokens/weth.svg",name:"WETH",contractAddress:"0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",decimal:18},{id:"8",logo:"https://gho.aave.com/icons/tokens/aave.svg",name:"AAVE",contractAddress:"0x88541670e55cc00beefd87eb59edd1b7c511ac9a",decimal:18},{id:"9",logo:"https://gho.aave.com/icons/tokens/eurs.svg",name:"EURs",contractAddress:"0x6d906e526a4e2ca02097ba9d0caa3c382f52278e",decimal:2}]},49080:function(e,t,a){"use strict";a.r(t),a.d(t,{AuthContext:function(){return u},AuthContextProvider:function(){return AuthContextProvider},useAuth:function(){return useAuth}});var s=a(57437),n=a(2265),o=a(62406),r=a(31040),l=a.n(r),i=a(56955),c=a(19258),d=a(88216);let u=(0,n.createContext)({isLoggedIn:!1,selectedSafe:"",provider:null}),AuthContextProvider=e=>{let{children:t}=e,[a,f]=(0,n.useState)(),[g,m]=(0,n.useState)(!!(null==a?void 0:a.isAuthenticated)),[h,x]=(0,n.useState)(),[p,v]=(0,n.useState)(),[y,b]=(0,n.useState)(""),[A,j]=(0,n.useState)(),[w,N]=(0,n.useState)(!1);(0,n.useEffect)(()=>{(async()=>{N(!0);let e=new o.SafeAuthPack;await e.init({enableLogging:!1,buttonPosition:"bottom-right",showWidgetButton:!0,chainConfig:{chainId:"0xaa36a7",rpcTarget:"https://eth-sepolia.g.alchemy.com/v2/DU0xK0nck0Bt7hWgodif5n_UctwzaX5R"}}),f(e),e.subscribe("accountsChanged",async t=>{if(console.log("Accounts changed",t),t.length>0){let t=await (null==e?void 0:e.signIn());x(t),m(!0),t.safes&&t.safes.length>0&&b(null==t?void 0:t.safes[0])}}),N(!1)})()},[]),(0,n.useEffect)(()=>{a&&g&&v(new i.Q(a.getProvider()))},[g]),(0,n.useEffect)(()=>{(async()=>{if(!p||!y)return;let e=await p.getSigner(),t=new r.EthersAdapter({ethers:c,signerOrProvider:e}),a=await l().create({ethAdapter:t,safeAddress:y,isL1SafeSingleton:!0});j(a)})()},[p,y]);let logIn=async()=>{if(!a)return;let e=await a.signIn();x(e),m(!0),(null==e?void 0:e.safes)&&e.safes.length>0&&b(null==e?void 0:e.safes[0])},logOut=async()=>{a&&(await a.signOut(),v(void 0),x(void 0),m(!1))},deployNewSafeWallet=async()=>{if(!a||!p)return;let e=await p.getSigner(),t=new r.EthersAdapter({ethers:c,signerOrProvider:e}),s=await r.SafeFactory.create({ethAdapter:t}),n=await s.deploySafe({safeAccountConfig:{threshold:1,owners:[null==h?void 0:h.eoa]}}),o=await n.getAddress();o&&(b(o),d.toast.success("Safe Deployed!"))};return(0,s.jsx)(u.Provider,{value:{isLoggedIn:g,provider:p||null,data:h,logIn,logOut,selectedSafe:y,setSelectedSafe:b,deployNewSafeWallet,isSafeLoading:w,safeSDKKit:A,safeAuthPack:a},children:t})},useAuth=()=>{let e=n.useContext(u);if(void 0===e)throw Error("useAuth must be used within a AuthContextProvider");return e}},81628:function(e,t,a){"use strict";a.d(t,{cn:function(){return cn}});var s=a(50348),n=a(23986);function cn(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,n.m)((0,s.clsx)(t))}}}]);