import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AllSwaps.css';

export default function AllSwaps() {
  const dispatch = useDispatch();
  const allSwaps = useSelector((state) => state.allSwaps);
  const history = useHistory();
  console.log(allSwaps);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_SWAPS' });
  }, []);

  const handleClick = (swap) => {
    dispatch({ type: 'SET_SELECTED_SWAP', payload: swap });
    history.push('/swapItems');
  };

  return (
    <div>
      <div>My Swaps:</div>

      <div>All Swaps:</div>
      <div className="card-container">
        {allSwaps.map((swap) => {
          return (
            <div onClick={() => handleClick(swap)}>
              {new Date(swap.stop_date) > new Date() && (
                <div className="swap-card">
                  <img src={swap.swap_img} alt="Rad snowboard man" />
                  <div className="title-lock">
                    <p>{swap.name}</p>
                    {swap.is_private && <img src="images/lock.svg" />}
                  </div>
                  <div className="days-until">
                    {swap.swap_open ? (
                      <p>Days Remaing:</p>
                    ) : (
                      <p>Days until swap:</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
