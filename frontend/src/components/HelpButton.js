import { Link } from "react-router-dom";
import styled from "styled-components";


const HelpBox = styled.div`
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px 0 0 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  text-align: center;

  a {
    color: #333;
    text-decoration: none;
  }
`

const HelpButton = () => {
  return (
    <div>
      <HelpBox>
        <Link to="/help">Help</Link>
      </HelpBox>
    </div>
  );
}
 
export default HelpButton;