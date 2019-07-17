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
