import { useContext } from "react"
import { GoalsContext } from "../contexts/Goalscontext"

export function useGoals() {
  const context = useContext(GoalsContext)

  if (!context) {
    throw new Error(`Outside the scope of the Goals Provider.`)
  }

  return context
}

