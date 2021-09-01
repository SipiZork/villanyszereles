import React, {useState} from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/styles';

const PreOffer = ({ offerRef }) => {

  const [formData, setFormData] = useState({
    size: '',
    rooms: '',
    dishwasher: false,
    washingmachine: false,
    electricoven: false,
    dryer: false,
  });

  const [numberOfRooms, setNumberOfRooms] = useState([]);

  const changeRooms = (roomNumber) => {
    let newRooms = [];
    for (let i = 0; i < roomNumber; i++) {
      newRooms.push({name: `Szoba${i+1}`, indexName: `room${i+1}`, assembly: 0 })
    }
    console.log(newRooms);
    setNumberOfRooms(newRooms);
  }

  const changeValue = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if (e.target.name === 'rooms') {
      changeRooms(value);
    }
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  }

  return (
    <StyledPreOffer id="offer" ref={offerRef}>
      <div className="dark-bg"></div>
      <form>
        <p>Alap kérdések</p>
        <div className="form-group">
          <input type="number" name="size" onChange={(e) => changeValue(e)} value={formData.size} required autoComplete="off" />
          <label>
            Alapterület (nm)
          </label>
        </div>
        <div className="form-group">
          <input type="number" name="rooms" onChange={(e) => changeValue(e)} value={formData.rooms} required autoComplete="off" />
          <label>
            Szobák száma
          </label>
        </div>
        <p>Hány szerelvényt szeretne</p>
        <div className="form-group">
          <input type="number" name="livingroom" onChange={(e) => changeValue(e)} value={formData.livingroom} required autoComplete="off" />
          <label>
            Nappali
          </label>
        </div>
        <div className="form-group">
          <input type="number" name="kitchen" onChange={(e) => changeValue(e)} value={formData.kitchen} required autoComplete="off" />
          <label>
            Konyha
          </label>
        </div>
        <div className="form-group">
          <input type="number" name="bathroom" onChange={(e) => changeValue(e)} value={formData.bathroom} required autoComplete="off" />
          <label>
            Fürdőszoba
          </label>
        </div>
        {numberOfRooms.map((room, i) => {
          return (
            <div className="form-group" key={i}>
              <input type="number" name={room.indexName} onChange={(e) => changeValue(e)} value={room.assembly} required autoComplete="off" />
              <label>
                {room.name}
              </label>
            </div>
          )
        })}
        <p>Előválasztók</p>
        <div className="form-group-checker">
          <input type="checkbox" name="dishwasher" checked={formData.dishwasher} onChange={(e) => changeValue(e)}  />
          <label>
            Mosogatógép
          </label>
        </div>
        <div className="form-group-checker">
          <input type="checkbox" name="electricoven" checked={formData.electricoven} onChange={(e) => changeValue(e)}  />
          <label>
            Elektromos sütő
          </label>
        </div>
        <div className="form-group-checker">
          <input type="checkbox" name="washingmachine" checked={formData.washingmachine} onChange={(e) => changeValue(e)}  />
          <label>
            Mosógép
          </label>
        </div>
        <div className="form-group-checker">
          <input type="checkbox" name="dryer" checked={formData.dryer} onChange={(e) => changeValue(e)}  />
          <label>
            Szárítógép
          </label>
        </div>
        <div className="clear"></div>
      </form>
    </StyledPreOffer>
  )
}

const StyledPreOffer = styled.article`
  background: ${COLORS.bgdarkblue};
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    width: 500px;
    position: relative;
    gap: 1.5rem;

    p {
      color: rgba(255,255,255,.7);
      font-size: 2rem;
      text-align: center;
    }

    .form-group-checker {
      width: 100%;
      height: 1.8rem;
      align-items: center;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;

      input[type="checkbox"] {
        position: relative;
        width: 60px;
        height: 20px;
        appearance: none;
        -webkit-appearance: none;
        background: ${COLORS.bglight};
        outline: none;
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0,0,0,.3);
        transition: all .25s;
        cursor: pointer;

        &:before {
          content: '';
          position: absolute;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          top: -2.5px;
          left: -1px;
          background: rgb(200, 200, 200);
          transition: all .25s;
          pointer-events: none;
          box-shadow: 0 1px 3px rgba(0,0,0,.5);
        }

        &:checked {
          background: ${COLORS.bgdarkerblue};

          &:before {
            left: 36px;
            background: ${COLORS.bgdarkblue};
          }
        }
      }

      label {
        color: ${COLORS.textprimary};
        font-size: 1.5rem;
        pointer-events: none;
        opacity: .7;
      }

      input {
        height: 1.8rem;
        width: 1.8rem;
        outline: none;
        border: none;
      }
    }

    .form-group {
      position: relative;
      width: 100%;
      label {
        color: ${COLORS.textprimary};
        font-size: 1.5rem;
        position: absolute;
        top: 0;
        left: 1rem;
        transition: all .25s;
        pointer-events: none;
        opacity: .5;
      }
      input {
        padding: 0 1rem;
        top: 0;
        left: 0;
        height: 1.8rem;
        width: 100%;
        border: 1px solid yellow;
        font-size: 1.2rem;
        background-color: transparent;
        outline: none;
        border: none;
        color: ${COLORS.textprimary};
        border-bottom: 1px solid ${COLORS.textprimary};

        &:hover {
          background-color: ${COLORS.inputhover};
          + label {
            opacity: 1;
          }
        }

        &:focus,
        &:valid {
          + label {
            top: -1.5rem;
            left: 0rem;
            opacity: .7;
          }
        }
      }
    }
  }
`;

export default PreOffer;
