import { useContext } from "react"
import { FridgeContext } from "../contexts/fridge"

export default function useFridge() {
    const context = useContext(FridgeContext)

    if (context === undefined) {
        throw new Error('useFridge must be used within a FridgeProvider')
    }

    return context
}