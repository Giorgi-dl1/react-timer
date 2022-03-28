import {AiOutlineArrowDown,AiOutlineArrowUp} from 'react-icons/ai'
const Control = ({title,time,func,type,handleFunc})=>{
    return(
        <div className='control-elem'>
            <h3>{title}</h3>
            <div className='control-opt'>
                <button className='btn' onClick={()=>handleFunc(60,type)}>
                    <AiOutlineArrowUp />
                </button>
                <h3>{func(time)}</h3>
                <button className='btn'>
                    <AiOutlineArrowDown onClick={()=>handleFunc(-60,type)}/>
                </button>
            </div>
        </div>
    );
}
export default Control;