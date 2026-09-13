(() => {
  'use strict';

  const LANGUAGE_KEY = 'changsha-historic-trail-language';
  const CACHE_KEY = 'changsha-historic-trail-ja-cache-v1';
  const API_URL = '/api/translate-ja';
  const MAX_BATCH = 40;

  // 这部分是离线可用的核心界面词典。即使 /api/translate-ja 暂时不可用，
  // 页面最重要的导航、按钮、状态和身份信息仍能显示日语。
  const CORE = {
    '首页总览': 'ホーム概要',
    'GIS 数据接入': 'GISデータ連携',
    '智能地图': 'スマートマップ',
    '智能地图页': 'スマートマップ',
    'AI 对话': 'AI対話',
    'AI 对话页': 'AI対話',
    '路线生成': 'ルート生成',
    '关系云图': '関係クラウド',
    '历史文脉识别': '歴史文脈分析',
    '场景化体验': 'シーン体験',
    '规划诊断': '計画診断',
    '地图修改迭代': '地図編集・反復',
    '运营活化': '運営活性化',
    '城市共建': 'まちづくり共創',
    '游客': '観光客',
    '居民': '住民',
    '学生研学': '学生・フィールド学習',
    '老年人': '高齢者',
    '商户': '事業者',
    '规划师': 'プランナー',
    '管理者': '管理者',
    '用户身份': '利用者区分',
    '当前身份：': '現在の利用者：',
    '角色切换': '役割切替',
    '不同角色会改变回答重点': '役割によって回答の重点が変わります',
    '智能问答': 'AI Q&A',
    '城市文化空间 AI 智能体': '都市文化空間 AI エージェント',
    '长沙历史步道': '長沙歴史トレイル',
    '长沙市历史步道规划 AI 智能体': '長沙歴史トレイル計画 AI エージェント',
    '返回地图': '地図に戻る',
    '打开地图': '地図を開く',
    '查看适老路线': '高齢者向けルートを見る',
    '生成研学路线': 'フィールド学習ルートを生成',
    '推荐游览路线': '観光ルートを提案',
    '打开商户工具台': '事業者ツールを開く',
    '导出当前路线': '現在のルートを出力',
    'AI 识别': 'AI分析',
    'AI 分析面板': 'AI分析パネル',
    'AI 尚未运行识别。点击识别后，系统将基于路线、节点、图层和公众反馈生成空间结构摘要。': 'AI分析はまだ実行されていません。「AI分析」をクリックすると、ルート、拠点、レイヤー、住民・利用者のフィードバックに基づいて空間構造の要約を生成します。',
    '服务已就绪，可结合当前地图、路线、节点和公众反馈进行分析。': 'サービスの準備が完了しています。現在の地図、ルート、拠点、フィードバックを組み合わせて分析できます。',
    '可围绕历史节点、主题路线、空间问题和规划策略进行连续提问。': '歴史拠点、テーマルート、空間課題、計画戦略について続けて質問できます。',
    '历史步道图层': '歴史トレイルレイヤー',
    '历史文化节点': '歴史文化拠点',
    '主题路线': 'テーマルート',
    '公众反馈': '市民フィードバック',
    '规划建议': '計画提案',
    '规划响应': '計画対応',
    '现状问题': '現状課題',
    '空间结构': '空間構造',
    '功能布局': '機能配置',
    '步道系统': 'トレイルシステム',
    '图层管理': 'レイヤー管理',
    '图层': 'レイヤー',
    '地图': '地図',
    '路线': 'ルート',
    '节点': '拠点',
    '数据接入': 'データ連携',
    '数据': 'データ',
    '导出': 'エクスポート',
    '导入': 'インポート',
    '上传': 'アップロード',
    '下载': 'ダウンロード',
    '识别': '分析',
    '场景': 'シーン',
    '体验': '体験',
    '显示': '表示',
    '隐藏': '非表示',
    '选择': '選択',
    '生成': '生成',
    '修改': '編集',
    '编辑': '編集',
    '删除': '削除',
    '建议': '提案',
    '问题': '課題',
    '分析': '分析',
    '管理': '管理',
    '总览': '概要',
    '首页': 'ホーム',
    '对话': '対話',
    '讲解词': '解説文',
    '讲解词生成结果': '解説文の生成結果',
    '优先级': '優先度',
    '状态': '状態',
    '目标': '目標',
    '策略': '戦略',
    '详情': '詳細',
    '查看': '表示',
    '保存': '保存',
    '取消': 'キャンセル',
    '确认': '確認',
    '提交': '送信',
    '正在加载': '読み込み中',
    '正在': '処理中',
    '已配置': '設定済み',
    '待配置': '未設定',
    '可用': '利用可能',
    '不可用': '利用不可',
    '当前': '現在',
    '历史': '歴史',
    '文化': '文化',
    '空间': '空間',
    '街区': '街区',
    '街巷': '街路・路地',
    '步行': '徒歩',
    '夜游': 'ナイトツアー',
    '研学': 'フィールド学習',
    '适老': '高齢者対応',
    '无障碍': 'バリアフリー',
    '公共服务': '公共サービス',
    '文化价值': '文化的価値',
    '历史价值': '歴史的価値',
    '综合评分': '総合評価',
    '总体思路': '全体方針',
    '坐标：': '座標：',
    '坐标系统': '座標系',
    '起点：': '出発点：',
    '终点：': '終点：',
    '游览时间': '所要時間',
    '推荐停留': '推奨滞在時間',
    '分钟': '分',
    '小时': '時間',
    '米': 'm',
    '公里': 'km',
    '简体中文': '簡体字中国語',
    '繁體中文': '繁体字中国語',
    'English': '英語',
    '日本語': '日本語',
    '长沙': '長沙',
    '天心阁': '天心閣',
    '杜甫江阁': '杜甫江閣',
    '开福寺': '開福寺',
    '贾谊故居': '賈誼故居',
    '白沙古井': '白沙古井',
    '太平街': '太平街',
    '坡子街': '坡子街',
    '潮宗街': '潮宗街',
    '化龙池': '化龍池',
    '西文庙坪': '西文廟坪',
    '南门口': '南門口',
    '黄兴南路': '黄興南路',
    '黄兴南路步行街': '黄興南路歩行者天国',
    '书院文庙': '書院・文廟',
    '湖湘民俗': '湖湘民俗',
    '教堂公馆': '教会・洋館',
    '千年古刹': '千年古刹',
    '国家级': '国家級',
    '省级': '省級',
    '市级': '市級',
    '县级': '県級',
    '文物点': '文化財地点',
    '历史点位': '歴史地点',
    '重要历史点位': '重要歴史地点',
    '主题支线': 'テーマ支線',
    '主干道': '主要道路',
    '主线': 'メインルート',
    '支线': '支線',
    '电子地图': '電子地図',
    '卫星影像': '衛星画像',
    '底图': 'ベースマップ',
    '白底': '白背景',
    '图片来源：': '画像出典：',
    '当前画面': '現在のシーン',
    '稍后选择': 'あとで選択',
    '选择访问身份': '利用者の視点を選択',
    '从您的视角进入古城': 'あなたの視点から古城へ',
    '进入 AI 智能体': 'AI エージェントへ',
    '以当前身份': '現在の役割で続行',
    '五脉五维': '五脈・五次元',
    '历史步道 GIS': '歴史トレイル GIS',
    '文化节点导览': '文化拠点ガイド',
    'AI 规划诊断': 'AI 計画診断',
    'QGIS 图层：': 'QGIS レイヤー：',
    'GeoJSON/KML 导出：已启用': 'GeoJSON/KML エクスポート：有効',
    '高德 JS API：': 'AMap JS API：',
    '外部智能体：': '外部 AI エージェント：',
    'AI 摘要：': 'AI 要約：',
    'DeepSeek 调用失败，已本地兜底：': 'DeepSeek の呼び出しに失敗しました。ローカル応答に切り替えました：',
    'DeepSeek 请求失败：': 'DeepSeek リクエストに失敗しました：',
    'DeepSeek 暂时不可用，已切换为本地规则回答。 原因：': 'DeepSeek は一時的に利用できないため、ローカルルールによる回答へ切り替えました。理由：'
  };

  const cache = (() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  })();

  const sourceByNode = new WeakMap();
  const sourceByAttr = new WeakMap();
  let observer = null;
  let running = false;
  let flushTimer = null;
  const pending = new Set();

  function currentLanguage() {
    try {
      return localStorage.getItem(LANGUAGE_KEY) || 'zh-CN';
    } catch {
      return 'zh-CN';
    }
  }

  function preserveWhitespace(source, translated) {
    const lead = source.match(/^\s*/)?.[0] || '';
    const tail = source.match(/\s*$/)?.[0] || '';
    return lead + translated + tail;
  }

  function coreTranslate(text) {
    if (Object.prototype.hasOwnProperty.call(CORE, text)) return CORE[text];

    // 对常见“标签 + 动态数字”做轻量替换；长段文本仍交给 /api/translate-ja。
    const replacements = [
      ['当前身份：', '現在の利用者：'],
      ['当前上下文：', '現在のコンテキスト：'],
      [' 条公众反馈', ' 件の市民フィードバック'],
      [' 个正在显示', ' 件を表示中'],
      [' 条已采纳', ' 件を採用済み'],
      ['正在读取', '読み込み中：'],
      ['已启用', '有効'],
      ['已配置', '設定済み'],
      ['待接入', '未接続'],
      ['建议', '提案'],
      ['问题', '課題'],
      ['路线', 'ルート'],
      ['节点', '拠点'],
      ['图层', 'レイヤー'],
      ['地图', '地図'],
      ['历史', '歴史'],
      ['文化', '文化'],
      ['空间', '空間'],
      ['游客', '観光客'],
      ['居民', '住民'],
      ['商户', '事業者'],
      ['规划师', 'プランナー'],
      ['管理者', '管理者']
    ];

    let out = text;
    let changed = false;
    for (const [from, to] of replacements) {
      if (out.includes(from)) {
        out = out.split(from).join(to);
        changed = true;
      }
    }
    return changed ? out : null;
  }

  function tSync(input) {
    if (typeof input !== 'string' || !input.trim()) return input;
    const lead = input.match(/^\s*/)?.[0] || '';
    const tail = input.match(/\s*$/)?.[0] || '';
    const body = input.slice(lead.length, input.length - tail.length || undefined);
    const exact = CORE[body] || cache[body] || coreTranslate(body);
    return exact ? lead + exact + tail : input;
  }

  function isLikelyTechnicalOnly(text) {
    const s = text.trim();
    if (!s) return true;
    if (/^(https?:\/\/|www\.)/i.test(s)) return true;
    if (/^[\d\s.,:+\-/%()]+$/.test(s)) return true;
    if (/^(GIS|AI|AR|VR|QGIS|ArcGIS|GeoJSON|KML|GPX|OSM|OpenStreetMap|Leaflet|DeepSeek|API|JS|BD-09|GCJ-02|WGS84)$/i.test(s)) return true;
    return false;
  }

  function needsRemoteTranslation(text) {
    const s = text.trim();
    if (!s || isLikelyTechnicalOnly(s)) return false;
    if (CORE[s] || cache[s]) return false;
    // 已含假名时视为日语，不重复翻译。
    if (/[ぁ-んァ-ヶ]/.test(s)) return false;
    // 中文 / 繁中，或较长的英文界面句子均可进入翻译。
    return /[\u3400-\u9fff]/.test(s) || /[A-Za-z]{4,}/.test(s);
  }

  function shouldSkipElement(el) {
    if (!(el instanceof Element)) return true;
    if (el.closest('.shell-title-locked, .entry-display-title, [data-language-locked="true"]')) return true;
    if (el.closest('select[aria-label="Language"] option')) return true;
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE'].includes(el.tagName)) return true;
    return false;
  }

  function rememberAttr(el, attr, value) {
    let map = sourceByAttr.get(el);
    if (!map) {
      map = new Map();
      sourceByAttr.set(el, map);
    }
    if (!map.has(attr)) map.set(attr, value);
  }

  function collect(root = document.body) {
    if (currentLanguage() !== 'ja' || !root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    for (const node of textNodes) {
      const parent = node.parentElement;
      if (!parent || shouldSkipElement(parent)) continue;
      const visible = node.data;
      if (!visible.trim()) continue;
      if (!sourceByNode.has(node)) sourceByNode.set(node, visible);
      const source = sourceByNode.get(node);
      const translated = tSync(source);
      if (translated !== visible) node.data = translated;
      const body = source.trim();
      if (needsRemoteTranslation(body)) pending.add(body);
    }

    const elements = root instanceof Element ? [root, ...root.querySelectorAll('*')] : [...document.querySelectorAll('*')];
    for (const el of elements) {
      if (shouldSkipElement(el)) continue;
      for (const attr of ['title', 'aria-label', 'placeholder']) {
        const value = el.getAttribute(attr);
        if (!value) continue;
        rememberAttr(el, attr, value);
        const source = sourceByAttr.get(el).get(attr);
        const translated = tSync(source);
        if (translated !== value) el.setAttribute(attr, translated);
        const body = source.trim();
        if (needsRemoteTranslation(body)) pending.add(body);
      }
    }

    scheduleFlush();
  }

  function scheduleFlush() {
    if (!pending.size || currentLanguage() !== 'ja') return;
    clearTimeout(flushTimer);
    flushTimer = setTimeout(flushPending, 180);
  }

  async function flushPending() {
    if (running || currentLanguage() !== 'ja' || !pending.size) return;
    running = true;
    try {
      while (pending.size && currentLanguage() === 'ja') {
        const texts = Array.from(pending).slice(0, MAX_BATCH);
        texts.forEach((t) => pending.delete(t));

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ texts })
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data.translations) || data.translations.length !== texts.length) {
          throw new Error('Invalid translation response');
        }

        texts.forEach((source, i) => {
          const translated = String(data.translations[i] || '').trim();
          if (translated) cache[source] = translated;
        });
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        } catch {}

        // 缓存更新后重新扫描当前页面，把刚获取的日语写入 DOM。
        collect(document.body);
      }
    } catch (err) {
      console.warn('[JA i18n] 在线日语翻译暂不可用：', err);
    } finally {
      running = false;
    }
  }

  function updateDocumentMetadata() {
    if (currentLanguage() !== 'ja') return;
    document.documentElement.lang = 'ja';
    document.title = '長沙歴史トレイル計画 AI エージェント';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', '長沙歴史トレイル計画 AI エージェントのプロトタイプ');
  }

  function activate() {
    if (currentLanguage() !== 'ja') return;
    updateDocumentMetadata();
    collect(document.body);

    if (observer) observer.disconnect();
    observer = new MutationObserver((records) => {
      if (currentLanguage() !== 'ja') return;
      for (const record of records) {
        if (record.type === 'childList') {
          for (const node of record.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) collect(node);
            else if (node.nodeType === Node.TEXT_NODE && node.parentElement) collect(node.parentElement);
          }
        } else if (record.type === 'characterData' && record.target.parentElement) {
          collect(record.target.parentElement);
        } else if (record.type === 'attributes') {
          collect(record.target);
        }
      }
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['title', 'aria-label', 'placeholder']
    });
  }

  function deactivate() {
    if (observer) observer.disconnect();
    observer = null;
  }

  window.CSHT_JA = {
    tSync,
    collect,
    activate,
    deactivate,
    cache,
    core: CORE
  };

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;
    if (target.getAttribute('aria-label') !== 'Language') return;
    // React 的 onChange 会同时写入 localStorage；延后一拍读取最终状态。
    setTimeout(() => {
      if (currentLanguage() === 'ja') activate();
      else deactivate();
    }, 0);
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (currentLanguage() === 'ja') activate();
    });
  } else if (currentLanguage() === 'ja') {
    activate();
  }
})();
