(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2049,4654],{19934:function(e,t,n){var s={"./af-ZA.js":[26696,6696],"./ar-SA.js":[55063,5063],"./ca-ES.js":[75287,5287],"./cs-CZ.js":[68954,8954],"./da-DK.js":[51926,1926],"./de-DE.js":[12159,9054],"./el-GR.js":[1123,1123],"./en-US.js":[13836,3836],"./es-ES.js":[72900,2900],"./fi-FI.js":[36128,6128],"./fr-FR.js":[87436,7436],"./he-IL.js":[19134,9134],"./hu-HU.js":[90852,852],"./id-ID.js":[66651,6651],"./it-IT.js":[95721,5721],"./ja-JP.js":[57324,7324],"./ko-KR.js":[28550,8550],"./nl-NL.js":[60664,664],"./no-NO.js":[50828,828],"./pl-PL.js":[20885,885],"./pt-BR.js":[86779,6779],"./pt-PT.js":[91676,1676],"./ro-RO.js":[1616,1616],"./ru-RU.js":[69603,9603],"./sr-SP.js":[51269,1269],"./sv-SE.js":[86046,6046],"./sw-TZ.js":[36546,6546],"./tr-TR.js":[61747,1747],"./uk-UA.js":[80853,853],"./vi-VN.js":[48260,8260],"./zh-CN.js":[23138,3138],"./zh-TW.js":[26121,6121]};function webpackAsyncContext(e){if(!n.o(s,e))return Promise.resolve().then(function(){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t});var t=s[e],o=t[0];return n.e(t[1]).then(function(){return n(o)})}webpackAsyncContext.keys=function(){return Object.keys(s)},webpackAsyncContext.id=19934,e.exports=webpackAsyncContext},35883:function(){},46601:function(){},89214:function(){},85568:function(){},69386:function(){},31616:function(){},29120:function(){},46586:function(){},24654:function(){},71156:function(){},88924:function(){},55024:function(){},5084:function(e,t,n){Promise.resolve().then(n.bind(n,83477))},83477:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return page}});var s=n(57437);n(2265);var o=n(31952);n(60602);var a=n(49080);let r=[{name:"Dai Stablecoin",address:"0x6B175474E89094C44Da98b954EedeAC495271d0F",symbol:"DAI",decimals:18,chainId:5,logoURI:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"},{name:"Gho Token",address:"0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211",symbol:"GHO",decimals:18,chainId:5,logoURI:"https://gho.aave.com/icons/tokens/gho.svg"},{name:"Monerium EURe",address:"0x83B844180f66Bbc3BE2E97C6179035AF91c4Cce8",symbol:"EURe",decimals:18,chainId:5,logoURI:"https://sandbox.monerium.dev/assets/93be542f.svg"}];var i=n(6435),page=()=>{let{setTheme:e,theme:t}=(0,i.F)(),{provider:n}=(0,a.useAuth)();return(0,s.jsx)("div",{className:"flex flex-col justify-center items-center mt-20",children:(0,s.jsx)(o.oO,{width:500,provider:n,tokenList:r,defaultOutputTokenAddress:"0x83B844180f66Bbc3BE2E97C6179035AF91c4Cce8",theme:"dark"===t?o.$_:o.Wb})})}},49080:function(e,t,n){"use strict";n.r(t),n.d(t,{AuthContext:function(){return d},AuthContextProvider:function(){return AuthContextProvider},useAuth:function(){return useAuth}});var s=n(57437),o=n(2265),a=n(62406),r=n(31040),i=n.n(r),u=n(56955),c=n(19258),l=n(88216);let d=(0,o.createContext)({isLoggedIn:!1,selectedSafe:"",provider:null}),AuthContextProvider=e=>{let{children:t}=e,[n,f]=(0,o.useState)(),[h,g]=(0,o.useState)(!!(null==n?void 0:n.isAuthenticated)),[v,j]=(0,o.useState)(),[A,w]=(0,o.useState)(),[p,b]=(0,o.useState)(""),[m,C]=(0,o.useState)(),[E,x]=(0,o.useState)(!1);(0,o.useEffect)(()=>{(async()=>{x(!0);let e=new a.SafeAuthPack;await e.init({enableLogging:!1,buttonPosition:"bottom-right",showWidgetButton:!0,chainConfig:{chainId:"0xaa36a7",rpcTarget:"https://eth-sepolia.g.alchemy.com/v2/DU0xK0nck0Bt7hWgodif5n_UctwzaX5R"}}),f(e),e.subscribe("accountsChanged",async t=>{if(console.log("Accounts changed",t),t.length>0){let t=await (null==e?void 0:e.signIn());j(t),g(!0),t.safes&&t.safes.length>0&&b(null==t?void 0:t.safes[0])}}),x(!1)})()},[]),(0,o.useEffect)(()=>{n&&h&&w(new u.Q(n.getProvider()))},[h]),(0,o.useEffect)(()=>{(async()=>{if(!A||!p)return;let e=await A.getSigner(),t=new r.EthersAdapter({ethers:c,signerOrProvider:e}),n=await i().create({ethAdapter:t,safeAddress:p,isL1SafeSingleton:!0});C(n)})()},[A,p]);let logIn=async()=>{if(!n)return;let e=await n.signIn();j(e),g(!0),(null==e?void 0:e.safes)&&e.safes.length>0&&b(null==e?void 0:e.safes[0])},logOut=async()=>{n&&(await n.signOut(),w(void 0),j(void 0),g(!1))},deployNewSafeWallet=async()=>{if(!n||!A)return;let e=await A.getSigner(),t=new r.EthersAdapter({ethers:c,signerOrProvider:e}),s=await r.SafeFactory.create({ethAdapter:t}),o=await s.deploySafe({safeAccountConfig:{threshold:1,owners:[null==v?void 0:v.eoa]}}),a=await o.getAddress();a&&(b(a),l.toast.success("Safe Deployed!"))};return(0,s.jsx)(d.Provider,{value:{isLoggedIn:h,provider:A||null,data:v,logIn,logOut,selectedSafe:p,setSelectedSafe:b,deployNewSafeWallet,isSafeLoading:E,safeSDKKit:m,safeAuthPack:n},children:t})},useAuth=()=>{let e=o.useContext(d);if(void 0===e)throw Error("useAuth must be used within a AuthContextProvider");return e}}},function(e){e.O(0,[1866,3808,408,8922,8515,9780,7264,4591,3909,6548,3231,2971,2472,1744],function(){return e(e.s=5084)}),_N_E=e.O()}]);