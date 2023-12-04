import { createContext, useState } from 'react'

export const FridgeContext = createContext()

const initialState = JSON.parse(window.localStorage.getItem('fridge')) || []

const updateLocalStorage = state => window.localStorage.setItem('fridge', JSON.stringify(state))

export default function FridgeProvider({ children }) {
    const [products, setProducts] = useState(initialState)
    const [isShowFridge, setShowFridge] = useState(false)

    const addProduct = (newProduct, value = 1) => {
        const indexOfProduct = products.findIndex(product => product.id === newProduct.id)

        if (indexOfProduct >= 0) {
            const newProducts = structuredClone(products)
            newProducts[indexOfProduct].amount += value

            updateLocalStorage(newProducts)
            return setProducts(newProducts)
        }

        setProducts(pdts => {
            const newProducts = [...pdts, newProduct]
            updateLocalStorage(newProducts)
            return newProducts
        })
    }

    const reduceProduct = (pdtToReduce, value = 1) => {
        const indexOfProduct = products.findIndex(product => product.id === pdtToReduce.id)

        if (indexOfProduct === -1) return

        const newProducts = structuredClone(products)
        newProducts[indexOfProduct].amount -= value

        if (newProducts[indexOfProduct].amount < 1) {
            newProducts[indexOfProduct].amount = 1
        }

        updateLocalStorage(newProducts)
        return setProducts(newProducts)
    }

    const removeProduct = (pdtToRemove) => {
        const newProducts = products.filter(product => product.id !== pdtToRemove.id)
        updateLocalStorage(newProducts)
        setProducts(newProducts)
    }

    const showFridge = () => setShowFridge(true)
    const closeFridge = () => setShowFridge(false)

    return (
        <FridgeContext.Provider value={{ addProduct, removeProduct, reduceProduct, products, showFridge, closeFridge, isShowFridge }}>
            {children}
        </FridgeContext.Provider>
    )
}