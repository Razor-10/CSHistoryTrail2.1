from pathlib import Path
import shutil

ROOT = Path('.')
JS = ROOT / 'assets' / 'index-l27V6rf0.js'
INDEX = ROOT / 'index.html'
NOTFOUND = ROOT / '404.html'

if not JS.exists():
    raise SystemExit('找不到 assets/index-l27V6rf0.js。请把本脚本放到 CShistorytrail-main 根目录后运行。')

for p in (JS, INDEX, NOTFOUND):
    if p.exists() and not p.with_suffix(p.suffix + '.bak').exists():
        shutil.copy2(p, p.with_suffix(p.suffix + '.bak'))

s = JS.read_text(encoding='utf-8')

def replace_once(old, new, label):
    global s
    count = s.count(old)
    if count != 1:
        raise RuntimeError(f'{label}: 预计找到 1 处，实际找到 {count} 处。请不要继续写入。')
    s = s.replace(old, new, 1)
    print('OK:', label)

# 1) 语言下拉框
replace_once(
    'WC=[{value:"zh-CN",label:"简体中文"},{value:"zh-TW",label:"繁體中文"},{value:"en",label:"English"}]',
    'WC=[{value:"zh-CN",label:"简体中文"},{value:"zh-TW",label:"繁體中文"},{value:"en",label:"English"},{value:"ja",label:"日本語"}]',
    '加入日本語选项'
)

# 2) 左侧导航语言表 nP
old = 'nP={"zh-CN":{},"zh-TW":{dashboard:"首頁總覽",gis:"GIS 數據接入",map:"智能地圖",chat:"AI 對話",routes:"路線生成",relationCloud:"關係雲圖",culture:"歷史文脈識別",scenes:"場景化體驗",diagnosis:"規劃診斷",iteration:"地圖修改迭代",operation:"運營活化",participation:"城市共建"},en:{dashboard:"Overview",gis:"GIS Data",map:"Smart Map",chat:"AI Dialogue",routes:"Routes",relationCloud:"Relation Cloud",culture:"Historic Context",scenes:"Experiences",diagnosis:"Planning Diagnosis",iteration:"Map Iteration",operation:"Operations",participation:"Co-creation"}}'
new = 'nP={"zh-CN":{},"zh-TW":{dashboard:"首頁總覽",gis:"GIS 數據接入",map:"智能地圖",chat:"AI 對話",routes:"路線生成",relationCloud:"關係雲圖",culture:"歷史文脈識別",scenes:"場景化體驗",diagnosis:"規劃診斷",iteration:"地圖修改迭代",operation:"運營活化",participation:"城市共建"},en:{dashboard:"Overview",gis:"GIS Data",map:"Smart Map",chat:"AI Dialogue",routes:"Routes",relationCloud:"Relation Cloud",culture:"Historic Context",scenes:"Experiences",diagnosis:"Planning Diagnosis",iteration:"Map Iteration",operation:"Operations",participation:"Co-creation"},ja:{dashboard:"ホーム概要",gis:"GISデータ連携",map:"スマートマップ",chat:"AI対話",routes:"ルート生成",relationCloud:"関係クラウド",culture:"歴史文脈分析",scenes:"シーン体験",diagnosis:"計画診断",iteration:"地図編集・反復",operation:"運営活性化",participation:"まちづくり共創"}}'
replace_once(old, new, '加入日语导航表')

# 3) 身份语言表 HC
old = 'HC={"zh-CN":{游客:"游客",居民:"居民",学生研学:"学生研学",老年人:"老年人",商户:"商户",规划师:"规划师",管理者:"管理者"},"zh-TW":{游客:"遊客",居民:"居民",学生研学:"學生研學",老年人:"長者",商户:"商戶",规划师:"規劃師",管理者:"管理者"},en:{游客:"Visitor",居民:"Resident",学生研学:"Student",老年人:"Senior",商户:"Merchant",规划师:"Planner",管理者:"Manager"}}'
new = 'HC={"zh-CN":{游客:"游客",居民:"居民",学生研学:"学生研学",老年人:"老年人",商户:"商户",规划师:"规划师",管理者:"管理者"},"zh-TW":{游客:"遊客",居民:"居民",学生研学:"學生研學",老年人:"長者",商户:"商戶",规划师:"規劃師",管理者:"管理者"},en:{游客:"Visitor",居民:"Resident",学生研学:"Student",老年人:"Senior",商户:"Merchant",规划师:"Planner",管理者:"Manager"},ja:{游客:"観光客",居民:"住民",学生研学:"学生・フィールド学習",老年人:"高齢者",商户:"事業者",规划师:"プランナー",管理者:"管理者"}}'
replace_once(old, new, '加入日语身份表')

# 4) localStorage 允许 ja
replace_once(
    'return J==="zh-TW"||J==="en"?J:"zh-CN"',
    'return J==="zh-TW"||J==="en"||J==="ja"?J:"zh-CN"',
    '允许记住 ja 语言'
)

# 5) 主界面品牌与副标题 oe
old = 'en:{eyebrow:"Urban Heritage Spatial AI",brand:"Changsha Historic Trail",competition:"2026 National College Land Resources Innovation Competition · Planning Track",title:"Tracing Changsha · Renewing Heritage",subtitle:{游客:"Visitor Guide",居民:"Community Co-creation",学生研学:"Field Study Assistant",老年人:"Senior-friendly Guide",商户:"Merchant Operations Assistant",规划师:"Historic Trail Planning AI",管理者:"Historic Trail Management"}}}[H]'
new = 'en:{eyebrow:"Urban Heritage Spatial AI",brand:"Changsha Historic Trail",competition:"2026 National College Land Resources Innovation Competition · Planning Track",title:"Tracing Changsha · Renewing Heritage",subtitle:{游客:"Visitor Guide",居民:"Community Co-creation",学生研学:"Field Study Assistant",老年人:"Senior-friendly Guide",商户:"Merchant Operations Assistant",规划师:"Historic Trail Planning AI",管理者:"Historic Trail Management"}},ja:{eyebrow:"都市文化空間 AI エージェント",brand:"長沙歴史トレイル",competition:"2026 全国大学生土地資源実践イノベーション大会 · 計画部門",title:"星城の文脈をたどる · スマート景観で刷新",subtitle:{游客:"長沙歴史トレイル 観光ガイド",居民:"長沙歴史トレイル まちづくり共創",学生研学:"長沙歴史トレイル フィールド学習支援",老年人:"長沙歴史トレイル 高齢者向けガイド",商户:"長沙歴史トレイル 事業者支援",规划师:"長沙歴史トレイル計画 AI エージェント",管理者:"長沙歴史トレイル 管理支援"}}}[H]'
replace_once(old, new, '加入主界面日语标题')

# 6) 入口页 f
old = 'en:{brand:"Changsha Historic Trail",later:"Choose later",competition:"2026 National College Land Resources Innovation Competition · Planning Track",intro:"Read the historic fabric of Changsha through its streets, linking trails, landmarks and urban memory with GIS data.",tags:["Historic Trail GIS","Heritage Guide","AI Planning","Five Pulses · Five Dimensions"],choose:"CHOOSE A PERSPECTIVE",enterView:"Enter the historic city",switchHint:"You can change your role at any time",asRole:"Continue as",enter:"Enter AI Agent",current:"CURRENT SCENE",source:"Image: "}}[t]'
new = 'en:{brand:"Changsha Historic Trail",later:"Choose later",competition:"2026 National College Land Resources Innovation Competition · Planning Track",intro:"Read the historic fabric of Changsha through its streets, linking trails, landmarks and urban memory with GIS data.",tags:["Historic Trail GIS","Heritage Guide","AI Planning","Five Pulses · Five Dimensions"],choose:"CHOOSE A PERSPECTIVE",enterView:"Enter the historic city",switchHint:"You can change your role at any time",asRole:"Continue as",enter:"Enter AI Agent",current:"CURRENT SCENE",source:"Image: "},ja:{brand:"長沙歴史トレイル",later:"あとで選択",competition:"2026 全国大学生土地資源実践イノベーション大会 · 計画部門",intro:"歴史街路をたどりながら長沙古城の文脈を読み解き、GIS データでトレイル、歴史拠点、都市の記憶を結びます。",tags:["歴史トレイル GIS","文化拠点ガイド","AI 計画診断","五脈・五次元"],choose:"利用者の視点を選択",enterView:"あなたの視点から古城へ",switchHint:"入場後もいつでも役割を切り替えられます",asRole:"現在の役割で続行",enter:"AI エージェントへ",current:"現在のシーン",source:"画像出典："}}[t]'
replace_once(old, new, '加入入口页日语')

# 7) 入口页角色说明 m
old = 'en:{游客:"Routes, stories and check-in guide",居民:"Local memory and community co-creation",学生研学:"Field study routes and history tasks",老年人:"Accessible routes and rest points",商户:"Visitor flow and business operations",规划师:"GIS, diagnosis and planning export",管理者:"Implementation and maintenance view"}}'
new = 'en:{游客:"Routes, stories and check-in guide",居民:"Local memory and community co-creation",学生研学:"Field study routes and history tasks",老年人:"Accessible routes and rest points",商户:"Visitor flow and business operations",规划师:"GIS, diagnosis and planning export",管理者:"Implementation and maintenance view"},ja:{游客:"おすすめルート、拠点解説、チェックイン案内",居民:"暮らしの記憶、身近な課題、まちづくり共創",学生研学:"フィールド学習ルート、課題カード、歴史 Q&A",老年人:"大きな文字、歩きやすいルート、休憩案内",商户:"人流ルート、イベント連携、運営提案",规划师:"GIS、診断、反復編集、成果出力",管理者:"フィードバック対応、実施管理、維持運営"}}'
replace_once(old, new, '加入入口页角色日语说明')

# 8) DOM 翻译函数：ja 时调用外部同步缓存；缓存尚未生成时先保留原文
needle = 'i=e.slice(n.length,e.length-r.length||void 0);if(t==="en")'
replacement = 'i=e.slice(n.length,e.length-r.length||void 0);if(t==="ja"){const f=window.CSHT_JA&&window.CSHT_JA.tSync?window.CSHT_JA.tSync(i):i;return`${n}${f||i}${r}`}if(t==="en")'
replace_once(needle, replacement, '接入日语翻译器')

# 9) 切换语言时，把日语也视为“已翻译状态”，避免切回中文后仍残留日语
pairs = [
    ('[n,Zo(n,"zh-TW"),Zo(n,"en")].includes', '[n,Zo(n,"zh-TW"),Zo(n,"en"),Zo(n,"ja")].includes'),
    ('[l,Zo(l,"zh-TW"),Zo(l,"en")].includes', '[l,Zo(l,"zh-TW"),Zo(l,"en"),Zo(l,"ja")].includes'),
]
for old, new in pairs:
    if s.count(old) != 1:
        raise RuntimeError(f'识别已翻译文本: 找不到唯一目标 {old}')
    s = s.replace(old, new, 1)
print('OK: 日语切换回退支持（文本节点 + 属性）')

# 10) DeepSeek 根据界面语言回答，不再强制中文
old = '回答必须使用中文，紧密结合长沙古城历史步道、GIS 图层、历史节点、路线生成、规划诊断、公众参与和运营活化。'
new = '回答必须使用${(()=>{try{const L=window.localStorage.getItem("changsha-historic-trail-language");return L==="ja"?"日语":L==="en"?"英语":L==="zh-TW"?"繁体中文":"简体中文"}catch{return"简体中文"}})()}，紧密结合长沙古城历史步道、GIS 图层、历史节点、路线生成、规划诊断、公众参与和运营活化。'
chat_pos = s.find('function sre(')
if chat_pos < 0:
    raise RuntimeError('找不到 AI 对话组件 function sre')
prompt_pos = s.find(old, chat_pos)
if prompt_pos < 0:
    raise RuntimeError('AI 对话组件中找不到“回答必须使用中文”提示词')
s = s[:prompt_pos] + new + s[prompt_pos + len(old):]
print('OK: DeepSeek 跟随界面语言回答')

JS.write_text(s, encoding='utf-8')

# 11) index.html 注入 ja-i18n.js
html = INDEX.read_text(encoding='utf-8')
script = '    <script src="./assets/ja-i18n.js"></script>\n'
if 'ja-i18n.js' not in html:
    marker = '    <script type="module" crossorigin src="./assets/index-l27V6rf0.js"></script>\n'
    if marker not in html:
        raise RuntimeError('index.html 中找不到主 bundle script 标签')
    html = html.replace(marker, script + marker)
    INDEX.write_text(html, encoding='utf-8')
    print('OK: index.html 注入 ja-i18n.js')
else:
    print('SKIP: index.html 已注入 ja-i18n.js')

# 12) 404.html 统一使用同一个主 bundle，避免维护第二份 Daxo 文件
if NOTFOUND.exists():
    html404 = NOTFOUND.read_text(encoding='utf-8')
    html404 = html404.replace('./assets/index-DaxoQ0Xw.js', './assets/index-l27V6rf0.js')
    if 'ja-i18n.js' not in html404:
        marker = '    <script type="module" crossorigin src="./assets/index-l27V6rf0.js"></script>\n'
        html404 = html404.replace(marker, script + marker)
    NOTFOUND.write_text(html404, encoding='utf-8')
    print('OK: 404.html 与主站统一 bundle，并注入 ja-i18n.js')

print('\n完成。原文件已生成 .bak 备份。')
