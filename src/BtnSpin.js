function BtnSpin ({ onClick, onFocus, children }) {
    console.log(children)
    return <div className='btn-spin browser-default'
        onClick={onClick ? (event) => onClick(event) : null}
        onFocus={(onFocus) ? onFocus : null}>
        <input
            type='url'
            className='btn-spin browser-default'>
        </input>
        {children}
    </div>
}

export default BtnSpin;