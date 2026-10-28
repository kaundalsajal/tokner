window.addEventListener("wheel",(e)=>{
  const start = performance.now();
  while (performance.now() - start < 100) {
    Math.sqrt(Math.random());
  }
},{passive:true})