import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* fetchGear() {
    try {
        const response = yield axios.get("/api/item");
        yield put({ type: "SET_GEAR", payload: response.data });
      } catch (err) {
        console.log(`error in fetching gear ${err}`);
      }
}

function* fetchFavorites() {
  try {
      const response = yield axios.get("/api/item/favorites");
      yield put({ type: "SET_FAVORITES", payload: response.data });
    } catch (err) {
      console.log(`error in fetching favorites ${err}`);
    }
}

function* gearSaga() {
    yield takeLatest('FETCH_GEAR', fetchGear)
    yield takeLatest('FETCH_FAVORITES', fetchFavorites)
}

export default gearSaga;