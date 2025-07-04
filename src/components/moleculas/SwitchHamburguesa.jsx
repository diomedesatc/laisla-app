import styled from "styled-components";


export function SwitchHamburguesa({state,setstate}){
    return(
        <Container>
            <label htmlFor="check" className="menuButton" >
                <input id="check" type="checkbox" checked={state} onChange={setstate} />
                <span className="top"></span>
                <span className="mid"></span>
                <span className="bot"></span>
            </label>

        </Container>
    )
};

const Container = styled.div`
position: relative;
left: 5px;
top: 4px;
.menuButton {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 13%;
  color: #090909;
  width: 3.5em;
  height: 3.5em;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 1px solid #e8e8e8;
  transition: all .3s;
  box-shadow: 6px 6px 12px #c5c5c5,
             -6px -6px 12px #ffffff;
  transform: scale(0.6);
}

.menuButton:hover {
  border: 1px solid white;
}

.menuButton:active {
  color: #666;
  box-shadow: inset 4px 4px 12px #c5c5c5,
             inset -4px -4px 12px #ffffff;
}

input[type = "checkbox"] {
  display: none;
  visibility: hidden;
}

.menuButton span {
  width: 30px;
  height: 4px;
  background: #131313;
  border-radius: 100px;
  transition: 0.3s ease;
}

input[type]:checked ~ span.top {
  transform: translateY(290%)rotate(45deg);
  width: 40px;
}

input[type]:checked ~ span.bot {
  transform: translateY(-270%) rotate(-45deg);
  width: 40px;
  box-shadow: 0 0 10px #495057;
}

input[type]:checked ~ span.mid {
  transform: translateX(-20px);
  opacity: 0;
}
    
`