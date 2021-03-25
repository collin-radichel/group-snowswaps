import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
function* fetchCategories() {
  try {
    const response = yield axios.get("/api/item/categories");
    yield put({ type: "SET_CATEGORIES", payload: response.data });
  } catch (err) {
    console.log(`error in fetching categories ${err}`);
  }
}


function* categorySaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
}
export default categorySaga;
