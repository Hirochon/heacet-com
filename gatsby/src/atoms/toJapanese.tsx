const toJapanese = (key: string) => {
  const RenameMap: { [name: string]: string } = {
    "programming": "プログラミング",
    "smartphone-game": "スマホゲーム",
    "python": "Python",
    "Hello": "はろ〜",
    "World": "わーるど",
  }

  return RenameMap[key]
}

export default toJapanese