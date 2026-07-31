/* =====================================================================
   render.js — bộ chuyển Markdown sang HTML, dùng chung cho blog và trang
   quản trị. Không phụ thuộc thư viện ngoài (mermaid chỉ nạp khi bài có
   biểu đồ).

   Hỗ trợ: tiêu đề, đoạn văn, đậm/nghiêng/gạch ngang, mã inline,
           khối mã ```lang, danh sách, trích dẫn, bảng, đường kẻ ngang,
           ẢNH có chú thích, VIDEO (YouTube / Vimeo / file mp4),
           BIỂU ĐỒ ```mermaid.
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

/* =====================================================================
   ẢNH / VIDEO / BIỂU ĐỒ
   ===================================================================== */

const RX_MEDIA_IMG = /^!\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+"([^"]*)")?\s*\)$/;
const RX_YOUTUBE   = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:\S*&)?v=|embed\/|live\/|shorts\/)|youtu\.be\/)([\w-]{6,})/i;
const RX_VIMEO     = /^(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/i;
const RX_VIDEOFILE = /\.(mp4|webm|ogv|ogg|mov)(?:[?#]|$)/i;

function figure(inner, caption){
  return '<figure>' + inner
    + (caption ? '<figcaption>' + inline(caption) + '</figcaption>' : '')
    + '</figure>';
}

function videoFile(url, caption){
  return figure('<video controls preload="metadata" playsinline src="' + esc(url) + '"></video>', caption);
}

function videoEmbed(src, label, caption){
  return figure('<div class="video"><iframe src="' + esc(src) + '" title="' + esc(label) + '" loading="lazy"'
    + ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"'
    + ' referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>', caption);
}

/* giây bắt đầu trong link YouTube: ?t=90 / ?t=1m30s / &start=90 */
function ytStart(url){
  const m = /[?&](?:t|start)=(\d+h)?(\d+m)?(\d+)?s?\b/i.exec(url);
  if(!m) return 0;
  return (parseInt(m[1]) || 0) * 3600 + (parseInt(m[2]) || 0) * 60 + (parseInt(m[3]) || 0);
}

/* Trả về HTML nếu cả dòng chỉ là một ảnh / video, ngược lại trả về '' */
function mediaBlock(raw){
  const s = raw.trim();

  const img = RX_MEDIA_IMG.exec(s);
  if(img){
    const alt = img[1], url = img[2], caption = img[3] || img[1];
    if(RX_VIDEOFILE.test(url)) return videoFile(url, caption);
    let m = RX_YOUTUBE.exec(url);
    if(m) return ytEmbed(m[1], url, caption);
    m = RX_VIMEO.exec(url);
    if(m) return videoEmbed('https://player.vimeo.com/video/' + m[1], 'Vimeo', caption);
    return figure('<img src="' + esc(url) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async">', caption);
  }

  /* một đường link đứng riêng một dòng */
  if(/^\S+$/.test(s)){
    let m = RX_YOUTUBE.exec(s);
    if(m) return ytEmbed(m[1], s, '');
    m = RX_VIMEO.exec(s);
    if(m) return videoEmbed('https://player.vimeo.com/video/' + m[1], 'Vimeo', '');
    if(/^https?:\/\/\S+$/.test(s) && RX_VIDEOFILE.test(s)) return videoFile(s, '');
  }
  return '';
}

function ytEmbed(id, url, caption){
  const t = ytStart(url);
  return videoEmbed('https://www.youtube-nocookie.com/embed/' + id + (t ? '?start=' + t : ''), 'YouTube', caption);
}

/* Biểu đồ: giữ nguyên bản gốc trong data-src để vẽ lại được khi đổi sáng/tối */
function diagramBlock(code){
  return '<figure class="dgm"><div class="mermaid" data-src="' + esc(code) + '">' + esc(code) + '</div></figure>';
}

/* =====================================================================
   MARKDOWN → HTML
   ===================================================================== */

function md(src){
  const L = String(src == null ? '' : src).replace(/\r\n/g, '\n').split('\n');
  let out = '', i = 0;

  const isBlockStart = l =>
    /^\s*```/.test(l) || /^#{1,6}\s/.test(l) || /^>\s?/.test(l) ||
    /^\s*[-*+]\s+/.test(l) || /^\s*\d+[.)]\s+/.test(l) ||
    /^(-{3,}|\*{3,}|_{3,})\s*$/.test(l) || RX_MEDIA_IMG.test(l.trim()) || !l.trim();

  while(i < L.length){
    const line = L[i];
    if(!line.trim()){ i++; continue; }

    /* khối mã — ```mermaid thì vẽ thành biểu đồ */
    if(/^\s*```/.test(line)){
      const lang = line.replace(/^\s*```/, '').trim();
      const buf = []; i++;
      while(i < L.length && !/^\s*```/.test(L[i])) buf.push(L[i++]);
      i++;
      out += /^(mermaid|bieu-do|biểu-đồ)$/i.test(lang)
        ? diagramBlock(buf.join('\n'))
        : codeBlock(buf.join('\n'), lang);
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

    /* ảnh / video đứng riêng một dòng */
    const media = mediaBlock(line);
    if(media){ out += media; i++; continue; }

    /* bảng */
    if(line.includes('|') && i + 1 < L.length
       && L[i+1].includes('|') && /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(L[i+1])){
      const cells = r => r.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map(c => c.trim());
      let t = '<div class="tw"><table><thead><tr>'
        + cells(line).map(c => '<th>' + inline(c) + '</th>').join('')
        + '</tr></thead><tbody>';
      i += 2;
      while(i < L.length && L[i].includes('|') && L[i].trim()){
        t += '<tr>' + cells(L[i]).map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>';
        i++;
      }
      out += t + '</tbody></table></div>';
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

/* ---------------------------- vẽ biểu đồ ----------------------------- */
/* mermaid nặng ~1MB nên chỉ nạp khi trong trang thực sự có biểu đồ. */

var _mermaid = null, _mermaidLoad = null, _mermaidQueue = Promise.resolve();

function mermaidTheme(){
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const v = dark
    ? { bg:'#16150f', surface:'#1f1e18', soft:'#2a2318', text:'#ece7dd', line:'#9c948a', accent:'#f0a952' }
    : { bg:'#fdfcfa', surface:'#ffffff', soft:'#fef3e2', text:'#1c1a17', line:'#6b6459', accent:'#b45309' };
  return {
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    fontFamily: 'Inter, -apple-system, sans-serif',
    themeVariables: {
      background: v.bg,
      primaryColor: v.soft, primaryTextColor: v.text, primaryBorderColor: v.accent,
      secondaryColor: v.surface, secondaryTextColor: v.text, secondaryBorderColor: v.line,
      tertiaryColor: v.surface, tertiaryTextColor: v.text, tertiaryBorderColor: v.line,
      lineColor: v.line, textColor: v.text,
      mainBkg: v.soft, nodeBorder: v.accent, clusterBkg: v.surface, clusterBorder: v.line,
      titleColor: v.text, edgeLabelBackground: v.bg,
      actorBkg: v.soft, actorBorder: v.accent, actorTextColor: v.text,
      signalColor: v.text, signalTextColor: v.text,
      labelBoxBkgColor: v.soft, labelBoxBorderColor: v.accent, labelTextColor: v.text,
      noteBkgColor: v.surface, noteBorderColor: v.line, noteTextColor: v.text,
      pie1: v.accent, pie2: v.line, pie3: v.soft, pieTitleTextColor: v.text,
      pieSectionTextColor: v.text, pieOuterStrokeWidth: '1px'
    }
  };
}

/* Hàm này bị gọi từ nhiều chỗ (mở bài, sự kiện load, đổi sáng/tối). Hai lượt vẽ
   chồng lên nhau sẽ làm mermaid ghi đè SVG của nhau — biểu đồ này lòi ra trong
   biểu đồ kia. Nên: đánh dấu node ngay lập tức để lượt gọi sau bỏ qua, và xếp
   các lượt vẽ vào một hàng đợi tuần tự. */
function renderMermaid(scope){
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  const nodes = Array.prototype.slice
    .call(document.querySelectorAll((scope || '') + ' .mermaid'))
    .filter(n => n.dataset.drawn !== theme);
  if(!nodes.length) return;

  /* đánh dấu đồng bộ, trước khi có bất kỳ await nào */
  nodes.forEach(n => {
    n.dataset.drawn = theme;
    if(n.dataset.src != null) n.textContent = n.dataset.src;   /* dựng lại mã nguồn */
    n.removeAttribute('data-processed');
    n.classList.remove('dgm-err');
    n.classList.add('dgm-wait');
  });
  const done = () => nodes.forEach(n => n.classList.remove('dgm-wait'));

  const draw = m => {
    try{ m.initialize(mermaidTheme()); }catch(e){}
    return m.run({ nodes: nodes }).then(done, done);
  };

  _mermaidLoad = _mermaidLoad || import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')
    .then(mod => (_mermaid = mod.default));

  _mermaidQueue = _mermaidQueue
    .then(() => _mermaidLoad)
    .then(draw)
    .catch(() => {
      done();
      nodes.forEach(n => { delete n.dataset.drawn; n.classList.add('dgm-err'); });
    });
}
