(()=>{
 const base=new URL('.',document.currentScript.src);window.portfolioMediaURL=path=>new URL(path,base).href;
 const preview=document.getElementById('photo-preview');const photo=document.getElementById('preview-image');const caption=document.getElementById('preview-caption');let index=0,project='data';
 function showPhoto(i){const list=window.portfolioMedia[project].photos;index=(i+list.length)%list.length;const selected=list[index];photo.src=window.portfolioMediaURL(selected.src);photo.alt=selected.alt;caption.textContent=`${index+1} / ${list.length} — ${selected.caption}`;document.getElementById('preview-original').href=photo.src;document.getElementById('preview-status').textContent='';}
 document.querySelectorAll('[data-photo-preview]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();project=a.dataset.photoProject||'data';showPhoto(Number(a.dataset.photoPreview));preview.showModal()}));
 document.getElementById('preview-close').addEventListener('click',()=>preview.close());
 document.getElementById('preview-prev').addEventListener('click',()=>showPhoto(index-1));document.getElementById('preview-next').addEventListener('click',()=>showPhoto(index+1));
 preview.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();project=a.dataset.photoProject||'data';showPhoto(index-1)}if(e.key==='ArrowRight'){e.preventDefault();project=a.dataset.photoProject||'data';showPhoto(index+1)}});
 preview.addEventListener('click',e=>{if(e.target===preview){const r=preview.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)preview.close()}});
 photo.addEventListener('error',()=>document.getElementById('preview-status').textContent='This image could not load. Try the original image link below.');
})();
