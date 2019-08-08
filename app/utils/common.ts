export function digitsFromScoreType(scoreType) {
  switch (scoreType) {
    case "weighted":
      return 2
    case "credits":
      return 1
    case "gradePoints":
      return 3
  }
  return 2
}

export function getScheduleTimeSlot(raw) {
  if (typeof raw === "number") {
    raw = String(raw)
  }
  switch (raw) {
    case "1":
      return ["08:30", "09:15"]
    case "2":
      return ["09:20", "10:05"]
    case "3":
      return ["10:25", "11:10"]
    case "4":
      return ["11:15", "12:00"]
    case "5":
      return ["13:30", "14:15"]
    case "6":
      return ["14:20", "15:05"]
    case "7":
      return ["15:25", "16:10"]
    case "8":
      return ["16:15", "17:00"]
    case "9":
      return ["18:30", "19:15"]
    case "10":
      return ["19:20", "20:05"]
    case "11":
      return ["20:10", "20:55"]
    case "12":
      return ["21:00", "21:45"]
  }
  return ["Indefinite Time", "Indefinite Time"]
}

export function shuffleData(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function sanitizeLocation(raw: string) {
  return raw.replace("楼", "-")
}

export function colorHashByCredits(credits) {
  if (typeof credits === "string") {
    credits = Number(credits)
  }
  if (credits >= 5) {
    return 4
  }
  if (credits >= 3.5) {
    return 3
  }
  if (credits >= 2.5) {
    return 2
  }
  if (credits >= 1.5) {
    return 1
  } else {
    return 0
  }
}
