import type { CardSuit, TarotCard } from '../types/tarot';

const majorArcana: TarotCard[] = [
  { id: 0, nameJa: '愚者', nameEn: 'The Fool', image: '/src/assets/images/cards/00-fool.webp', uprightMeaning: '新しい旅立ち。直感を信じて一歩を踏み出すタイミング。', reversedMeaning: '準備不足や無計画さへの注意。焦らず足元を整える時期。', keywords: ['始まり', '自由', '直感'], arcana: 'major' },
  { id: 1, nameJa: '魔術師', nameEn: 'The Magician', image: '/src/assets/images/cards/01-magician.webp', uprightMeaning: '才能や資源を活かして形にできる時。行動力が鍵。', reversedMeaning: '迷いや空回りが起こりやすい時。目的を明確にしたい。', keywords: ['創造', '実行', '才能'], arcana: 'major' },
  { id: 2, nameJa: '女教皇', nameEn: 'The High Priestess', image: '/src/assets/images/cards/02-high-priestess.webp', uprightMeaning: '静かな洞察。表面ではなく本質を見つめることが大切。', reversedMeaning: '考えすぎや閉じこもりに注意。心を少し開くとよい。', keywords: ['知性', '直観', '沈黙'], arcana: 'major' },
  { id: 3, nameJa: '女帝', nameEn: 'The Empress', image: '/src/assets/images/cards/03-empress.webp', uprightMeaning: '豊かさや育みの象徴。人間関係や表現活動が実る。', reversedMeaning: '甘えや過保護になりやすい時。バランスを見直したい。', keywords: ['豊穣', '愛情', '成長'], arcana: 'major' },
  { id: 4, nameJa: '皇帝', nameEn: 'The Emperor', image: '/src/assets/images/cards/04-emperor.webp', uprightMeaning: '責任感と安定。ルールを整え、物事を前に進める力。', reversedMeaning: '頑固さや支配的な態度に注意。柔軟さが必要。', keywords: ['安定', '統率', '責任'], arcana: 'major' },
  { id: 5, nameJa: '法王', nameEn: 'The Hierophant', image: '/src/assets/images/cards/05-hierophant.webp', uprightMeaning: '学びや助言が力になる時。信頼できる指針を得られる。', reversedMeaning: '形式に縛られすぎる暗示。自分の考えも大切に。', keywords: ['学び', '伝統', '助言'], arcana: 'major' },
  { id: 6, nameJa: '恋人', nameEn: 'The Lovers', image: '/src/assets/images/cards/06-lovers.webp', uprightMeaning: '心から望む選択ができる時。関係性にも追い風がある。', reversedMeaning: '迷いや価値観のずれが起きやすい時。対話が鍵。', keywords: ['選択', '調和', '関係'], arcana: 'major' },
  { id: 7, nameJa: '戦車', nameEn: 'The Chariot', image: '/src/assets/images/cards/07-chariot.webp', uprightMeaning: '勢いよく進める時。強い意志が成功を呼び込む。', reversedMeaning: '焦りや暴走の暗示。方向性を落ち着いて確認したい。', keywords: ['前進', '勝利', '意志'], arcana: 'major' },
  { id: 8, nameJa: '力', nameEn: 'Strength', image: '/src/assets/images/cards/08-strength.webp', uprightMeaning: 'やさしい強さで状況を整えられる。粘り強さが実を結ぶ。', reversedMeaning: '自信の低下や我慢のしすぎに注意。自分を労わる時。', keywords: ['忍耐', '勇気', '調和'], arcana: 'major' },
  { id: 9, nameJa: '隠者', nameEn: 'The Hermit', image: '/src/assets/images/cards/09-hermit.webp', uprightMeaning: '内省と探求の時期。ひとりの時間が答えを育てる。', reversedMeaning: '閉じすぎや孤立の暗示。助けを求めることも必要。', keywords: ['探求', '静寂', '内省'], arcana: 'major' },
  { id: 10, nameJa: '運命の輪', nameEn: 'Wheel of Fortune', image: '/src/assets/images/cards/10-wheel-of-fortune.webp', uprightMeaning: '流れが変わる転機。追い風を感じたら素直に乗りたい。', reversedMeaning: 'タイミングのずれや停滞感。流れを待つ余裕が大切。', keywords: ['転機', '循環', '変化'], arcana: 'major' },
  { id: 11, nameJa: '正義', nameEn: 'Justice', image: '/src/assets/images/cards/11-justice.webp', uprightMeaning: '冷静で公正な判断が求められる時。誠実さが力になる。', reversedMeaning: '偏りや判断ミスに注意。感情と事実を分けて考えたい。', keywords: ['公平', '判断', '誠実'], arcana: 'major' },
  { id: 12, nameJa: '吊るされた男', nameEn: 'The Hanged Man', image: '/src/assets/images/cards/12-hanged-man.webp', uprightMeaning: '見方を変えることで突破口が見える。待つことにも意味がある。', reversedMeaning: '停滞感ばかりが強まる時。執着を手放す意識が必要。', keywords: ['視点転換', '忍耐', '手放し'], arcana: 'major' },
  { id: 13, nameJa: '死神', nameEn: 'Death', image: '/src/assets/images/cards/13-death.webp', uprightMeaning: '終わりと再生。古い流れを手放し、新しい段階へ進む。', reversedMeaning: '変化を恐れて停滞しやすい時。少しずつ切り替えたい。', keywords: ['終焉', '再生', '変容'], arcana: 'major' },
  { id: 14, nameJa: '節制', nameEn: 'Temperance', image: '/src/assets/images/cards/14-temperance.webp', uprightMeaning: 'ちょうどよい調和が生まれる時。無理のない継続が吉。', reversedMeaning: '極端さやアンバランスに注意。整える意識が重要。', keywords: ['調和', '中庸', '循環'], arcana: 'major' },
  { id: 15, nameJa: '悪魔', nameEn: 'The Devil', image: '/src/assets/images/cards/15-devil.webp', uprightMeaning: '執着や誘惑が強まりやすい時。何に縛られているか見直したい。', reversedMeaning: '束縛から抜け出す兆し。少しずつ自由を取り戻せる。', keywords: ['執着', '誘惑', '解放'], arcana: 'major' },
  { id: 16, nameJa: '塔', nameEn: 'The Tower', image: '/src/assets/images/cards/16-tower.webp', uprightMeaning: '急な変化が起こりやすい時。真実に向き合うことで再構築が始まる。', reversedMeaning: '崩壊を避けたい気持ちが強い時。小さな修正が助けになる。', keywords: ['崩壊', '真実', '刷新'], arcana: 'major' },
  { id: 17, nameJa: '星', nameEn: 'The Star', image: '/src/assets/images/cards/17-star.webp', uprightMeaning: '希望が差し込む時。理想や願いを丁寧に育てられる。', reversedMeaning: '自信の揺らぎや先行き不安に注意。小さな希望を見失わない。', keywords: ['希望', '癒やし', '理想'], arcana: 'major' },
  { id: 18, nameJa: '月', nameEn: 'The Moon', image: '/src/assets/images/cards/18-moon.webp', uprightMeaning: '曖昧さの中にある感覚を大切にしたい時。直観が導きになる。', reversedMeaning: '不安や混乱が晴れやすい時。少しずつ輪郭が見えてくる。', keywords: ['幻想', '不安', '直観'], arcana: 'major' },
  { id: 19, nameJa: '太陽', nameEn: 'The Sun', image: '/src/assets/images/cards/19-sun.webp', uprightMeaning: '明るい成功や達成感。素直さが幸運を引き寄せる。', reversedMeaning: 'やや空回りしやすい時。過信せず足元を確認したい。', keywords: ['成功', '喜び', '明快'], arcana: 'major' },
  { id: 20, nameJa: '審判', nameEn: 'Judgement', image: '/src/assets/images/cards/20-judgement.webp', uprightMeaning: '過去を踏まえて新しい決断を下す時。再起のチャンス。', reversedMeaning: '決断の先延ばしに注意。自分の声を聞くことが大切。', keywords: ['復活', '決断', '目覚め'], arcana: 'major' },
  { id: 21, nameJa: '世界', nameEn: 'The World', image: '/src/assets/images/cards/21-world.webp', uprightMeaning: '完成と達成。ひとつの流れが美しくまとまりやすい。', reversedMeaning: 'あと一歩でまとまりきらない暗示。仕上げを丁寧に。', keywords: ['完成', '到達', '統合'], arcana: 'major' },
];

const suitConfig: Record<CardSuit, { ja: string; en: string; keywords: string[] }> = {
  wands: { ja: 'ワンド', en: 'Wands', keywords: ['情熱', '行動', '発想'] },
  cups: { ja: 'カップ', en: 'Cups', keywords: ['感情', '愛情', 'つながり'] },
  swords: { ja: 'ソード', en: 'Swords', keywords: ['思考', '決断', '緊張'] },
  pentacles: { ja: 'ペンタクル', en: 'Pentacles', keywords: ['現実', '仕事', '基盤'] },
};

const numberedRanks = [
  { rank: 'Ace', ja: 'エース', upright: '新しい始まりや芽生え。素直に受け取ることで流れが動きます。', reversed: '勢い不足や迷い。始める前の準備を整えると前進しやすくなります。', extra: ['始まり'] },
  { rank: 'Two', ja: '2', upright: 'バランスを取る局面。相手や状況との調整が鍵です。', reversed: '優先順位が散りやすい時。無理を減らして整理したい局面です。', extra: ['調整'] },
  { rank: 'Three', ja: '3', upright: '広がりや協力が生まれる時。人との連携が実りにつながります。', reversed: '噛み合わなさや停滞に注意。役割分担を見直すと改善しやすいです。', extra: ['協力'] },
  { rank: 'Four', ja: '4', upright: '土台を固める時。落ち着いて守ることで安定します。', reversed: '守りに入りすぎて動きづらい時。少しだけ変化を受け入れると流れます。', extra: ['安定'] },
  { rank: 'Five', ja: '5', upright: '揺れや試練の中で学びが起こる時。価値観の見直しが進みます。', reversed: '混乱が少しずつ落ち着く兆し。距離を取ることで整理できます。', extra: ['変化'] },
  { rank: 'Six', ja: '6', upright: '流れが整いやすい時。助け合いや前進を感じやすい局面です。', reversed: '期待とのずれに注意。見返りを求めすぎず整えることが大切です。', extra: ['前進'] },
  { rank: 'Seven', ja: '7', upright: '試行錯誤しながら自分の立場を守る時。工夫が活きます。', reversed: '迷いが強まりやすい時。比較よりも自分の軸を確認したい局面です。', extra: ['模索'] },
  { rank: 'Eight', ja: '8', upright: '動きが加速しやすい時。テンポよく進めると波に乗れます。', reversed: '急ぎすぎや空回りに注意。焦らず順序を整えることが大事です。', extra: ['加速'] },
  { rank: 'Nine', ja: '9', upright: '積み重ねが形になる時。最後まで粘る力が支えになります。', reversed: '疲れや警戒心が強まる時。休息を挟みながら整えたい局面です。', extra: ['粘り'] },
  { rank: 'Ten', ja: '10', upright: 'ひと区切りと結果が見えやすい時。次の段階への準備が始まります。', reversed: '負担が偏りやすい時。抱え込みを減らして分配を考えたい時です。', extra: ['完成'] },
];

const courtRanks = [
  { rank: 'Page', ja: 'ペイジ', upright: '素直な好奇心と学びの姿勢。まず試してみることが追い風になります。', reversed: '幼さや迷いが出やすい時。基本に戻ることで整います。', extra: ['学び'] },
  { rank: 'Knight', ja: 'ナイト', upright: '勢いと行動力が高まる時。動きながら方向を見定められます。', reversed: '突っ走りや空回りに注意。勢いを使う前に目的確認が必要です。', extra: ['行動'] },
  { rank: 'Queen', ja: 'クイーン', upright: '受容力と成熟した魅力。落ち着いた対応が信頼につながります。', reversed: '感情の偏りや抱え込みに注意。自分をいたわる視点が必要です。', extra: ['成熟'] },
  { rank: 'King', ja: 'キング', upright: '責任感と統率力。大きな視点で判断すると流れが整います。', reversed: '強引さや支配的な態度に注意。柔らかい采配が鍵です。', extra: ['統率'] },
];

const minorArcana = Object.entries(suitConfig).flatMap(([suitKey, suitValue], suitIndex) => {
  const suit = suitKey as CardSuit;

  const numbered = numberedRanks.map((item, index) => ({
    id: 100 + suitIndex * 14 + index,
    nameJa: `${suitValue.ja}の${item.ja}`,
    nameEn: `${item.rank} of ${suitValue.en}`,
    image: '',
    uprightMeaning: `${suitValue.ja}のテーマで、${item.upright}`,
    reversedMeaning: `${suitValue.ja}のテーマで、${item.reversed}`,
    keywords: [...suitValue.keywords, ...item.extra],
    arcana: 'minor' as const,
    suit,
    rank: item.rank,
  }));

  const court = courtRanks.map((item, index) => ({
    id: 100 + suitIndex * 14 + 10 + index,
    nameJa: `${suitValue.ja}の${item.ja}`,
    nameEn: `${item.rank} of ${suitValue.en}`,
    image: '',
    uprightMeaning: `${suitValue.ja}のテーマで、${item.upright}`,
    reversedMeaning: `${suitValue.ja}のテーマで、${item.reversed}`,
    keywords: [...suitValue.keywords, ...item.extra],
    arcana: 'minor' as const,
    suit,
    rank: item.rank,
  }));

  return [...numbered, ...court];
});

export const tarotCards: TarotCard[] = [...majorArcana, ...minorArcana];
