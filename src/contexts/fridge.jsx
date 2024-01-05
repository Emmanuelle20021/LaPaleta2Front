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
            const pdtWithAmount = {...newProduct, amount: value}
            const newProducts = [...pdts, pdtWithAmount]
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

    const removeAllProducts = () => {
        updateLocalStorage([])
        setProducts([])
    }

    const showFridge = () => setShowFridge(true)
    const closeFridge = () => setShowFridge(false)

    return (
        <FridgeContext.Provider value={{ addProduct, removeProduct, removeAllProducts, reduceProduct, products, showFridge, closeFridge, isShowFridge }}>
            {children}
        </FridgeContext.Provider>
    )
}