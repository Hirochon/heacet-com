const toJapanese = (key: string) => {
  const RenameMap: { [name: string]: string } = {
    programming: 'プログラミング',
    'smartphone-game': 'スマホゲーム',
    python: 'Python',
    student: '学生',
    life: '生活',
    'c-lang': 'C言語',
    django: 'Django',
    'world-for-two': 'World for Two',
    'unison-air': 'ユニゾンエアー',
    'web-development': 'Web開発',
    'data-analysis': 'データ分析',
    kaggle: 'Kaggle',
    hinatazaka46: '日向坂46',
    'dq-walk': 'ドラクエウォーク',
    'pokemon-masters': 'ポケモンマスターズ',
    'brown-dust': 'ブラウンダスト',
  }

  return RenameMap[key]
}

export default toJapanese
