import { useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar({ placeholder, value, onChange, onSubmit }) {
    const form = useRef()
    const handleChange = (e) => onChange(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit()
    }

    const triggerSubmit = () => form.current.requestSubmit()

    return (
        <div className="wrapper-search-bar">
            <form ref={form} className="search-bar" onSubmit={handleSubmit}>
                <FaMagnifyingGlass style={{cursor: 'pointer'}} size={24} onClick={triggerSubmit} />
                <input
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="search-bar-input"
                    type="text"
                />
            </form>
        </div>
    )
}