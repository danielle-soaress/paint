import './ToolsArea.scss';
import Colors from '../colors/Colors';
import Tools from '../tools/Tools.jsx';
import Thickness from '../thickness/Thickness.jsx';
import Shapes from '../shapes/Shapes.jsx';
import logo from '../../assets/images/logo.png';


function ToolsArea() {
    return (
        <div className="tools_area_container">
            <Colors/>
            <Tools/>
            <Thickness/>
            <Shapes/>
        </div>
    )
}

export default ToolsArea;