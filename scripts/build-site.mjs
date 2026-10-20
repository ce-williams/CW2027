import {mkdir,copyFile,rm,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
// Publish only public page assets; source copies, provenance and databases stay out.
const out=resolve('_site');await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
if(process.env.PORTFOLIO_REDIRECT==='true'){await copyFile('scripts/redirect.html',resolve(out,'index.html'));console.log('Packaged redirect to https://ce-williams.github.io/');process.exit(0);}
const projects=JSON.parse(await readFile('data/projects.json'));
const paths=['index.html','assets/portfolio.css','assets/project-gallery.css','assets/project-gallery.js','assets/favicon.svg','assets/curtis-williams.webp','assets/curtis-williams-cv.pdf'];
for(const p of projects)for(const s of p.screenshots)paths.push(`assets/projects/${p.slug}/${s.id}.webp`,`assets/projects/${p.slug}/${s.id}-720.webp`);
for(const path of paths){const target=resolve(out,path);await mkdir(resolve(target,'..'),{recursive:true});await copyFile(path,target);}
console.log(`Packaged ${paths.length} public files in _site/`);
