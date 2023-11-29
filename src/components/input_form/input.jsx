import './input.scss';

export function Input({ children, type, name, id, placeholder, pattern}){
    return <>
        <label htmlFor={name} className='form-label'>
            <p className='label-p'>{placeholder}</p>
            <div className='input-icon-div'>
                {children}
                <input className='form-input' placeholder={placeholder} type={type} name={name} id={id} pattern={pattern}/>
            </div>
        </label>
    </>
}