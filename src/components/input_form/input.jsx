import './input.scss';

export function Input({ children, type, name, id, placeholder, pattern}){
    const classNames = children? 'input-icon-div icon-true' : 'input-icon-div';
    return <>
        <label form='form-login' className='form-label' id={id + '-label'}>
            <div className='icon-aling'>
                {children}
            </div>
            <div className={classNames}>
                <p className='label-p'>{placeholder}</p>
                <input className='form-input' placeholder={placeholder} type={type} name={name} id={id} pattern={pattern}/>
            </div>
        </label>
    </>
}