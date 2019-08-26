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
  if (credits > 6) {
    return 6
  }
  if (credits >= 5) {
    return 5
  }
  if (credits >= 4) {
    return 4
  }
  if (credits >= 3) {
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

export function colorHashByBookName(str) {
  return str.length % 3
}
