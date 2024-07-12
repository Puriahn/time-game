import { forwardRef,useImperativeHandle, useRef } from "react";
const ResultModal=forwardRef( function ResultModal({ onReset,remainigTime, targetTime },ref) {
   const dialog=useRef()

   const userLost=remainigTime<=0
   const formattedRemainingTime=(remainigTime/1000).toFixed(2)
   const score=Math.round((1-remainigTime/(targetTime*1000))*100)
   
    useImperativeHandle(ref,()=>{
        return{
            open(){
                dialog.current.showModal()
            }
        }
    })

    
  
    return (
    <dialog ref={dialog} className="result-modal">
      {userLost&&<h2>You lost</h2>}
      {!userLost&&<h2>Your score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime}</strong>
      </p>
      <p>
        You stopped the timer with <strong>{formattedRemainingTime}</strong> secons left!
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
})
export default ResultModal
