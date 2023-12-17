import './detail.scss'

export default function Detail({ state, id, date, time, cost }) {
    return (
        <div className='order-detail'>
            <h3 className='order-state'>{state}</h3>
            <div className='order-container order-identification'>
                <p className='order-id'>{id}</p>
                <div className='order-date-time'>
                    <p>{date}</p>
                    <p>{time}</p>
                </div>
            </div>
            <div className='order-container order-cost'>
                <p>Total:</p>
                <p>{cost}</p>
            </div>
        </div>
    )
}