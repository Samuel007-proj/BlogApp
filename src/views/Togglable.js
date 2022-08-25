import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hide = {display: visible ? 'none' : ''}
    const show = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={hide}>
                <button type='button' onClick={toggleVisibility} className="mt-2 px-2 py-2 border boder-slate-100 rounded-sm text-center font-semibold tracking-wide text-slate-600">
                    {props.buttonLabel}</button>
            </div>
            <div style={show} className="mb-10">
                {props.children}
                <div>
                    <button onClick={toggleVisibility}
                        className=' mt-2 px-2 border boder-slate-100 rounded-sm text-center font-semibold tracking-wide text-slate-300 active:bg-slate-300 active:text-slate-50'>
                        {props.exit}</button>
                </div>
                
            </div>
        </>
    )
})


export default Togglable