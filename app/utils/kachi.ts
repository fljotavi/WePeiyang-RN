const continuousGpa = x => {
  return 4.558641 + (-0.01219781 - 4.558641) / (1 + Math.pow(x / 72.35393, 7.378654))
}

export const kachiIndex = course => {
  const { gpa, credit, score } = course
  return (continuousGpa(score) - gpa) * credit
}

export const kachiIndexSemester = semester => {
  let res = 0
  let credits = 0 // Could use semester.stat here, but to ensure data integrity, hmm, no.
  semester.data.forEach(course => {
    res += kachiIndex(course)
    credits += course.credit
  })
  return res / credits
}

export const kachiIndexOverall = semesters => {
  let res = 0
  let credits = 0 // Could use semester.stat here, but to ensure data integrity, hmm, no.
  semesters.forEach(sem => {
    res += sem.kachi * sem.stat.credit
    credits += sem.stat.credit
  })
  return res / credits
}
