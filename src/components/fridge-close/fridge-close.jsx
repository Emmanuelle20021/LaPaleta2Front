import './fridge-close.scss'

export default function FridgeClose({ top, bottom }) {
    return (
        <div className='fridge'>
            <div className='fridge-top fridge-container'>
                <div className='frigde-door-handle' />
                <div className='fridge-content'>
                    {top}
                </div>
            </div>
            <div className='fridge-bottom fridge-container'>
                <div className='frigde-door-handle' />
                <div className='fridge-content'>
                    {bottom}
                </div>
            </div>
        </div>
    )
}