const toJapanese = (key: string) => {
  const RenameMap: { [name: string]: string } = {
    "programming": "プログラミング",
    "smartphone-game": "スマホゲーム",
    "python": "Python",
    "student": "学生",
    "life": "生活",
    "black-desert-mobile": "黒い砂漠Mobile"
  }

  return RenameMap[key]
}

export default toJapanese