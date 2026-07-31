/* =====================================================================
   render.js — bộ chuyển Markdown sang HTML, dùng chung cho blog và trang
   quản trị. Không phụ thuộc thư viện ngoài.

   Hỗ trợ: tiêu đề, đoạn văn, đậm/nghiêng/gạch ngang, mã inline,
           khối mã ```lang, danh sách, trích dẫn, bảng, ảnh, liên kết,
           đường kẻ ngang.
   ===================================================================== */

function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function slugify(s){
  return String(s).toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\u0111/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
    .replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function inline(t){
  const codes = [];
  let s = esc(t).replace(/`([^`]+)`/g, (_, c) => {
    codes.push(c);
    return '\uE000' + (codes.length - 1) + '\uE001';
  });
  s = s
    .replace(/!\[([^\]]*)\]\(([^)\s]+)[^)]*\)/g, '<img src="$2" alt="$1" loading="lazy">')
    .replace(/\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g, (m, txt, url) => {
      const ext = /^https?:\/\//.test(url) ? ' target="_blank" rel="noopener noreferrer"' : '';
      return '<a href="' + url + '"' + ext + '>' + txt + '</a>';
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^\w*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>');
  return s.replace(/\uE000(\d+)\uE001/g, (_, i) => '<code>' + codes[+i] + '</code>');
}

var cbSeq = 0;
function codeBlock(code, lang){
  const id = 'cb' + (cbSeq++);
  const cls = lang ? ' class="language-' + esc(lang) + '"' : '';
  return '<div class="cb"><div class="cb-head">'
    + '<span class="cb-lang">' + esc(lang || 'text') + '</span>'
    + '<button class="cb-copy" onclick="copyCode(\'' + id + '\')">Copy</button>'
    + '</div><pre><code id="' + id + '"' + cls + '>' + esc(code) + '</code></pre></div>';
}

function md(src){
  const L = String(src == null ? '' : src).replace(/\r\n/g, '\n').split('\n');
  let out = '', i = 0;

  const isBlockStart = l =>
    /^\s*```/.test(l) || /^#{1,6}\s/.test(l) || /^>\s?/.test(l) ||
    /^\s*[-*+]\s+/.test(l) || /^\s*\d+[.)]\s+/.test(l) ||
    /^(-{3,}|\*{3,}|_{3,})\s*$/.test(l) || !l.trim();

  while(i < L.length){
    const line = L[i];
    if(!line.trim()){ i++; continue; }

    /* khối mã */
    if(/^\s*```/.test(line)){
      const lang = line.replace(/^\s*```/, '').trim();
      const buf = []; i++;
      while(i < L.length && !/^\s*```/.test(L[i])) buf.push(L[i++]);
      i++;
      out += codeBlock(buf.join('\n'), lang);
      continue;
    }

    /* đường kẻ ngang */
    if(/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)){ out += '<hr>'; i++; continue; }

    /* tiêu đề */
    const h = /^(#{1,6})\s+(.+)$/.exec(line);
    if(h){
      /* ## là mức cao nhất trong bài (h1 đã dành cho tiêu đề bài viết) */
      const lv = Math.min(Math.max(h[1].length, 2), 6);
      const txt = h[2].replace(/\s*#+\s*$/, '');
      out += '<h' + lv + ' id="' + slugify(txt) + '">' + inline(txt) + '</h' + lv + '>';
      i++; continue;
    }

    /* bảng */
    if(line.includes('|') && i + 1 < L.length
       && L[i+1].includes('|') && /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(L[i+1])){
      const cells = r => r.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map(c => c.trim());
      let t = '<table><thead><tr>'
        + cells(line).map(c => '<th>' + inline(c) + '</th>').join('')
        + '</tr></thead><tbody>';
      i += 2;
      while(i < L.length && L[i].includes('|') && L[i].trim()){
        t += '<tr>' + cells(L[i]).map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>';
        i++;
      }
      out += t + '</tbody></table>';
      continue;
    }

    /* trích dẫn */
    if(/^>\s?/.test(line)){
      const buf = [];
      while(i < L.length && /^>\s?/.test(L[i])) buf.push(L[i++].replace(/^>\s?/, ''));
      out += '<blockquote>' + md(buf.join('\n')) + '</blockquote>';
      continue;
    }

    /* danh sách không đánh số */
    if(/^\s*[-*+]\s+/.test(line)){
      let t = '<ul>';
      while(i < L.length && /^\s*[-*+]\s+/.test(L[i])){
        let item = L[i++].replace(/^\s*[-*+]\s+/, '');
        while(i < L.length && L[i].trim() && !isBlockStart(L[i])) item += ' ' + L[i++].trim();
        t += '<li>' + inline(item) + '</li>';
      }
      out += t + '</ul>';
      continue;
    }

    /* danh sách đánh số */
    if(/^\s*\d+[.)]\s+/.test(line)){
      let t = '<ol>';
      while(i < L.length && /^\s*\d+[.)]\s+/.test(L[i])){
        let item = L[i++].replace(/^\s*\d+[.)]\s+/, '');
        while(i < L.length && L[i].trim() && !isBlockStart(L[i])) item += ' ' + L[i++].trim();
        t += '<li>' + inline(item) + '</li>';
      }
      out += t + '</ol>';
      continue;
    }

    /* đoạn văn */
    const buf = [];
    while(i < L.length && L[i].trim() && !isBlockStart(L[i])) buf.push(L[i++]);
    if(buf.length) out += '<p>' + inline(buf.join(' ')) + '</p>';
    else i++;
  }
  return out;
}

/* --------------------------- tiện ích chung --------------------------- */

function toast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove('show'), 1900);
}

function copyCode(id){
  const el = document.getElementById(id);
  if(!el) return;
  navigator.clipboard.writeText(el.innerText)
    .then(() => toast('Đã copy đoạn mã'), () => toast('Trình duyệt không cho copy'));
}

function highlightAll(scope){
  if(!window.hljs) return;
  document.querySelectorAll((scope || '') + ' pre code').forEach(el => {
    try{ delete el.dataset.highlighted; window.hljs.highlightElement(el); }catch(e){}
  });
}
