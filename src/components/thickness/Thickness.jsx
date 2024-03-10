import './Thickness.scss'
import icon from '../../assets/images/thicknessIcon.png'
import {useState, onChange, useRef} from 'react';


function Thickness() {
  const [linWidth, setLinWidth] = useState(5)
  const thicknessContainerRef = useRef(null)

  const openContainer = () => {
    thicknessContainerRef.current.classList.toggle('hide')
  }

  const changeWidth = (e) => {
    setLinWidth(e.target.value)
  }

    return (
      <>
        <div onClick={openContainer} className="thickness_container">
          <div ref={thicknessContainerRef} className="thickness hide">
            <span id="lineWidthEl" className="width_1 thickness_option">{linWidth}</span>
            <input onChange={changeWidth} type='range' min="2" step="2" max="50" />
          </div>
          <img src={icon} className="thickness_icon" alt=""></img>
        </div>
      </>
    )
}

export default Thickness;